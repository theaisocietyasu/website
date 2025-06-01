"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Layers } from "lucide-react" // Added Layers for corner icon
import { ThreeDCard } from "@/components/ui/3d-card"
import { Card } from "@/components/ui/card" // Import Card component

interface ProjectCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  href: string
  bgColor: string // Used for ThreeDCard backgroundGradient
}

export function ProjectCard({ title, description, imageSrc, imageAlt, href, bgColor }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block h-full"
      onClick={(e) => {
        // Ensure the link works properly
        // e.stopPropagation(); // Usually not needed for Next.js Link if ThreeDCard handles events well
      }}
    >
      <ThreeDCard
        depth={20}
        rotationIntensity={10}
        glareIntensity={0.15}
        hoverScale={1.02}
        backgroundGradient={bgColor}
        className="h-full"
        containerClassName="h-full"
      >
        <Card variant="glass" className="h-full w-full min-h-[450px] overflow-hidden">
          <div className="p-6 md:p-8 relative flex flex-col h-full">
            {/* Top-right decorative element (like home page cards) */}
            <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent opacity-70"></div>
              <div className="absolute top-4 right-4">
                <Layers className="h-5 w-5 text-white/50" />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow relative z-10">
              {" "}
              {/* Ensure content is above image if overlap occurs */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
              <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4"></div>
              <p className="text-dark-200 text-sm md:text-base leading-relaxed max-w-[60%] sm:max-w-[55%]">
                {description}
              </p>
            </div>

            {/* Explore Link */}
            <motion.div
              className="flex items-center text-primary-400 font-medium mt-6 relative z-10 self-start"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Explore <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>

            {/* Image Container - absolutely positioned */}
            <motion.div
              className="absolute bottom-0 right-0 w-[45%] h-[45%] sm:w-[50%] sm:h-[50%] md:w-[220px] md:h-[220px] z-0 flex items-end justify-end p-1" // Adjusted size and padding
              animate={{
                scale: isHovered ? 1.08 : 1, // Slightly more pop for the image
                rotate: isHovered ? -3 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={imageSrc || "/placeholder.svg?height=200&width=200&query=project_visual"}
                width={200} // Intrinsic width, actual size controlled by container
                height={200} // Intrinsic height
                alt={imageAlt}
                className="object-contain opacity-80 group-hover:opacity-90 transition-opacity"
              />
            </motion.div>
          </div>
        </Card>
      </ThreeDCard>
    </Link>
  )
}
