"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Award, Gift, Zap, ChevronRight, Sparkles, BarChart3 } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Card } from "@/components/ui/card"
import { ThreeDCard } from "@/components/ui/3d-card"

export function AboutMembershipSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const membershipCardsRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 lg:py-32 px-4 md:px-6 relative overflow-x-hidden"
      id="about-membership"
    >
      <ParticleBackground
        particleCount={30}
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
          title="About Us & Membership"
          subtitle="Join our community of passionate AI enthusiasts dedicated to nurturing knowledge and driving innovation in the field of Artificial Intelligence."
          titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          subtitleClassName="text-base sm:text-lg"
        />

        {/* Bento Grid Layout - Adjust column spacing for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 mb-8 md:mb-12 w-full">
          {/* Mission Statement - Spans 8 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 h-full w-full"
          >
            <ThreeDCard
              depth={10} // Reduced depth for better mobile rendering
              rotationIntensity={3} // Reduced rotation intensity
              glareIntensity={0.15}
              hoverScale={1.02}
              backgroundGradient="linear-gradient(to bottom right, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.05))"
              className="h-full w-full"
            >
              <Card variant="glass" className="h-full w-full">
                <div className="flex flex-col min-h-[250px] sm:min-h-[300px] md:min-h-[350px] p-3 sm:p-5 md:p-8 relative overflow-y-auto">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary-500/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary-400/70" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white">Our Mission</h3>
                  <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-3"></div>
                  <p className="text-dark-100 mb-3 text-xs md:text-sm leading-relaxed">
                    We are a thriving community of lifelong learners offering a platform for students to explore AI
                    through workshops, tutorials, and hands-on projects.
                  </p>
                  <p className="text-dark-200 mb-4 text-xs md:text-sm leading-relaxed">
                    Our goal is to make AI education accessible to all ASU students, regardless of background or major.
                  </p>
                  <div className="mt-auto flex flex-col sm:flex-row gap-3 md:gap-4 flex-wrap">
                    {/* Direct link without any wrappers to ensure clickability */}
                    <a
                      href="https://asu.campuslabs.com/engage/organization/the-ai-society"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:max-w-[180px] bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-4 py-2 flex items-center justify-center group"
                      style={{
                        position: "relative",
                        zIndex: 9999,
                        isolation: "isolate",
                      }}
                    >
                      <Zap className="mr-1 h-3 w-3 flex-shrink-0" />
                      <span className="whitespace-nowrap text-xs">Join Community</span>
                      <ChevronRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                    </a>
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
            className="md:col-span-4 h-full w-full"
          >
            <ThreeDCard
              depth={10} // Reduced depth
              rotationIntensity={3} // Reduced rotation intensity
              glareIntensity={0.15}
              hoverScale={1.02}
              backgroundGradient="linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(109, 40, 217, 0.05))"
              className="h-full w-full"
            >
              <Card variant="glass" className="h-full w-full">
                <div className="p-3 sm:p-5 md:p-8 flex flex-col min-h-[250px] sm:min-h-[300px] md:min-h-[350px] relative overflow-y-auto">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-secondary-500/20 to-transparent"></div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-400/70" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">By The Numbers</h3>
                  <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full mb-4"></div>

                  <div className="space-y-6 sm:space-y-8 mt-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-primary-900/50 flex items-center justify-center">
                        <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-lg sm:text-xl font-bold text-white">350+</p>
                        <p className="text-dark-300 text-xs">General Members</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-secondary-900/50 flex items-center justify-center">
                        <Zap className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-secondary-400" />
                      </div>
                      <div>
                        <p className="text-lg sm:text-xl font-bold text-white">30+</p>
                        <p className="text-dark-300 text-xs">Events Per Year</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </ThreeDCard>
          </motion.div>

          {/* Membership Cards Row - Adjust grid for mobile */}
          <div
            ref={membershipCardsRef}
            className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full"
          >
            {/* Officer Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-full w-full"
            >
              <ThreeDCard
                depth={10} // Reduced depth
                rotationIntensity={3} // Reduced rotation
                glareIntensity={0.15}
                hoverScale={1.02}
                backgroundGradient="linear-gradient(to bottom right, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.05))"
                className="h-full w-full"
              >
                <Card variant="glass" className="h-full w-full">
                  <div className="p-3 sm:p-5 md:p-8 flex flex-col min-h-[250px] sm:min-h-[300px] md:min-h-[350px] relative overflow-y-auto">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 pointer-events-none">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary-500/20 to-transparent"></div>
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary-400/70" />
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">Officer</h3>

                    <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary-500 to-dark-500 rounded-full mb-4"></div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-primary-300 font-medium mb-1 text-sm">How:</p>
                        <p className="text-dark-100 text-xs leading-relaxed">
                          Apply through our website. Applications are reviewed on a rolling basis.
                        </p>
                      </div>

                      <div>
                        <p className="text-primary-300 font-medium mb-1 text-sm">Why:</p>
                        <p className="text-dark-100 text-xs leading-relaxed">
                          Access to funding, alumni network, and opportunities with partner research labs.
                        </p>
                      </div>
                    </div>

                    {/* Subtle corner decoration - keeping original SVG intact */}
                    <div className="absolute bottom-3 right-3 opacity-20 transition-opacity duration-300 pointer-events-none">
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
              className="h-full w-full"
            >
              <ThreeDCard
                depth={10} // Reduced depth
                rotationIntensity={3} // Reduced rotation
                glareIntensity={0.15}
                hoverScale={1.02}
                backgroundGradient="linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(109, 40, 217, 0.05))"
                className="h-full w-full"
              >
                <Card variant="glass" className="h-full w-full">
                  <div className="p-3 sm:p-5 md:p-8 flex flex-col min-h-[250px] sm:min-h-[300px] md:min-h-[350px] relative overflow-y-auto">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 pointer-events-none">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-secondary-500/20 to-transparent"></div>
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <Users className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-400/70" />
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">General Member</h3>

                    <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-secondary-500 to-dark-500 rounded-full mb-4"></div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-secondary-300 font-medium mb-1 text-sm">How:</p>
                        <p className="text-dark-100 text-xs leading-relaxed">
                          Join through Sun Devil Central and our Discord. Links available at the bottom of the page.
                        </p>
                      </div>

                      <div>
                        <p className="text-secondary-300 font-medium mb-1 text-sm">Why:</p>
                        <p className="text-dark-100 text-xs leading-relaxed">
                          Access to workshops, events, and resume book placement with consistent participation.
                        </p>
                      </div>
                    </div>

                    {/* Subtle corner decoration - keeping original SVG intact */}
                    <div className="absolute bottom-3 right-3 opacity-20 transition-opacity duration-300 pointer-events-none">
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
              className="h-full w-full"
            >
              <ThreeDCard
                depth={10} // Reduced depth
                rotationIntensity={3} // Reduced rotation
                glareIntensity={0.15}
                hoverScale={1.02}
                backgroundGradient="linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.05))"
                className="h-full w-full"
              >
                <Card variant="glass" className="h-full w-full">
                  <div className="p-3 sm:p-5 md:p-8 flex flex-col min-h-[250px] sm:min-h-[300px] md:min-h-[350px] relative overflow-y-auto">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 pointer-events-none">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-accent-500/20 to-transparent"></div>
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-accent-400/70" />
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">Sponsor</h3>

                    <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-accent-500 to-dark-500 rounded-full mb-4"></div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-accent-300 font-medium mb-1 text-sm">How:</p>
                        <p className="text-dark-100 text-xs leading-relaxed">
                          Partner with us by contacting us via email. Contact information available at the bottom of the
                          page.
                        </p>
                      </div>

                      <div>
                        <p className="text-accent-300 font-medium mb-1 text-sm">Why:</p>
                        <p className="text-dark-100 text-xs leading-relaxed">
                          Visibility in our community, exclusive events access, and our curated AI/ML talent resume
                          book.
                        </p>
                      </div>
                    </div>

                    {/* Subtle corner decoration - keeping original SVG intact */}
                    <div className="absolute bottom-3 right-3 opacity-20 transition-opacity duration-300 pointer-events-none">
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
          <p className="text-primary-400 font-medium text-xs md:text-sm">
            Join us for an engaging, hands-on learning experience and valuable networking opportunities!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
