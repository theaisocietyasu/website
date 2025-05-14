"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedLogoProps {
  className?: string
  containerClassName?: string
  size?: number
  animationDuration?: number
}

export function AnimatedLogo({ className, containerClassName, size = 300, animationDuration = 10 }: AnimatedLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Create dots around the logo
  const dots = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2
    const radius = size * 0.6
    const delay = i * 0.2
    const dotSize = Math.random() * 10 + 5

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      size: dotSize,
      delay,
    }
  })

  return (
    <div ref={containerRef} className={cn("relative", containerClassName)}>
      {/* Animated dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-dark-800"
          style={{
            width: dot.size,
            height: dot.size,
            left: `calc(50% + ${dot.x}px)`,
            top: `calc(50% + ${dot.y}px)`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: animationDuration,
            delay: dot.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Logo */}
      <motion.div
        className={cn("relative z-10", className)}
        animate={{ rotate: 360 }}
        transition={{
          duration: animationDuration * 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Image src="/logo.png" alt="The AI Society Logo" width={size} height={size} className="object-contain" />
      </motion.div>
    </div>
  )
}
