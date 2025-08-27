"use client"

import { useRef } from "react"
import Image from "next/image"
import { Instagram, Linkedin, Github, ExternalLink, Youtube } from "lucide-react"

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
      href: "https://www.youtube.com/@TheAISocietyASU/",
      label: "YouTube",
      icon: <Youtube size={30} style={{ color: "#FF0000" }} />,
    },
    {
      href: "https://sundevilcentral.eoss.asu.edu/AIS/club_signup",
      label: "Sun Devil Central",
      icon: <ExternalLink size={30} style={{ color: "#FFC627" }} />,
    },
  ]

  return (
    <section ref={containerRef} className="hero-bg min-h-screen flex items-center justify-center pt-24 pb-20 relative">
      <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col items-center justify-center text-center lg:flex-row lg:text-left lg:items-center lg:justify-between lg:gap-8">
          {/* Text Content - Show second on mobile and medium screens, first on large screens */}
          <div className="w-full max-w-xl mx-auto lg:mx-0 lg:w-1/2 lg:order-1 order-2 flex flex-col items-center lg:items-center lg:text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-dark-800/50 border border-dark-700 text-dark-100 text-sm mb-4 sm:mb-6">
              Arizona State University's Premier AI Club
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight text-white">
              THE AI SOCIETY
            </h1>

            <p className="text-dark-100 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-xl text-center">
              Join us in leading the 6th Tech Revolution. We're a community of passionate AI enthusiasts dedicated to
              nurturing knowledge and driving innovation.
            </p>

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center relative z-20">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group hover:-translate-y-1 hover:scale-110 transition-transform duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Image - Show first on mobile and medium screens, second on large screens */}
          <div className="w-full flex items-center justify-center lg:w-1/2 lg:order-2 order-1 mb-8 lg:mb-0 lg:justify-end lg:-mr-4 xl:-mr-8 lg:pl-8 xl:pl-10">
            <div className="w-full h-full flex items-center justify-center lg:justify-end lg:pr-0">
              <div className="relative flex items-center justify-center mx-auto lg:mx-0 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px] lg:ml-12">
                <div className="relative p-4 sm:p-6 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="The AI Society Logo"
                    width={400}
                    height={400}
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background circles with proper positioning and no abrupt cuts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="circle-1 absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full bg-primary-500/10 blur-[40px] top-[10%] left-[5%] animate-float"></div>
        <div className="circle-2 absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-secondary-500/10 blur-[40px] top-[40%] right-[5%] animate-float-reverse"></div>
      </div>
    </section>
  )
}
