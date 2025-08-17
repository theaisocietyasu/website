"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Card } from "@/components/ui/card"
import { ThreeDCard } from "@/components/ui/3d-card"
import { Mail, MessageSquare, ExternalLink } from "lucide-react"

const contactMethods = [
  {
    title: "Email Us",
    icon: Mail,
    description: "Reach out for partnerships, questions, or collaboration opportunities.",
    action: "theaisociety@asu.edu",
    href: "mailto:theaisociety@asu.edu",
    gradient: "linear-gradient(to bottom right, rgba(59, 130, 246, 0.5), rgba(59, 130, 246, 0.35))", // Blue
  },
  {
    title: "Join Discord",
    icon: MessageSquare,
    description: "Connect with our community and stay updated on events.",
    action: "Join Server",
    href: "https://discord.gg/dCWm6xBGtM", // Updated href
    gradient: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.5), rgba(139, 92, 246, 0.35))", // Purple
  },
  {
    title: "Sun Devil Central",
    icon: ExternalLink,
    description: "Visit our official ASU organization page for more information.",
    action: "Visit Page",
    href: "https://sundevilcentral.asu.edu/organization/aisociety",
    gradient: "linear-gradient(to bottom right, rgba(236, 72, 153, 0.5), rgba(236, 72, 153, 0.35))", // Red/Pink
  },
]

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 relative overflow-x-hidden"
      id="contact"
    >
      <ParticleBackground
        particleCount={35}
        particleSize={[1, 2]}
        particleSpeed={[0.1, 0.3]}
        connectDistance={100}
        connectOpacity={0.1}
        particleColor={["#6366f1", "#8b5cf6", "#ec4899"]}
        interactive={true}
        interactiveStrength={0.3}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeading
          title="Get In Touch"
          subtitle="Ready to join our community or have questions? We'd love to hear from you!"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {contactMethods.map((method, index) => (
            <div key={index} className="h-full w-full">
              <ThreeDCard
                depth={10}
                rotationIntensity={2}
                glareIntensity={0.1}
                hoverScale={1.02}
                backgroundGradient={method.gradient}
                className="h-full w-full"
              >
                <Card variant="glass" className="h-full w-full">
                  <div className="p-3 sm:p-4 md:p-5 flex flex-col justify-center h-[200px] sm:h-[240px] md:h-[260px] text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 rounded-full bg-primary-900/30 border border-primary-500/30">
                        <method.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-3 text-center">
                      {method.title}
                    </h3>

                    <p className="text-sm sm:text-base text-dark-300 mb-4 leading-relaxed">{method.description}</p>

                    <a
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-300"
                    >
                      {method.action}
                    </a>
                  </div>
                </Card>
              </ThreeDCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
