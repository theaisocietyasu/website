"use client"

import { IconHome, IconUsers, IconCalendar } from "@tabler/icons-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ProjectCard } from "@/components/projects/project-card"
import { SectionHeading } from "@/components/ui/section-heading"
import { ParticleBackground } from "@/components/ui/particle-background"
import type { NavItem } from "@/lib/types"
import { colors } from "@/lib/theme" // Import theme colors

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

export default function ProjectsPage() {
  // Define very dark, subtly tinted gradients for project cards
  // to match the home page's overall visual style and alpha.
  const mlLabBgColor = `linear-gradient(to bottom right, ${colors.primary[900]}, ${colors.primary[950]})`
  const cvNlpLabBgColor = `linear-gradient(to bottom right, ${colors.secondary[900]}, ${colors.secondary[950]})`
  const aiMakerspaceBgColor = `linear-gradient(to bottom right, ${colors.accent[900]}, ${colors.accent[950]})`

  return (
    <main className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar navItems={navItems} />

      <section className="pt-32 pb-20 px-4 md:px-6 relative">
        <ParticleBackground
          particleCount={30}
          particleSize={[1, 2]}
          particleSpeed={[0.05, 0.2]}
          particleColor={["#0c8de0", "#7938ee", "#ff3868"]} // These are for particles, not cards
          particleOpacity={[0.2, 0.5]}
          connectParticles={true}
          connectDistance={150}
          connectWidth={0.5}
          connectOpacity={0.1}
          interactive={true}
          interactiveStrength={0.3}
        />

        <div className="container mx-auto relative z-10">
          <SectionHeading
            title="Archive"
            subtitle="Explore our workshops and learning resources from past semesters. These materials are designed to help you develop your AI skills."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto h-full">
            <div className="h-full">
              <ProjectCard
                title="Machine Learning Lab - Fall 2024"
                description="Join us at AI Society's ML Lab to learn about data cleaning, exploratory analysis, feature engineering, and classification techniques."
                imageSrc="/wobble3.png"
                imageAlt="Machine Learning Lab - Holographic AI Society Package"
                href="/ml_lab"
                bgColor={mlLabBgColor}
              />
            </div>

            <div className="h-full">
              <ProjectCard
                title="Computer Vision & NLP Lab - Fall 2024"
                description="Dive into natural language processing and computer vision with our comprehensive workshops covering fundamental concepts to advanced implementations."
                imageSrc="/wobble4.png"
                imageAlt="Computer Vision & NLP Lab - AI Society Package with Caution Tape"
                href="/nlp_lab"
                bgColor={cvNlpLabBgColor}
              />
            </div>

            <div className="h-full">
              <ProjectCard
                title="AI Makerspace - Spring 2025"
                description="Explore innovative student projects from our AI Makerspace program, showcasing creative applications of artificial intelligence across various domains."
                imageSrc="/ai.png"
                imageAlt="AI Makerspace - Laptop with code editor"
                href="/ai_makerspace"
                bgColor={aiMakerspaceBgColor}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
