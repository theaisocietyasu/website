"use client"

import { useState } from "react"
import { IconHome, IconUsers, IconCalendar } from "@tabler/icons-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { SectionHeading } from "@/components/ui/section-heading"
import { ParticleBackground } from "@/components/ui/particle-background"
import { ProjectList } from "@/components/projects/project-list"
import { PDFViewer } from "@/components/projects/pdf-viewer"
import { AI_MAKERSPACE_PROJECTS } from "@/lib/constants"
import type { NavItem } from "@/lib/types"

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
  const [selectedProject, setSelectedProject] = useState(AI_MAKERSPACE_PROJECTS[0])

  return (
    <main className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar navItems={navItems} />

      <section className="pt-32 pb-20 px-4 md:px-6 relative">
        <ParticleBackground
          particleCount={30}
          particleSize={[1, 2]}
          particleSpeed={[0.05, 0.2]}
          particleColor={["#ec4899", "#ff3868", "#7938ee"]}
          particleOpacity={[0.2, 0.5]}
          connectParticles={true}
          connectDistance={150}
          connectWidth={0.5}
          connectOpacity={0.1}
          interactive={true}
        />

        <div className="container mx-auto relative z-10">
          <SectionHeading
            title="AI Makerspace Projects"
            subtitle="Explore innovative student projects from our AI Makerspace program, showcasing creative applications of artificial intelligence across various domains."
          />

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Project Selection Sidebar */}
              <ProjectList
                projects={AI_MAKERSPACE_PROJECTS}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />

              {/* PDF Viewer */}
              <div className="lg:w-3/4">
                <PDFViewer
                  pdfUrl={selectedProject.pdfUrl}
                  title={selectedProject.title}
                  team={selectedProject.team}
                  description={selectedProject.description}
                  thumbnailUrl={selectedProject.thumbnailUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
