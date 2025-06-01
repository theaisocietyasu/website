"use client"

import { IconHome, IconUsers, IconCalendar } from "@tabler/icons-react"
import { Award, Users, Gift } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { GenericContentCard } from "@/components/ui/generic-content-card"
import { SectionHeading } from "@/components/ui/section-heading"
import { ParticleBackground } from "@/components/ui/particle-background"
import type { NavItem } from "@/lib/types"

const navItems: NavItem[] = [
  { name: "Home", link: "/", icon: <IconHome className="h-6 w-6" /> },
  { name: "Projects", link: "/projects", icon: <IconUsers className="h-6 w-6" /> },
  {
    name: "Events",
    link: "https://asu.campuslabs.com/engage/organization/the-ai-society/events",
    icon: <IconCalendar className="h-6 w-6" />,
  },
]

export default function ProjectsPage() {
  const firstCardGradient = "linear-gradient(to bottom right, rgba(99, 102, 241, 0.3), rgba(79, 70, 229, 0.1))"
  const secondCardGradient = "linear-gradient(to bottom right, rgba(139, 92, 246, 0.3), rgba(109, 40, 217, 0.1))"
  const thirdCardGradient = "linear-gradient(to bottom right, rgba(236, 72, 153, 0.3), rgba(219, 39, 119, 0.1))"

  const particleColors = ["#6366f1", "#8b5cf6", "#ec4899"]

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar navItems={navItems} />
      <section className="py-16 md:py-20 lg:py-32 px-6 relative">
        <ParticleBackground
          particleCount={30}
          particleSize={[1, 2]}
          particleSpeed={[0.05, 0.2]}
          particleColor={particleColors}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <GenericContentCard
              title="AI Makerspace - Spring 2025"
              description="Explore innovative student projects from our AI Makerspace program, showcasing creative applications of artificial intelligence across various domains."
              imageSrc="/ai.png"
              imageAlt="AI Makerspace - Laptop with code editor"
              href="/ai_makerspace"
              backgroundGradient={firstCardGradient}
              cornerIcon={Award}
              cornerIconColorClass="text-primary-400/70"
              containerClassName="md:col-span-2"
            />
            <GenericContentCard
              title="Machine Learning Lab - Fall 2024"
              description="Join us at AI Society's ML Lab to learn about data cleaning, exploratory analysis, feature engineering, and classification techniques."
              imageSrc="/wobble3.png"
              imageAlt="Machine Learning Lab - Holographic AI Society Package"
              href="/ml_lab"
              backgroundGradient={secondCardGradient}
              cornerIcon={Users}
              cornerIconColorClass="text-secondary-400/70"
              containerClassName="md:col-span-1"
            />
            <GenericContentCard
              title="Computer Vision & NLP Lab - Fall 2024"
              description="Dive into natural language processing and computer vision with our comprehensive workshops covering fundamental concepts to advanced implementations."
              imageSrc="/wobble4.png"
              imageAlt="Computer Vision & NLP Lab - AI Society Package with Caution Tape"
              href="/nlp_lab"
              backgroundGradient={thirdCardGradient}
              cornerIcon={Gift}
              cornerIconColorClass="text-accent-400/70"
              containerClassName="md:col-span-1"
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
