"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ThreeDCardProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  depth?: number
  rotationIntensity?: number
  glareIntensity?: number
  hoverScale?: number
  backgroundGradient?: string
}

export function ThreeDCard({
  children,
  className,
  containerClassName,
  depth = 20,
  rotationIntensity = 10,
  glareIntensity = 0.2,
  hoverScale = 1.05,
  backgroundGradient,
}: ThreeDCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation based on mouse position
    const rotateY = (mouseX / (rect.width / 2)) * rotationIntensity
    const rotateX = ((mouseY / (rect.height / 2)) * -rotationIntensity) / 2

    setRotateX(rotateX)
    setRotateY(rotateY)
    setMouseX(mouseX)
    setMouseY(mouseY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setMouseX(0)
    setMouseY(0)
  }

  // Use reduced effects on mobile
  const actualDepth = isMobile ? Math.min(5, depth) : depth
  const actualRotationIntensity = isMobile ? 0 : rotationIntensity // No rotation on mobile
  const actualHoverScale = isMobile ? 1 : hoverScale // No hover scaling on mobile

  return (
    <div
      ref={cardRef}
      className={cn("relative perspective w-full", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        width: "100%", // Ensure full width
      }}
    >
      <div
        className={cn("relative preserve-3d w-full", className)}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
          width: "100%", // Ensure full width
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Background gradient */}
        {backgroundGradient && (
          <div
            className="absolute inset-0 rounded-xl -z-10 w-full h-full"
            style={{
              background: backgroundGradient,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Glare effect - disabled on mobile */}
        {!isMobile && (
          <div
            className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mouseX + 50}% ${
                mouseY + 50
              }%, rgba(255, 255, 255, ${glareIntensity}), transparent 80%)`,
              transform: `translateZ(${actualDepth / 2}px)`,
              opacity: Math.abs(rotateX) + Math.abs(rotateY) > 0 ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          />
        )}

        {/* Content */}
        <div
          style={{
            transform: `translateZ(${actualDepth}px)`,
            transformStyle: "preserve-3d",
            position: "relative",
            zIndex: 10,
            width: "100%", // Ensure full width
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
