"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  children: React.ReactNode
  className?: string
  size?: number
  color?: string
  opacity?: number
}

export function Spotlight({ children, className, size = 500, color = "white", opacity = 0.15 }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity_, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPosition({ x, y })
    setOpacity(opacity)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("mousemove", handleMouseMove as any)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove as any)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="pointer-events-none absolute -inset-px z-0"
        animate={{
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${color}, transparent)`,
          opacity: opacity_,
        }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
