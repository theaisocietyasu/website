"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { createNoise3D } from "simplex-noise"
import { cn } from "@/lib/utils"
import type { WavyBackgroundProps } from "@/lib/types"

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: WavyBackgroundProps) {
  const noise = createNoise3D()
  let w: number, h: number, nt: number, i: number, x: number, ctx: any, canvas: any
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number | null>(null)

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001
      case "fast":
        return 0.002
      default:
        return 0.001
    }
  }

  const init = useCallback(() => {
    canvas = canvasRef.current
    ctx = canvas.getContext("2d")
    w = ctx.canvas.width = window.innerWidth
    h = ctx.canvas.height = window.innerHeight
    ctx.filter = `blur(${blur}px)`
    nt = 0
    window.onresize = () => {
      w = ctx.canvas.width = window.innerWidth
      h = ctx.canvas.height = window.innerHeight
      ctx.filter = `blur(${blur}px)`
    }
    render()
  }, [blur])

  const waveColors = colors ?? ["#818cf8", "#c084fc", "#e879f9"]

  const drawWave = (n: number) => {
    nt += getSpeed()
    for (i = 0; i < n; i++) {
      ctx.beginPath()
      ctx.lineWidth = waveWidth || 50
      ctx.strokeStyle = waveColors[i % waveColors.length]
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100
        ctx.lineTo(x, y + h * 0.4) // adjust for height, currently at 50% of the container
      }
      ctx.stroke()
      ctx.closePath()
    }
  }

  const render = () => {
    ctx.fillStyle = backgroundFill || "black"
    ctx.globalAlpha = waveOpacity || 0.5
    ctx.fillRect(0, 0, w, h)
    drawWave(5)
    animationIdRef.current = requestAnimationFrame(render)
  }

  useEffect(() => {
    init()
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [init])

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    // SAFARI BROWSER SUPPORT
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    )
  }, [])

  return (
    <div className={cn("h-screen flex flex-col items-center justify-center", containerClassName)}>
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-9", className)} {...props}>
        {children}
      </div>
    </div>
  )
}
