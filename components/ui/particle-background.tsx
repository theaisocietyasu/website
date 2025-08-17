"use client"

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

// ParticleBackground component removed - returns null to eliminate particle effects
export function ParticleBackground() {
  // Disabled - returns nothing to remove particle effects
  return null
}
