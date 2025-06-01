"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { ThreeDCard } from "@/components/ui/3d-card"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface GenericContentCardProps {
  title: string
  description: string
  href: string
  backgroundGradient: string
  imageSrc?: string
  imageAlt?: string
  cornerIcon?: LucideIcon
  cornerIconColorClass?: string
  containerClassName?: string
}

export function GenericContentCard({
  title,
  description,
  href,
  backgroundGradient,
  imageSrc,
  imageAlt,
  cornerIcon: CornerIcon,
  cornerIconColorClass,
  containerClassName,
}: GenericContentCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("block h-full", containerClassName)}
    >
      <ThreeDCard
        depth={10}
        rotationIntensity={3}
        glareIntensity={0.15}
        hoverScale={1.02}
        backgroundGradient={backgroundGradient}
        className="h-full"
      >
        <Card variant="glass" padding="md" className="h-full w-full">
          <div className="relative flex h-full flex-col justify-between p-3 sm:p-5 md:p-8 min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
            {CornerIcon && (
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 pointer-events-none">
                <div
                  className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${cornerIconColorClass ? cornerIconColorClass.replace("text-", "from-").split("/")[0] + "/20" : "from-primary-500/20"} to-transparent`}
                ></div>
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <CornerIcon className={cn("h-5 w-5 sm:h-6 sm:w-6", cornerIconColorClass || "text-primary-400/70")} />
                </div>
              </div>
            )}

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
              <p className="text-dark-100 text-base md:text-lg leading-relaxed max-w-[80%] sm:max-w-[70%] md:max-w-[65%]">
                {description}
              </p>
            </div>

            <motion.div
              className="relative z-10 mt-auto flex items-center pt-4 font-medium text-primary-400"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Explore <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>

            {imageSrc && (
              <motion.div
                className="absolute bottom-0 right-0 z-0 flex h-1/2 w-1/2 items-end justify-end p-1 sm:p-2 md:p-4"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  rotate: isHovered ? -2 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={imageSrc || "/placeholder.svg"}
                  width={200}
                  height={200}
                  alt={imageAlt || title}
                  className="object-contain opacity-80"
                />
              </motion.div>
            )}
          </div>
        </Card>
      </ThreeDCard>
    </Link>
  )
}
