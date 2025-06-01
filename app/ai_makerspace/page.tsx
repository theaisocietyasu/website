"use client"

import { useState } from "react"
import Link from "next/link"
import { IconHome, IconUsers, IconCalendar, IconArrowLeft } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { SectionHeading } from "@/components/ui/section-heading"
import { ParticleBackground } from "@/components/ui/particle-background"
import { PDFViewer } from "@/components/projects/pdf-viewer"
import { AI_MAKERSPACE_PROJECTS } from "@/lib/constants"
import type { NavItem, AIProject } from "@/lib/types"

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

export default function AIMakerspaceProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<AIProject>(AI_MAKERSPACE_PROJECTS[0])

  return (
    <main className="flex flex-col min-h-screen bg-dark-950">
      <Navbar navItems={navItems} />

      <div className="pt-24 pb-16 flex-grow relative container-padding">
        <ParticleBackground
          className="absolute inset-0 -z-10"
          particleCount={30}
          particleSize={[0.5, 1.5]}
          particleSpeed={[0.05, 0.15]}
          particleColor={["#ec4899", "#ff3868", "#db2777"]} // Accent colors
          particleOpacity={[0.2, 0.5]}
          connectParticles={true}
          connectDistance={120}
          connectWidth={0.75}
          connectOpacity={0.15}
          interactive={true}
          interactionRadius={150}
        />

        {/* Back to Projects Link */}
        <div className="flex justify-start mb-6 md:mb-8">
          <Link
            href="/projects"
            className="flex items-center text-accent-400 hover:text-accent-300 transition-colors group"
          >
            <motion.div whileHover={{ x: -3 }} className="flex items-center">
              <IconArrowLeft className="mr-2 h-5 w-5" />
              <span className="text-sm md:text-base">Back to Projects</span>
            </motion.div>
          </Link>
        </div>

        {/* Centered Page Title and Subtitle */}
        <div className="text-center mb-10 md:mb-12">
          <SectionHeading
            title="AI Makerspace Projects"
            subtitle="Explore innovative student projects from our AI Makerspace program."
            alignment="center"
          />
        </div>

        {/* Project Selector */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Select a Project</h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {AI_MAKERSPACE_PROJECTS.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base font-medium rounded-lg transition-all duration-300 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950
                  ${
                    selectedProject.id === project.id
                      ? "bg-accent-600 text-white shadow-md" // Active state
                      : "bg-dark-800/70 hover:bg-dark-700/90 text-dark-100 hover:text-white" // Inactive state
                  }`}
              >
                {project.title}
                {selectedProject.id === project.id && (
                  <motion.div
                    layoutId="active-project-indicator-aim" // Unique layoutId for this page
                    className="absolute -bottom-1.5 left-1/4 w-1/2 h-0.5 bg-accent-400 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Project Content (PDF Viewer and Info) */}
        {selectedProject && (
          <motion.div
            key={selectedProject.id} // Ensures re-render on project change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto" // Constrain width for better readability of PDF area
          >
            <PDFViewer
              pdfUrl={selectedProject.pdfUrl}
              title={selectedProject.title}
              team={selectedProject.team}
              description={selectedProject.description}
              thumbnailUrl={selectedProject.thumbnailUrl}
            />
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  )
}
