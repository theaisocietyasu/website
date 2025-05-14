"use client"

import { useState } from "react"
import { IconHome, IconUsers, IconCalendar } from "@tabler/icons-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { WorkshopSidebar } from "@/components/labs/workshop-sidebar"
import { WorkshopContent } from "@/components/labs/workshop-content"
import { NLP_WORKSHOPS } from "@/lib/constants"
import { ParticleBackground } from "@/components/ui/particle-background"
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

export default function NlpLabPage() {
  // State to manage the selected workshop
  const [selectedWorkshop, setSelectedWorkshop] = useState(NLP_WORKSHOPS[0])

  return (
    <main className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar navItems={navItems} />

      {/* Content Section */}
      <div className="pt-20 flex flex-grow flex-col lg:flex-row relative">
        <ParticleBackground
          particleCount={20}
          particleSize={[1, 2]}
          particleSpeed={[0.05, 0.2]}
          particleColor={["#7938ee", "#ff3868"]}
          particleOpacity={[0.2, 0.4]}
          connectParticles={true}
          connectDistance={100}
          connectWidth={0.5}
          connectOpacity={0.1}
          interactive={false}
        />

        {/* Sidebar for Workshop Selection */}
        <WorkshopSidebar
          workshops={NLP_WORKSHOPS}
          selectedWorkshop={selectedWorkshop}
          setSelectedWorkshop={setSelectedWorkshop}
          bgColor="bg-gradient-to-br from-secondary-900/30 to-secondary-800/10"
          backLink="/projects"
          backLinkText="Back to Projects"
        />

        {/* Main Content Area */}
        <WorkshopContent workshop={selectedWorkshop} />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
