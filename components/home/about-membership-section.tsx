"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Award, Gift, Zap, ChevronRight, Sparkles, BarChart3, Globe } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Card } from "@/components/ui/card"
import { ThreeDCard } from "@/components/ui/3d-card"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"

export function AboutMembershipSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const membershipCardsRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-4 md:px-6 bg-dark-950 relative overflow-hidden"
      id="about-membership"
    >
      <ParticleBackground
        particleCount={30}
        particleSize={[1, 2]}
        particleSpeed={[0.1, 0.3]}
        connectDistance={100}
        connectOpacity={0.1}
        particleColor={["#6366f1", "#8b5cf6", "#ec4899"]}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeading
          title="About Us & Membership"
          subtitle="Join our community of passionate AI enthusiasts dedicated to nurturing knowledge and driving innovation in the field of Artificial Intelligence."
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {/* Mission Statement - Spans 8 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 h-full"
          >
            <ThreeDCard
              depth={15}
              rotationIntensity={5}
              glareIntensity={0.15}
              hoverScale={1.02}
              backgroundGradient="linear-gradient(to bottom right, rgba(99, 102, 241, 0.2), rgba(79, 70, 229, 0.05))"
              className="h-full"
            >
              <Card variant="glass" className="h-full border-0 bg-transparent backdrop-blur-none">
                <div className="flex flex-col h-[500px] p-8 relative overflow-hidden">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary-500/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <Sparkles className="h-6 w-6 text-primary-400/70" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold mb-4 text-white">Our Mission</h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6"></div>
                  <p className="text-dark-100 mb-6 text-lg">
                    We are not just a club; we are a thriving community of lifelong learners. Through a wide array of
                    workshops, tutorials, and hands-on projects, we offer a dynamic platform for students to explore,
                    learn, grow, and connect with peers who share their passion for artificial intelligence.
                  </p>
                  <p className="text-dark-200 mb-8">
                    Our goal is to make AI education accessible to all ASU students, regardless of their background or
                    major. We believe that AI will transform every industry, and we want to prepare our members for that
                    future.
                  </p>
                  <div className="mt-auto flex flex-wrap gap-4">
                    <AnimatedGradientBorder
                      borderRadius="0.5rem"
                      borderWidth={1}
                      glowIntensity={0.5}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="ghost"
                        size="lg"
                        className="bg-dark-900/80 hover:bg-dark-800/80 border-0 w-full group"
                        onClick={() =>
                          window.open("https://asu.campuslabs.com/engage/organization/the-ai-society", "_blank")
                        }
                      >
                        <Zap className="mr-2 h-5 w-5" />
                        Join Our Community
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </AnimatedGradientBorder>
                    <AnimatedGradientBorder
                      borderRadius="0.5rem"
                      borderWidth={1}
                      glowIntensity={0.3}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="ghost"
                        size="lg"
                        className="bg-dark-900/80 hover:bg-dark-800/80 border-0 w-full group"
                        onClick={() => window.open("https://discord.gg/dCWm6xBGtM", "_blank")}
                      >
                        Join Discord
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </AnimatedGradientBorder>
                  </div>
                </div>
              </Card>
            </ThreeDCard>
          </motion.div>

          {/* Stats Card - Spans 4 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 h-full"
          >
            <ThreeDCard
              depth={15}
              rotationIntensity={5}
              glareIntensity={0.15}
              hoverScale={1.02}
              backgroundGradient="linear-gradient(to bottom right, rgba(139, 92, 246, 0.2), rgba(109, 40, 217, 0.05))"
              className="h-full"
            >
              <Card variant="glass" className="h-full border-0 bg-transparent backdrop-blur-none">
                <div className="p-8 flex flex-col h-[500px] relative">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-secondary-500/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <BarChart3 className="h-6 w-6 text-secondary-400/70" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">By The Numbers</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full mb-6"></div>

                  <div className="space-y-6 mt-2">
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-lg bg-primary-900/50 flex items-center justify-center mr-4">
                        <Users className="h-7 w-7 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white">350+</p>
                        <p className="text-dark-300 text-sm">General Members</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-lg bg-secondary-900/50 flex items-center justify-center mr-4">
                        <Zap className="h-7 w-7 text-secondary-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white">30+</p>
                        <p className="text-dark-300 text-sm">Events Per Year</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-lg bg-accent-900/50 flex items-center justify-center mr-4">
                        <Globe className="h-7 w-7 text-accent-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white">2</p>
                        <p className="text-dark-300 text-sm">Officer Teams</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </ThreeDCard>
          </motion.div>

          {/* Membership Cards Row */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Officer Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-full"
            >
              <ThreeDCard
                depth={15}
                rotationIntensity={5}
                glareIntensity={0.15}
                hoverScale={1.02}
                backgroundGradient="linear-gradient(to bottom right, rgba(99, 102, 241, 0.2), rgba(79, 70, 229, 0.05))"
                className="h-full"
              >
                <Card variant="glass" className="h-full border-0 bg-transparent backdrop-blur-none">
                  <div className="p-8 flex flex-col h-[400px] relative">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary-500/20 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <Award className="h-6 w-6 text-primary-400/70" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">Officer</h3>

                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-dark-500 rounded-full mb-5"></div>

                    <div className="space-y-5">
                      <div>
                        <p className="text-primary-300 font-medium mb-2">How:</p>
                        <p className="text-dark-100">
                          Apply through our website. Applications are reviewed on a rolling basis.
                        </p>
                      </div>

                      <div>
                        <p className="text-primary-300 font-medium mb-2">Why:</p>
                        <p className="text-dark-100">
                          Access to funding, alumni network, and opportunities with partner research labs.
                        </p>
                      </div>
                    </div>

                    {/* Subtle corner decoration */}
                    <div className="absolute bottom-3 right-3 opacity-20 transition-opacity duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 3H3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </ThreeDCard>
            </motion.div>

            {/* General Member Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-full"
            >
              <ThreeDCard
                depth={15}
                rotationIntensity={5}
                glareIntensity={0.15}
                hoverScale={1.02}
                backgroundGradient="linear-gradient(to bottom right, rgba(139, 92, 246, 0.2), rgba(109, 40, 217, 0.05))"
                className="h-full"
              >
                <Card variant="glass" className="h-full border-0 bg-transparent backdrop-blur-none">
                  <div className="p-8 flex flex-col h-[400px] relative">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-secondary-500/20 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <Users className="h-6 w-6 text-secondary-400/70" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">General Member</h3>

                    <div className="w-16 h-1 bg-gradient-to-r from-secondary-500 to-dark-500 rounded-full mb-5"></div>

                    <div className="space-y-5">
                      <div>
                        <p className="text-secondary-300 font-medium mb-2">How:</p>
                        <p className="text-dark-100">
                          Join through{" "}
                          <a
                            href="https://asu.campuslabs.com/engage/organization/the-ai-society"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary-400 hover:text-secondary-300 underline"
                          >
                            Sun Devil Sync
                          </a>{" "}
                          and our{" "}
                          <a
                            href="https://discord.gg/dCWm6xBGtM"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary-400 hover:text-secondary-300 underline"
                          >
                            Discord
                          </a>
                          .
                        </p>
                      </div>

                      <div>
                        <p className="text-secondary-300 font-medium mb-2">Why:</p>
                        <p className="text-dark-100">
                          Access to workshops, events, and resume book placement with consistent participation.
                        </p>
                      </div>
                    </div>

                    {/* Subtle corner decoration */}
                    <div className="absolute bottom-3 right-3 opacity-20 transition-opacity duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 3H3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </ThreeDCard>
            </motion.div>

            {/* Sponsor Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-full"
            >
              <ThreeDCard
                depth={15}
                rotationIntensity={5}
                glareIntensity={0.15}
                hoverScale={1.02}
                backgroundGradient="linear-gradient(to bottom right, rgba(236, 72, 153, 0.2), rgba(219, 39, 119, 0.05))"
                className="h-full"
              >
                <Card variant="glass" className="h-full border-0 bg-transparent backdrop-blur-none">
                  <div className="p-8 flex flex-col h-[400px] relative">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-accent-500/20 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <Gift className="h-6 w-6 text-accent-400/70" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">Sponsor</h3>

                    <div className="w-16 h-1 bg-gradient-to-r from-accent-500 to-dark-500 rounded-full mb-5"></div>

                    <div className="space-y-5">
                      <div>
                        <p className="text-accent-300 font-medium mb-2">How:</p>
                        <p className="text-dark-100">
                          Partner with us by contacting{" "}
                          <a
                            href="mailto:theaisociety.asu@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-400 hover:text-accent-300 underline"
                          >
                            theaisociety.asu@gmail.com
                          </a>
                        </p>
                      </div>

                      <div>
                        <p className="text-accent-300 font-medium mb-2">Why:</p>
                        <p className="text-dark-100">
                          Visibility in our community, exclusive events access, and our curated AI/ML talent resume
                          book.
                        </p>
                      </div>
                    </div>

                    {/* Subtle corner decoration */}
                    <div className="absolute bottom-3 right-3 opacity-20 transition-opacity duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 3H3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </ThreeDCard>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-primary-400 font-medium text-lg">
            Join us for an engaging, hands-on learning experience and valuable networking opportunities!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
