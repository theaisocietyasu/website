"use client"

import { useRef } from "react"
import Image from "next/image"
import { Instagram, Linkedin, Github, ExternalLink, Youtube, FileText } from "lucide-react"

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
    <section
      ref={containerRef}
      className="hero-bg min-h-screen flex items-center justify-center pt-24 pb-20"
    >
      
      <div className="w-full max-w-[1400px] px-8 sm:px-12 md:px-16 lg:px-24">
      


        <div className="flex flex-col items-center text-center">
          <div className="max-w-xl flex flex-col items-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-dark-800/50 border border-dark-700 text-dark-100 text-sm mb-6">
              Arizona State University's Premier AI Club
            </div>
  
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white">
              THE AI SOCIETY
            </h1>
  
            <p className="text-dark-100 text-base sm:text-lg md:text-xl mb-10 max-w-xl">
              Join us in leading the 6th Tech Revolution.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center">
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

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="relative group">
                <a
                  href="https://theaisociety.notion.site/2858867868b480d9bd10e92d9f56fd6f?pvs=105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Resume
                </a>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-dark-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-[280px] text-center z-50 shadow-lg border border-dark-700">
                  Submit your resume to be considered by our partners for opportunities
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dark-800"></div>
                </div>
              </div>
              <div className="relative group">
                <a
                  href="https://docs.google.com/forms/d/1Qt3cjem9FvS_nFlnGlLP4aIYVDNAAlM2qK4udKxHa3E/viewform?edit_requested=true#responses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-secondary-600 hover:bg-secondary-700 text-white font-medium transition-colors"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Apply
                </a>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-dark-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-[280px] text-center z-50 shadow-lg border border-dark-700">
                  Apply to become an officer and join our leadership team
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dark-800"></div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
