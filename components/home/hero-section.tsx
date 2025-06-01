"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram, Linkedin, Github, ExternalLink } from "lucide-react" // Removed MessageCircle

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const socialLinks = [
    {
      href: "https://www.instagram.com/theaisociety.asu/",
      label: "Instagram",
      icon: <Instagram size={30} style={{ color: "#E1306C" }} />,
    },
    {
      href: "https://www.linkedin.com/company/theaisociety-asu/",
      label: "LinkedIn",
      icon: <Linkedin size={30} style={{ color: "#0A66C2" }} />,
    },
    {
      href: "https://github.com/theaisocietyasu",
      label: "GitHub",
      icon: <Github size={30} style={{ color: "#FFFFFF" }} />,
    },
    {
      href: "https://asu.campuslabs.com/engage/organization/the-ai-society",
      label: "Sun Devil Central",
      icon: <ExternalLink size={30} style={{ color: "#FFC627" }} />,
    },
    {
      href: "https://discord.gg/dCWm6xBGtM",
      label: "Discord",
      icon: (
        <div
          className="w-[30px] h-[30px] rounded-md flex items-center justify-center p-1"
          style={{ backgroundColor: "#5865F2" }} // Discord Blurple
        >
          <Image
            src="/discord-logo.png" // Assuming this is the white logo silhouette
            alt="Discord"
            width={22} // Adjust size to fit well within the 30x30 container
            height={22}
            // If discord-logo.png is dark, uncomment the filter to make it white
            // style={{ filter: "invert(1) brightness(2)" }}
          />
        </div>
      ),
    },
  ]

  return (
    <section
      ref={containerRef}
      className="hero-bg hero-about-transition min-h-screen flex items-center justify-center pt-24 pb-16 relative"
    >
      <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col items-center justify-center text-center lg:flex-row lg:text-left lg:justify-between">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl mx-auto lg:mx-0 lg:w-5/12 mb-12 lg:mb-0 flex flex-col items-center lg:items-start"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-dark-800/50 border border-dark-700 text-dark-100 text-sm mb-4 sm:mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
              Arizona State University's Premier AI Club
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight text-white">
              THE AI SOCIETY
            </h1>

            <p className="text-dark-100 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-xl">
              Join us in leading the 6th Tech Revolution. We're a community of passionate AI enthusiasts dedicated to
              nurturing knowledge and driving innovation.
            </p>

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center lg:justify-start relative z-20">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group"
                  whileHover={{ y: -3, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full flex items-center justify-center lg:w-5/12 lg:justify-end lg:pr-4"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative flex items-center justify-center mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px]">
                <div className="relative p-4 sm:p-6 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="The AI Society Logo"
                    width={400}
                    height={400}
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain animate-float"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background circles with proper positioning and no abrupt cuts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="circle-1 absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full bg-primary-500/10 blur-[40px] top-[10%] left-[5%] animate-float"></div>
        <div className="circle-2 absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-secondary-500/10 blur-[40px] top-[40%] right-[5%] animate-float-reverse"></div>
      </div>

      {/* Smooth gradient transition instead of a hard cut */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent pointer-events-none"></div>
    </section>
  )
}
