"use client"
import { IconHome, IconUsers, IconCalendar } from "@tabler/icons-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { AboutMembershipSection } from "@/components/home/about-membership-section-fixed"
import dynamic from "next/dynamic"

const LightPillar = dynamic(() => import("@/components/ui/LightPillar"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-b from-[#5227FF]/20 to-[#FF9FFC]/20" />
})

// Lazy load below-fold sections to reduce initial bundle size
const ProgramsSection = dynamic(() => import("@/components/home/programs-section").then(m => ({ default: m.ProgramsSection })), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />
})

const TeamSection = dynamic(() => import("@/components/home/team-section").then(m => ({ default: m.TeamSection })), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />
})

const ContactSection = dynamic(() => import("@/components/home/contact-section").then(m => ({ default: m.ContactSection })), {
  ssr: true,
  loading: () => <div className="min-h-[300px]" />
})
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
