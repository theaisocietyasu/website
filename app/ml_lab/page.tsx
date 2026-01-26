"use client"

import { useState } from "react"
import Link from "next/link"
import { IconHome, IconUsers, IconCalendar, IconArrowLeft } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { WorkshopContent } from "@/components/labs/workshop-content"
import { ML_WORKSHOPS } from "@/lib/constants"
import { SectionHeading } from "@/components/ui/section-heading"
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
    name: "SDC",
    link: "https://sundevilcentral.eoss.asu.edu/AIS/club_signup",
    icon: <IconCalendar className="h-6 w-6" />,
  },
]

export default function MlLabPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop>(ML_WORKSHOPS[0])

  return (
    <main className="flex flex-col min-h-screen bg-dark-950">
      <Navbar navItems={navItems} />

      <div className="pt-24 pb-16 flex-grow relative container-padding">
        {/* Back to Projects Link - Moved to the top */}
        <div className="flex justify-start mb-6 md:mb-8">
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

        {/* Centered Page Title and Subtitle */}
        <div className="text-center mb-10 md:mb-12">
          <SectionHeading title="Machine Learning Lab" subtitle="Dive into practical ML workshops" alignment="center" />
        </div>

        {/* Workshop Selector */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Select a Workshop</h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {ML_WORKSHOPS.map((workshop) => (
              <button
                key={workshop.id}
                onClick={() => setSelectedWorkshop(workshop)}
                className={`px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base font-medium rounded-lg transition-all duration-300 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950
                  ${
                    selectedWorkshop.id === workshop.id
                      ? "bg-primary-600 text-white shadow-md" // Active state
                      : "bg-dark-800/70 hover:bg-dark-700/90 text-dark-100 hover:text-white" // Inactive state
                  }`}
              >
                {workshop.title}
                {selectedWorkshop.id === workshop.id && (
                  <motion.div
                    layoutId="active-workshop-indicator-ml" // Unique layoutId for this page
                    className="absolute -bottom-1.5 left-1/4 w-1/2 h-0.5 bg-primary-400 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
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
