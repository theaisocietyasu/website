"use client"
import { IconHome, IconUsers, IconCalendar } from "@tabler/icons-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { AboutMembershipSection } from "@/components/home/about-membership-section-fixed"
import { ProgramsSection } from "@/components/home/programs-section"
import { TeamSection } from "@/components/home/team-section"
import { ContactSection } from "@/components/home/contact-section"
import LightPillar from "@/components/ui/LightPillar"
import type { NavItem } from "@/lib/types"

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
    link: "/events",
    icon: <IconCalendar className="h-6 w-6" />,
  },
  {
    name: "SDC",
    link: "https://sundevilcentral.eoss.asu.edu/AIS/club_signup",
    icon: <IconCalendar className="h-6 w-6" />,
  },
]

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative">
      {/* LightPillar Background */}
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -10 }}>
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1.0}
          rotationSpeed={0.3}
          glowAmount={0.001}
          pillarWidth={3.0}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={159}
          interactive={false}
          mixBlendMode="normal"
        />
      </div>

      {/* Navigation */}
      <Navbar navItems={navItems} />

      {/* Hero Section */}
      <HeroSection />

      {/* About & Membership Section (Combined) */}
      <AboutMembershipSection />

      {/* Programs Section */}
      <ProgramsSection />

      {/* Team Section */}
      <TeamSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
