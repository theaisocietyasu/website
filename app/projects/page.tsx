"use client"

import Image from "next/image"
import Link from "next/link"
import { IconHome, IconUsers, IconCalendar } from "@tabler/icons-react"
import { ChevronRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { SectionHeading } from "@/components/ui/section-heading"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Button } from "@/components/ui/button" // Assuming you have this
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

interface ProjectSectionProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  href: string
  imagePosition?: "left" | "right"
  buttonLabel?: string
  buttonColor?: "primary" | "secondary" | "accent"
}

function ProjectArchiveSection({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  imagePosition = "left",
  buttonLabel = "Explore Section",
  buttonColor = "primary",
}: ProjectSectionProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
      <div className={`relative aspect-video w-full ${imagePosition === "left" ? "md:order-first" : "md:order-last"}`}>
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-contain rounded-xl shadow-2xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={`${imagePosition === "left" ? "md:order-last" : "md:order-first"}`}>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">{title}</h3>
        <p className="text-dark-100 text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed">{description}</p>
        <Link href={href} passHref legacyBehavior>
          <Button variant={buttonColor} size="lg" rightIcon={<ChevronRight className="h-5 w-5" />}>
            {buttonLabel}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const particleColors = ["#6366f1", "#8b5cf6", "#ec4899"] // Consistent with home page

  const projectsData: Omit<ProjectSectionProps, "imagePosition" | "buttonColor">[] = [
    {
      title: "AI Makerspace - Spring 2025",
      description:
        "Explore innovative student projects from our AI Makerspace program, showcasing creative applications of artificial intelligence across various domains.",
      imageSrc: "/ai.png",
      imageAlt: "AI Makerspace - Laptop with code editor",
      href: "/ai_makerspace",
    },
    {
      title: "Machine Learning Lab - Fall 2024",
      description:
        "Join us at AI Society's ML Lab to learn about data cleaning, exploratory analysis, feature engineering, and classification techniques.",
      imageSrc: "/ai-society-chip.png",
      imageAlt: "AI Society computer chip",
      href: "/ml_lab",
    },
    {
      title: "Computer Vision & NLP Lab - Fall 2024",
      description:
        "Dive into natural language processing and computer vision with our comprehensive workshops covering fundamental concepts to advanced implementations.",
      imageSrc: "/nlp-lab-logo.png", // Updated imageSrc
      imageAlt: "AI Society metallic eye logo",
      href: "/nlp_lab",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen bg-dark-950">
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
            className="mb-16 md:mb-24 lg:mb-32"
          />

          <div className="space-y-16 md:space-y-24 lg:space-y-32 max-w-6xl mx-auto">
            {projectsData.map((project, index) => (
              <ProjectArchiveSection
                key={project.title}
                {...project}
                imagePosition={index % 2 === 0 ? "left" : "right"}
                buttonColor={index === 0 ? "primary" : index === 1 ? "secondary" : "accent"}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
