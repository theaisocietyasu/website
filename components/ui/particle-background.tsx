"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

interface ParticleBackgroundProps {
  className?: string
  particleCount?: number
  particleSize?: [number, number]
  particleSpeed?: [number, number]
  particleColor?: string[]
  particleOpacity?: [number, number]
  connectParticles?: boolean
  connectDistance?: number
  connectWidth?: number
  connectColor?: string
  connectOpacity?: number
  interactive?: boolean
  interactiveDistance?: number
  interactiveStrength?: number
}

export function ParticleBackground({
  className,
  particleCount = 50,
  particleSize = [1, 3],
  particleSpeed = [0.1, 0.5],
  particleColor = ["#6366f1", "#8b5cf6", "#ec4899"],
  particleOpacity = [0.3, 0.7],
  connectParticles = true,
  connectDistance = 120,
  connectWidth = 1,
  connectColor = "#ffffff",
  connectOpacity = 0.2,
  interactive = true,
  interactiveDistance = 150,
  interactiveStrength = 10,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * (particleSize[1] - particleSize[0]) + particleSize[0]
      const speedX = (Math.random() - 0.5) * (particleSpeed[1] - particleSpeed[0]) + particleSpeed[0]
      const speedY = (Math.random() - 0.5) * (particleSpeed[1] - particleSpeed[0]) + particleSpeed[0]
      const color = particleColor[Math.floor(Math.random() * particleColor.length)]
      const opacity = Math.random() * (particleOpacity[1] - particleOpacity[0]) + particleOpacity[0]

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX,
        speedY,
        color,
        opacity,
      })
    }

    particlesRef.current = particles

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null }
    }

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseleave", handleMouseLeave)
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }

        // Mouse interaction
        if (interactive && mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < interactiveDistance) {
            const forceX = (dx / distance) * interactiveStrength
            const forceY = (dy / distance) * interactiveStrength
            particle.speedX += forceX / 100
            particle.speedY += forceY / 100
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()
        ctx.globalAlpha = 1

        // Connect particles
        if (connectParticles) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const otherParticle = particlesRef.current[j]
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectDistance) {
              ctx.beginPath()
              ctx.strokeStyle = connectColor
              ctx.globalAlpha = (1 - distance / connectDistance) * connectOpacity
              ctx.lineWidth = connectWidth
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
              ctx.globalAlpha = 1
            }
          }
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [
    particleCount,
    particleSize,
    particleSpeed,
    particleColor,
    particleOpacity,
    connectParticles,
    connectDistance,
    connectWidth,
    connectColor,
    connectOpacity,
    interactive,
    interactiveDistance,
    interactiveStrength,
  ])

  return <canvas ref={canvasRef} className={cn("fixed inset-0 -z-10", className)} />
}
