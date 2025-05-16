"use client"

import { useState, useEffect } from "react"
import { IconHome, IconUsers, IconCalendar } from "@tabler/icons-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { AboutMembershipSection } from "@/components/home/about-membership-section-fixed"
import { TeamSection } from "@/components/home/team-section"
import { ContactSection } from "@/components/home/contact-section"
import { ConfettiEffect } from "@/components/ui/confetti-effect"
import type { NavItem } from "@/lib/types"
import { FloatingNotification } from "@/components/ui/floating-notification"

// Define navigation items
const navItems: NavItem[] = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-6 w-6" />,
  },
  {
    name: "Projects",
    link: "/projects",
    icon: <IconUsers className="h-6 w-6" />,
  },
  {
    name: "Events",
    link: "https://asu.campuslabs.com/engage/organization/the-ai-society/events",
    icon: <IconCalendar className="h-6 w-6" />,
  },
]

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Delay confetti slightly to ensure page is loaded
    const timer = setTimeout(() => {
      setShowConfetti(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="flex flex-col min-h-screen">
      {/* Confetti Effect */}
      {showConfetti && <ConfettiEffect duration={6000} numberOfPieces={150} />}

      {/* Navigation */}
      <Navbar navItems={navItems} />

      {/* Hero Section */}
      <HeroSection />

      {/* About & Membership Section (Combined) */}
      <div className="relative z-10 mt-[-8px]">
        <AboutMembershipSection />
      </div>

      {/* Team Section */}
      <TeamSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating Notification */}
      <FloatingNotification
        message="Fall 2025 officer applications open!"
        linkText="Apply here"
        linkUrl="https://theaisociety.notion.site/1f28867868b481d2ad43e36d5049982b?pvs=105"
      />
    </main>
  )
}
