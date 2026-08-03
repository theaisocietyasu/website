"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { ThreeDCard } from "@/components/ui/3d-card"

export function ProgramsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const programs = [
    {
      title: "Workshops",
      description: "From foundational AI concepts and Python basics to complex machine learning and advanced techniques.",
      gradient: "linear-gradient(to bottom right, rgba(99, 102, 241, 0.6), rgba(79, 70, 229, 0.4))",
      delay: 0.1,
    },
    {
      title: "Network Expansion",
      description: "Regular collaborations with organizations and industries across the field of AI.",
      gradient: "linear-gradient(to bottom right, rgba(99, 102, 241, 0.6), rgba(79, 70, 229, 0.4))",
      delay: 0.2,
    },
    {
      title: "AI Flagship Initiative",
      description: "Club wide multidisciplinary project representing the spirit of AI.",
      gradient: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.6), rgba(109, 40, 217, 0.4))",
      delay: 0.3,
    },
    {
      title: "Research Paper Reading",
      description: "Sessions discussing latest AI research papers and breakthrough discoveries.",
      gradient: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.6), rgba(109, 40, 217, 0.4))",
      delay: 0.4,
    },
    {
      title: "Guest Speaker Sessions and Recruitment Events",
      description: "Industry/academic experts and researchers sharing insights on AI trends and career paths.",
      gradient: "linear-gradient(to bottom right, rgba(236, 72, 153, 0.6), rgba(219, 39, 119, 0.4))",
      delay: 0.5,
    },
    {
      title: "Social and Special Events",
      description: "Summits, hackathons, bootcamps, mountain hikes, movie nights, and networking to build lasting friendships.",
      gradient: "linear-gradient(to bottom right, rgba(236, 72, 153, 0.6), rgba(219, 39, 119, 0.4))",
      delay: 0.6,
    },
  ]

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 relative overflow-hidden"
      id="programs"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeading
          title="Our Programs"
          subtitle="Discover our comprehensive range of AI programs designed to foster learning, innovation, and community building at every level."
          titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          subtitleClassName="text-base sm:text-lg"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {programs.map((program, index) => (
            <div key={program.title} className="h-full">
              <ThreeDCard
                depth={12}
                rotationIntensity={3}
                glareIntensity={0.15}
                hoverScale={1.03}
                backgroundGradient={program.gradient}
                className="h-full"
              >
                <Card variant="glass" className="h-full">
                  <div className="p-4 h-[180px] flex flex-col justify-center">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-3 text-center">
                      {program.title}
                    </h3>
                    <p className="text-dark-100 text-sm sm:text-base leading-relaxed text-center">
                      {program.description}
                    </p>
                  </div>
                </Card>
              </ThreeDCard>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-primary-400 font-medium text-sm">
            All programs are designed to accommodate different skill levels and learning preferences.
          </p>
        </div>
      </div>
    </section>
  )
}
