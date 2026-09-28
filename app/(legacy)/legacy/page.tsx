"use client"
import { Navbar } from "@/components/legacy/layout/navbar"
import { NAV_ITEMS } from "@/lib/navigation"
import { Footer } from "@/components/legacy/layout/footer"
import { HeroSection } from "@/components/legacy/home/hero-section"
import { AboutMembershipSection } from "@/components/legacy/home/about-membership-section-fixed"
import dynamic from "next/dynamic"

const LightPillar = dynamic(() => import("@/components/legacy/ui/LightPillar"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-b from-[#5227FF]/20 to-[#FF9FFC]/20" />
})

// Lazy load below-fold sections to reduce initial bundle size
const ProgramsSection = dynamic(() => import("@/components/legacy/home/programs-section").then(m => ({ default: m.ProgramsSection })), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />
})

const TeamSection = dynamic(() => import("@/components/legacy/home/team-section").then(m => ({ default: m.TeamSection })), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />
})

const ContactSection = dynamic(() => import("@/components/legacy/home/contact-section").then(m => ({ default: m.ContactSection })), {
  ssr: true,
  loading: () => <div className="min-h-[300px]" />
})

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
      <Navbar navItems={NAV_ITEMS} />

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
