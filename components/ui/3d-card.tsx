"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseXVal = e.clientX - centerX
    const mouseYVal = e.clientY - centerY

    const rY = (mouseXVal / (rect.width / 2)) * rotationIntensity
    const rX = ((mouseYVal / (rect.height / 2)) * -rotationIntensity) / 2 // Reduced vertical rotation

    setRotateX(rX)
    setRotateY(rY)
    setMouseX(mouseXVal)
    setMouseY(mouseYVal)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setMouseX(0)
    setMouseY(0)
  }

  const actualDepth = isMobile ? Math.min(5, depth) : depth
  // No rotation on mobile for stability, keep hover scale for subtle feedback if desired
  const actualRotationIntensity = isMobile ? 0 : rotationIntensity
  const actualHoverScale = isMobile ? 1.0 : hoverScale // Can be 1.0 if no scale on mobile is preferred

  let rect = { width: 0, height: 0, left: 0, top: 0 }

  if (cardRef.current) {
    rect = cardRef.current.getBoundingClientRect()
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative perspective w-full", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        width: "100%",
      }}
      whileHover={{ scale: actualHoverScale }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={cn(
          "relative preserve-3d w-full rounded-xl overflow-hidden", // Added rounded-xl and overflow-hidden
          className,
        )}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
          width: "100%",
        }}
        transition={{ duration: 0.1 }}
      >
        {backgroundGradient && (
          <div
            className="absolute inset-0 rounded-xl -z-10 w-full h-full"
            style={{
              background: backgroundGradient,
              transform: "translateZ(-1px)",
              pointerEvents: "none",
            }}
          />
        )}

        {!isMobile && glareIntensity > 0 && (
          <div
            className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none" // This already had rounded-xl overflow-hidden
            style={{
              background: `radial-gradient(circle at ${mouseX + rect.width / 2}px ${
                mouseY + rect.height / 2
              }px, rgba(255, 255, 255, ${glareIntensity}), transparent 80%)`,
              transform: `translateZ(${actualDepth / 2}px)`,
              opacity: Math.abs(rotateX) + Math.abs(rotateY) > 0 ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          />
        )}

        <div
          style={{
            transform: `translateZ(${actualDepth}px)`,
            transformStyle: "preserve-3d",
            position: "relative",
            zIndex: 10,
            width: "100%",
          }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}
