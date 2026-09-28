"use client"

import { useEffect, useRef } from "react"
import { A_BAR, BODY, CHIP, DOTS, FRAME, LETTER_A, LETTER_I, LOGO, RINGS, SOCIETY, TRACES } from "@/lib/chip-logo"

/**
 * The hero artwork: the AIS chip logo, rasterised into a character grid and drawn as ASCII.
 * Signals pulse outward along each circuit trace and light the terminal rings when they arrive,
 * while a small visored moon drifts in the corner among the stars.
 * Pure decoration: aria-hidden, paused off-screen, a single still frame for reduced motion.
 */

const RAMP = " .,:;-=+*#%@"
const BODY_GLYPHS = "#%@#8&#%"

const COLOR = {
  cream: "#fbfaf6",
  frost: "#ece8f8",
  shade: "#5b479f",
  deep: "#3a2a78",
  pulse: "#4a1fcf",
  pulseSoft: "#7a5cf0",
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const glyph = (b: number) => RAMP[Math.max(1, Math.min(RAMP.length - 1, Math.round(clamp01(b) * (RAMP.length - 1))))]
const hash = (i: number, j: number) => {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453
  return s - Math.floor(s)
}

type Vec = [number, number, number]
const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const norm = (v: Vec): Vec => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / l, v[1] / l, v[2] / l]
}
const LIGHT = norm([-0.35, 0.45, 0.82])
const GLINT = norm([-0.5, 0.6, 0.6])

/** Lit, chrome-white sphere shading. Returns brightness 0..1. */
function shell(n: Vec) {
  const diff = Math.max(0, dot(n, LIGHT))
  const r = 2 * dot(n, LIGHT) * n[2] - LIGHT[2]
  return clamp01(0.26 + 0.62 * diff + 0.5 * Math.pow(Math.max(0, r), 22))
}
const shellColor = (b: number) => (b > 0.62 ? COLOR.cream : b > 0.36 ? COLOR.frost : b > 0.2 ? COLOR.shade : COLOR.deep)

