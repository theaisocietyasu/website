"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MessageSquare, Mail, ChevronRight, Globe } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ThreeDCard } from "@/components/ui/3d-card"

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const contactOptions = [
    {
      icon: <MessageSquare className="h-6 w-6 text-primary-400" />,
      title: "Discord",
      description: "Connect with members and stay updated.",
      buttonText: "Join Discord",
      buttonLink: "https://discord.gg/dCWm6xBGtM",
      iconBg: "bg-primary-900/50",
      borderColor: "from-primary-500 to-primary-700",
      accent: "primary",
      cornerIcon: <MessageSquare className="h-5 w-5 text-primary-400/70" />,
      gradient: "linear-gradient(to bottom right, rgba(99, 102, 241, 0.3), rgba(79, 70, 229, 0.1))", // Alpha increased
    },
    {
      icon: <Mail className="h-6 w-6 text-secondary-400" />,
      title: "Email",
      description: "Contact us for inquiries or partnerships.",
      buttonText: "Email Us",
      buttonLink: "mailto:theaisociety.asu@gmail.com",
      iconBg: "bg-secondary-900/50",
      borderColor: "from-secondary-500 to-secondary-700",
      accent: "secondary",
      cornerIcon: <Mail className="h-5 w-5 text-secondary-400/70" />,
      gradient: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.3), rgba(109, 40, 217, 0.1))", // Alpha increased
    },
    {
      icon: <Globe className="h-6 w-6 text-accent-400" />,
      title: "Sun Devil Central",
      description: "Join our organization on ASU's platform.",
      buttonText: "Visit Page",
      buttonLink: "https://asu.campuslabs.com/engage/organization/the-ai-society",
      iconBg: "bg-accent-900/50",
      borderColor: "from-accent-500 to-accent-700",
      accent: "accent",
      cornerIcon: <Globe className="h-5 w-5 text-accent-400/70" />,
      gradient: "linear-gradient(to bottom right, rgba(236, 72, 153, 0.3), rgba(219, 39, 119, 0.1))", // Alpha increased
    },
  ]

  return (
    <section ref={ref} id="contact" className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
      <ParticleBackground
        particleCount={40}
        particleSize={[1, 3]}
        particleSpeed={[0.1, 0.3]}
        connectDistance={150}
        connectOpacity={0.15}
        particleColor={["#0c8de0", "#7938ee", "#ff3868"]}
        interactive={true}
        interactiveStrength={0.3}
      />
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeading
          title="Get in Touch"
          subtitle="Whether you have a question, feedback, or just want to say hello, feel free to reach out. We're always excited to connect with our community."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactOptions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="w-full h-full" // Added h-full
            >
              <ThreeDCard
                depth={10}
                rotationIntensity={3}
                glareIntensity={0.15}
                hoverScale={1.02}
                backgroundGradient={item.gradient} // Gradient passed to ThreeDCard
                className="h-full"
                containerClassName="h-full"
              >
                <Card variant="glass" className="h-full">
                  {" "}
                  {/* Removed hover:shadow-glow and transition-shadow */}
                  <div className="p-6 flex flex-col items-center text-center h-full relative group">
                    {" "}
                    {/* Changed fixed height to h-full */}
                    <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
                      <div
                        className={cn(
                          "absolute top-0 right-0 w-full h-full bg-gradient-to-bl",
                          `from-${item.accent}-500/20 to-transparent`,
                        )}
                      ></div>
                      <div className="absolute top-4 right-4">{item.cornerIcon}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <div
                      className={cn(
                        "w-12 h-0.5 bg-gradient-to-r rounded-full mx-auto mb-3 pointer-events-none",
                        `from-${item.accent}-500/50 to-dark-500/30`,
                      )}
                    ></div>
                    <p className="text-dark-300 mb-4 flex-grow">{item.description}</p>
                    <div className="w-full relative z-[9999]" style={{ isolation: "isolate" }}>
                      <a
                        href={item.buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full group" // Added group here for hover effects on the border
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(item.buttonLink, "_blank")
                        }}
                      >
                        <div
                          className={cn(
                            `bg-gradient-to-r from-${item.accent}-500/40 to-${item.accent}-700/40 rounded-lg p-[1.5px] transition-all duration-300`,
                            `group-hover:from-${item.accent}-500/60 group-hover:to-${item.accent}-700/60`, // Enhance border on hover
                          )}
                        >
                          <div className="bg-dark-900/70 hover:bg-dark-800/70 text-white rounded-[6.5px] px-4 py-2 flex items-center justify-center transition-colors duration-300">
                            <span>{item.buttonText}</span>
                            <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="absolute bottom-3 right-3 opacity-10 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 3H3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </ThreeDCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
