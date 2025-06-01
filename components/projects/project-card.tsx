"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ThreeDCard } from "@/components/ui/3d-card"
import { Card } from "@/components/ui/card" // Import Card
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  href: string
  bgColor: string // This is the semi-transparent RGBA gradient for ThreeDCard
  containerClassName?: string
}

export function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  bgColor,
  containerClassName,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("block h-full", containerClassName)}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <ThreeDCard
        depth={10}
        rotationIntensity={3}
        glareIntensity={0.15}
        hoverScale={1.02}
        backgroundGradient={bgColor} // This applies the semi-transparent color tint
        className="h-full"
      >
        {/* Use the Card component directly for perfect style parity */}
        <Card
          variant="glass"
          padding="lg" // Matches home page cards (p-7)
          className="h-full min-h-[450px] flex flex-col justify-between"
        >
          {/* Content Container */}
          <div className="relative z-10 flex flex-col h-full">
            {" "}
            {/* Ensure content is above image if overlapping */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
              <p className="text-dark-100 text-lg max-w-[65%]">{description}</p>
            </div>
            <motion.div
              className="flex items-center text-primary-400 font-medium mt-auto pt-4" // Added mt-auto and pt-4 for spacing
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Explore <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </div>

          {/* Image Container - ensure it doesn't cause overflow issues with flex */}
          <motion.div
            className="absolute bottom-0 right-0 w-1/2 h-1/2 z-0 flex items-end justify-end p-4" // p-4 to keep image from edge
            animate={{
              scale: isHovered ? 1.05 : 1,
              rotate: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={imageSrc || "/placeholder.svg?height=400&width=400&query=abstract tech pattern"}
              width={250}
              height={250}
              alt={imageAlt}
              className="object-contain opacity-80"
            />
          </motion.div>
        </Card>
      </ThreeDCard>
    </Link>
  )
}