export function AsciiChip({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    // Shading tones follow the site palette (--ascii-* in site.css).
    const css = getComputedStyle(canvas)
    for (const key of ["frost", "shade", "deep", "pulse"] as const) {
      COLOR[key] = css.getPropertyValue(`--ascii-${key}`).trim() || COLOR[key]
    }
    COLOR.pulseSoft = css.getPropertyValue("--ascii-pulse-soft").trim() || COLOR.pulseSoft

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const born = performance.now() / 1000

    let W = 0
    let H = 0
    let cw = 0
    let ch = 0
    let cols = 0
    let rows = 0
    let raf = 0
    let lastFrame = 0
    let running = false

    // Per-cell data, rebuilt on resize.
    let white = new Float32Array(0) // logo coverage
    let ink = new Float32Array(0) // frame + lettering coverage
    let dist = new Float32Array(0) // distance out from the chip edge (logo units), -1 inside the chip
    let lane = new Float32Array(0) // per-trace phase offset, so pulses don't fire in lockstep
    let wordRow = -1
    let wordCol = 0
    let word = ""
    let k = 1 // logo unit → px
    let ox = 0
    let oy = 0
    const moon = { x: 0, y: 0, r: 0 } // px

    const rasterise = () => {
      const SS = 3 // supersampling per cell axis
      const off = document.createElement("canvas")
      off.width = cols * SS
      off.height = rows * SS
      const o = off.getContext("2d", { willReadFrequently: true })
      if (!o) return

      o.setTransform((k * SS) / cw, 0, 0, (k * SS) / ch, (ox * SS) / cw, (oy * SS) / ch)
      o.lineCap = "round"
      o.lineJoin = "round"

      // Red channel: everything white in the logo.
      o.fillStyle = o.strokeStyle = "rgb(255,0,0)"
      o.fill(new Path2D(BODY))
      o.lineWidth = 14
      for (const d of TRACES) o.stroke(new Path2D(d))
      o.lineWidth = 13
      for (const [x, y, r] of RINGS) {
        o.beginPath()
        o.arc(x, y, r - 6, 0, Math.PI * 2)
        o.stroke()
      }
      for (const [x, y, r] of DOTS) {
        o.beginPath()
        o.arc(x, y, r, 0, Math.PI * 2)
        o.fill()
      }

      // Green channel: the dark inner frame and "AI", painted over the chip.
      o.fillStyle = o.strokeStyle = "rgb(0,255,0)"
      o.lineWidth = 15
      o.beginPath()
      o.roundRect(FRAME.x, FRAME.y, FRAME.w, FRAME.h, FRAME.r)
      o.stroke()
      o.lineWidth = 34
      o.stroke(new Path2D(LETTER_A))
      o.stroke(new Path2D(LETTER_I))
      o.lineWidth = 20
      o.stroke(new Path2D(A_BAR))

      const px = o.getImageData(0, 0, off.width, off.height).data
      const n = cols * rows
      white = new Float32Array(n)
      ink = new Float32Array(n)
      dist = new Float32Array(n)
      lane = new Float32Array(n)
      const area = SS * SS * 255

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          let r = 0
          let g = 0
          for (let y = 0; y < SS; y++) {
            let p = ((j * SS + y) * off.width + i * SS) * 4
            for (let x = 0; x < SS; x++, p += 4) {
              r += (px[p] * px[p + 3]) / 255
              g += (px[p + 1] * px[p + 3]) / 255
            }
          }
          const idx = j * cols + i
          white[idx] = r / area
          ink[idx] = g / area

          // Cell centre in logo units.
          const u = ((i + 0.5) * cw - ox) / k
          const v = ((j + 0.5) * ch - oy) / k
          const dx = Math.max(CHIP.x0 - u, 0, u - CHIP.x1)
          const dy = Math.max(CHIP.y0 - v, 0, v - CHIP.y1)
          dist[idx] = dx === 0 && dy === 0 ? -1 : Math.max(dx, dy)
          const sector = Math.floor(((Math.atan2(v - LOGO.cy, u - LOGO.cx) + Math.PI) / (Math.PI * 2)) * 16)
          lane[idx] = hash(sector, 7) * 4
        }
      }

      // "SOCIETY" is too small to survive rasterising, so type it into the chip instead.
      wordRow = Math.round((oy + SOCIETY.y * k) / ch - 0.5)
      const span = ((SOCIETY.x1 - SOCIETY.x0) * k) / cw
      word = span >= 13 ? "S O C I E T Y" : span >= 7 ? "SOCIETY" : ""
      wordCol = Math.round((ox + LOGO.cx * k) / cw - word.length / 2)
    }

    const draw = (now: number) => {
      const t = now - born
      ctx.clearRect(0, 0, W, H)
      const scan = ((t * 0.18) % 1.4) - 0.2 // scanline position, 0..1 over the chip
      const chipTop = (oy + CHIP.y0 * k) / ch
      const chipRows = ((CHIP.y1 - CHIP.y0) * k) / ch
      const moonY = moon.y + Math.sin(t * 0.8) * moon.r * 0.18
      const visorYaw = 0.5 + 0.35 * Math.sin(t * 0.47)
      const visor: Vec = norm([Math.sin(visorYaw), -0.1, Math.cos(visorYaw)])

      let current = ""
      const put = (c: string, color: string, x: number, y: number) => {
        if (color !== current) {
          ctx.fillStyle = color
          current = color
        }
        ctx.fillText(c, x, y)
      }

      for (let j = 0; j < rows; j++) {
        const py = j * ch
        const inScan = Math.abs((j - chipTop) / chipRows - scan) < 0.03
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i
          const px = i * cw
          const h = hash(i, j)

          const w = white[idx]
          const g = ink[idx]

          // Typed lettering
          if (j === wordRow && i >= wordCol && i < wordCol + word.length && word[i - wordCol] !== " ") {
            put(word[i - wordCol], COLOR.deep, px, py)
            continue
          }

          // Frame + "AI": solid pixels, so the lettering reads against the dense chip body.
          if (g > 0.42) {
            put(g > 0.62 ? "█" : "▓", COLOR.deep, px, py)
            continue
          }

          if (w > 0.28) {
            const d = dist[idx]
            if (d < 0) {
              // Chip body: dense, gently flickering, with a slow scanline pass.
              const flick = Math.floor(t * 2 + h * 40) % BODY_GLYPHS.length
              const c = inScan ? "@" : h < 0.04 ? BODY_GLYPHS[flick] : w > 0.8 ? "#" : glyph(w)
              put(c, inScan ? COLOR.cream : w > 0.8 ? COLOR.cream : COLOR.frost, px, py)
            } else {
              // Traces + rings: a signal packet travels outward along each one.
              const pos = ((t + lane[idx]) % 2.8) / 2.8 * 200 - 16
              const pulse = Math.exp(-((d - pos) ** 2) / 260)
              if (pulse > 0.5) put(pulse > 0.8 ? "@" : "#", COLOR.pulse, px, py)
              else if (pulse > 0.2) put("+", COLOR.pulseSoft, px, py)
              else put(glyph(0.35 + w * 0.65), w > 0.6 ? COLOR.cream : COLOR.frost, px, py)
            }
            continue
          }

          const cx = px + cw / 2
          const cy = py + ch / 2

          // The moon: a small visored sphere, after the LUNA poster's floating helmet.
          const mx = (cx - moon.x) / moon.r
          const my = (cy - moonY) / moon.r
          const mr2 = mx * mx + my * my
          if (mr2 < 1) {
            const n: Vec = [mx, -my, Math.sqrt(1 - mr2)]
            const v = dot(n, visor)
            if (v > 0.74) {
              const glint = Math.pow(Math.max(0, dot(n, GLINT)), 14)
              put(glint > 0.5 ? "o" : "#", glint > 0.5 ? COLOR.cream : COLOR.deep, px, py)
            } else if (v > 0.68) {
              put("%", COLOR.deep, px, py)
            } else {
              const b = shell(n)
              put(glyph(0.3 + b * 0.7), shellColor(b), px, py)
            }
            continue
          }

          // 90s drop shadow: the logo, offset down-right.
          if (i >= 2 && j >= 1) {
            const s = (j - 1) * cols + (i - 2)
            if (white[s] > 0.35 || ink[s] > 0.42) {
              put("░", COLOR.shade, px, py)
              continue
            }
          }

          // Drifting dust / stars
          if (h < 0.004) {
            const tw = 0.5 + 0.5 * Math.sin(t * 1.3 + h * 4000)
            if (tw > 0.35) put(tw > 0.85 ? "+" : ".", COLOR.cream, px, py)
          }
        }
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = rect.width
      H = rect.height
      if (!W || !H) return
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const fs = W < 420 ? 7.5 : W < 720 ? 8.5 : 10
      ctx.font = `500 ${fs}px ${getComputedStyle(canvas).fontFamily}`
      ctx.textBaseline = "top"
      cw = ctx.measureText("M").width
      ch = fs * 1.2
      cols = Math.ceil(W / cw)
      rows = Math.ceil(H / ch)

      const wide = W > H * 1.05
      // Wide frame (desktop hero): logo hard right, clear of the headline.
      // Square frame (phones): logo centred.
      k = Math.min(W / LOGO.w, H / LOGO.h) * 0.88
      ox = (wide ? W - (LOGO.w * k) / 2 - 8 : W / 2) - LOGO.cx * k
      oy = H / 2 - LOGO.cy * k
      // Moon: small, top-right corner.
      moon.r = Math.max(18, 42 * k)
      moon.x = W - Math.max(moon.r + 10, W * 0.07)
      moon.y = Math.max(moon.r + 10, H * 0.1)
      rasterise()
      draw(performance.now() / 1000)
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (now - lastFrame < 40) return // ~25fps is plenty for ASCII
      lastFrame = now
      draw(now / 1000)
    }
    const start = () => {
      if (running || reduceMotion) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    io.observe(canvas)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", onVisibility)
    document.fonts?.ready.then(resize)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={`font-mono ${className ?? ""}`} />
}
