"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

type Props = {
  children: React.ReactNode
  delay?: number
  variant?: "zoom" | "slide" | "fade"
}

const variants = {
  zoom: { opacity: 1, scale: 1 },
  slide: { opacity: 1, y: 0 },
  fade: { opacity: 1 },
}

export function ScrollReveal({ children, delay = 0, variant = "zoom" }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px", // triggers slightly before fully visible
  })

  const initial =
    variant === "slide"
      ? { opacity: 0, y: 80 }
      : variant === "fade"
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.85 }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? variants[variant] : {}}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1], // smooth cinematic curve
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

