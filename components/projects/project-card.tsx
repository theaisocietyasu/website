"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ThreeDCard } from "@/components/ui/3d-card"
import { Card } from "@/components/ui/card" // Ensure Card is imported
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
        e.stopPropagation() // Important for nested interactive elements if any
      }}
    >
      <ThreeDCard
        depth={10}
        rotationIntensity={3}
        glareIntensity={0.15}
        hoverScale={1.02}
        backgroundGradient={bgColor} // Applies the semi-transparent color tint
        className="h-full" // Ensures ThreeDCard's motion div takes full height
      >
        <Card
          variant="glass" // Provides: opaque bg-dark-900, backdrop-blur-md, border-0, rounded-xl
          padding="md" // Applies p-5, matching the default of Card in AboutMembershipSection
          className="h-full w-full" // Ensures Card takes full height of ThreeDCard's content area
        >
          {/* This inner div now precisely mimics the structure and styling of home page card content containers */}
          <div className="relative flex h-full flex-col justify-between p-3 sm:p-5 md:p-8 min-h-[250px] sm:min-h-[300px] md:min-h-[350px]">
            {/* Text content part */}
            <div className="relative z-10">
              {" "}
              {/* z-10 to ensure text is above the absolutely positioned image if overlap occurs */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
              <p className="text-dark-100 text-lg max-w-[65%]">{description}</p>
            </div>

            {/* Explore link part, pushed to bottom */}
            <motion.div
              className="relative z-10 mt-auto flex items-center pt-4 font-medium text-primary-400" // mt-auto pushes to bottom of flex container
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Explore <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>

            {/* Absolutely positioned image relative to the padded inner div */}
            <motion.div
              className="absolute bottom-0 right-0 z-0 flex h-1/2 w-1/2 items-end justify-end p-1 sm:p-2 md:p-4" // Adjusted padding for image container
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
        </Card>
      </ThreeDCard>
    </Link>
  )
}
