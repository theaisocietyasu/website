"use client"

import { useState, useEffect } from "react"
import Confetti from "react-confetti"

interface ConfettiEffectProps {
  duration?: number
  numberOfPieces?: number
  colors?: string[]
}

export function ConfettiEffect({
  duration = 5000,
  numberOfPieces = 200,
  colors = ["#6366f1", "#8b5cf6", "#ec4899", "#0c8de0", "#7938ee", "#ff3868"],
}: ConfettiEffectProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    // Set dimensions
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Initial dimensions
    updateDimensions()

    // Add event listener for window resize
    window.addEventListener("resize", updateDimensions)

    // Set timeout to stop creating new confetti after duration
    const timer = setTimeout(() => {
      setIsActive(false)
    }, duration)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", updateDimensions)
    }
  }, [duration])

  if (!dimensions.width || !dimensions.height) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={isActive ? numberOfPieces : 0}
        recycle={false}
        colors={colors}
        gravity={0.25}
        initialVelocityY={3}
        tweenDuration={5000}
        drawShape={(ctx) => {
          // Draw solid square/rectangle shapes
          const size = Math.random() * 10 + 5
          ctx.beginPath()
          ctx.rect(-size / 2, -size / 2, size, size)
          ctx.fill()
        }}
      />
    </div>
  )
}
