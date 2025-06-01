"use client"

import { useState } from "react"
import Link from "next/link"
import { IconHome, IconUsers, IconCalendar, IconArrowLeft } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { WorkshopContent } from "@/components/labs/workshop-content"
import { ML_WORKSHOPS } from "@/lib/constants"
import { ParticleBackground } from "@/components/ui/particle-background"
import { SectionHeading } from "@/components/ui/section-heading"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import type { NavItem, Workshop } from "@/lib/types"

// Define navigation items
const navItems: NavItem[] = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-6 w-6" />,
  },
  {
    name: "Projects",
    link: "/projects",
    icon: <IconUsers className="h-6 w-6" />,
  },
  {
    name: "Events",
    link: "https://asu.campuslabs.com/engage/organization/the-ai-society/events",
    icon: <IconCalendar className="h-6 w-6" />,
  },
]

export default function MlLabPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop>(ML_WORKSHOPS[0])

  return (
    <main className="flex flex-col min-h-screen bg-dark-950">
      <Navbar navItems={navItems} />

      <div className="pt-24 pb-16 flex-grow relative container-padding">
        <ParticleBackground
          className="absolute inset-0 -z-10"
          particleCount={30}
          particleSize={[0.5, 1.5]}
          particleSpeed={[0.05, 0.15]}
          particleColor={["#6366f1", "#8b5cf6", "#ec4899"]} // Primary, Secondary, Accent
          particleOpacity={[0.2, 0.5]}
          connectParticles={true}
          connectDistance={120}
          connectWidth={0.75}
          connectOpacity={0.15}
          interactive={true}
          interactionRadius={150}
        />

        <div className="flex items-center justify-between mb-10 md:mb-12">
          <SectionHeading title="Machine Learning Lab" subtitle="Dive into practical ML workshops" />
          <Link
            href="/projects"
            className="flex items-center text-primary-400 hover:text-primary-300 transition-colors group"
          >
            <motion.div whileHover={{ x: -3 }} className="flex items-center">
              <IconArrowLeft className="mr-2 h-5 w-5" />
              <span className="text-sm md:text-base">Back to Projects</span>
            </motion.div>
          </Link>
        </div>

        {/* Workshop Selector */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Select a Workshop</h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {ML_WORKSHOPS.map((workshop) => (
              <AnimatedGradientBorder
                key={workshop.id}
                borderRadius="0.5rem"
                borderWidth={1.5}
                glowIntensity={selectedWorkshop.id === workshop.id ? 0.6 : 0}
                hoverEffect={true}
                className="transition-all duration-300"
              >
                <button
                  onClick={() => setSelectedWorkshop(workshop)}
                  className={`w-full px-4 py-3 text-sm md:text-base font-medium rounded-md transition-all duration-300
                    ${
                      selectedWorkshop.id === workshop.id
                        ? "bg-primary-600/80 text-white shadow-lg"
                        : "bg-dark-800/70 hover:bg-dark-700/70 text-dark-100 hover:text-white backdrop-blur-sm"
                    }`}
                >
                  {workshop.title}
                </button>
              </AnimatedGradientBorder>
            ))}
          </div>
        </div>

        {/* Selected Workshop Content */}
        {selectedWorkshop && (
          <motion.div
            key={selectedWorkshop.id} // Ensures re-render on workshop change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WorkshopContent workshop={selectedWorkshop} />
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  )
}
