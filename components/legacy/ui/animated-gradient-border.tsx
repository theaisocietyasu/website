"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  duration?: number
  borderWidth?: number
  borderRadius?: string
  colors?: string[]
  glowIntensity?: number
  hoverEffect?: boolean
}

export function AnimatedGradientBorder({
  children,
  className,
  containerClassName,
  duration = 8,
  borderWidth = 2,
  borderRadius = "1rem",
  colors = ["#6366f1", "#8b5cf6", "#ec4899", "#6366f1"],
  glowIntensity = 0.5,
  hoverEffect = true,
}: AnimatedGradientBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const gradientWidth = dimensions.width + borderWidth * 2
  const gradientHeight = dimensions.height + borderWidth * 2

  return (
    <div
      ref={containerRef}
      className={cn("relative", containerClassName)}
      onMouseEnter={() => hoverEffect && setIsHovered(true)}
      onMouseLeave={() => hoverEffect && setIsHovered(false)}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          borderRadius,
          filter: `blur(${borderWidth * 5}px)`,
          opacity: isHovered ? glowIntensity : glowIntensity / 2,
          transition: "opacity 0.3s ease",
        }}
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              {colors.map((color, index) => (
                <stop
                  key={index}
                  offset={`${(index / (colors.length - 1)) * 100}%`}
                  stopColor={color}
                  stopOpacity="1"
                />
              ))}
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="none" stroke="url(#borderGradient)" strokeWidth={borderWidth * 3} />
        </svg>
      </div>

      <motion.div
        className="absolute -inset-px -z-10 overflow-hidden"
        style={{ borderRadius }}
        animate={{
          background: `conic-gradient(from ${360 * (isHovered ? 2 : 1)}deg at 50% 50%, ${colors.join(", ")})`,
        }}
        transition={{ duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div
          className="absolute inset-px"
          style={{
            borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
            background: "var(--dark-950)",
          }}
        ></div>
      </motion.div>

      <div
        className={cn("relative z-0", className)}
        style={{
          borderRadius,
        }}
      >
        {children}
      </div>
    </div>
  )
}
