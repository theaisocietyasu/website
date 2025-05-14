"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import type { Workshop } from "@/lib/types"

interface WorkshopSidebarProps {
  workshops: Workshop[]
  selectedWorkshop: Workshop
  setSelectedWorkshop: (workshop: Workshop) => void
  bgColor: string
  backLink: string
  backLinkText: string
}

export function WorkshopSidebar({
  workshops,
  selectedWorkshop,
  setSelectedWorkshop,
  bgColor,
  backLink,
  backLinkText,
}: WorkshopSidebarProps) {
  return (
    <div className={`workshop-sidebar w-full lg:w-1/4 p-6 ${bgColor}`}>
      {/* Back to Projects Button */}
      <Link href={backLink} className="flex items-center text-dark-200 hover:text-white transition-colors mb-8 group">
        <motion.div whileHover={{ x: -3 }} className="flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span className="text-lg">{backLinkText}</span>
        </motion.div>
      </Link>

      {/* Workshops Header */}
      <h2 className="text-2xl font-bold text-white mb-6">Workshops</h2>

      {/* Workshop List */}
      <ul className="workshop-list space-y-2">
        {workshops.map((workshop) => (
          <li key={workshop.id} className={`workshop-list-item ${selectedWorkshop.id === workshop.id ? "active" : ""}`}>
            <AnimatedGradientBorder
              borderRadius="0.5rem"
              borderWidth={1}
              glowIntensity={selectedWorkshop.id === workshop.id ? 0.5 : 0}
              hoverEffect={true}
            >
              <button
                className="text-left w-full p-3 bg-dark-900/50 backdrop-blur-sm"
                onClick={() => setSelectedWorkshop(workshop)}
              >
                {workshop.title}
              </button>
            </AnimatedGradientBorder>
          </li>
        ))}
      </ul>
    </div>
  )
}
