"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'
import { ThreeDCard } from "@/components/ui/3d-card"

interface ProjectCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  href: string
  bgColor: string // This prop will be used for the ThreeDCard background gradient
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
        e.stopPropagation()
      }}
    >
      <ThreeDCard
        depth={20}
        rotationIntensity={10}
        glareIntensity={0.15} // Matched to home page cards
        hoverScale={1.02}
        backgroundGradient={bgColor} // Using the bgColor prop for the outer tinted gradient
        className="h-full"
      >
        {/* Inner content area with consistent glass styling matching home page */}
        <div className="relative overflow-hidden rounded-2xl h-full min-h-[450px] bg-dark-900 backdrop-blur-md transition-all duration-300 p-8 flex flex-col justify-between">
          <div className="relative z-10 flex flex-col h-full">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
              <p className="text-dark-100 text-lg max-w-[65%]">{description}</p>
            </div>

            <motion.div
              className="flex items-center text-primary-400 font-medium mt-6"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Explore <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-0 right-0 w-1/2 h-1/2 z-0 flex items-end justify-end p-4"
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
        </div>
      </ThreeDCard>
    </Link>
  )
}
