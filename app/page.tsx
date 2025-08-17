"use client"
import { IconHome, IconUsers, IconCalendar } from "@tabler/icons-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { AboutMembershipSection } from "@/components/home/about-membership-section-fixed"
import { ProgramsSection } from "@/components/home/programs-section"
import { TeamSection } from "@/components/home/team-section"
import { ContactSection } from "@/components/home/contact-section"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
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
    name: "SDC",
    link: "https://asu.campuslabs.com/engage/organization/the-ai-society/events",
    icon: <IconCalendar className="h-6 w-6" />,
  },
]

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative">
      {/* Background Gradient Animation - ONLY background effect */}
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(9, 9, 11)"
        gradientBackgroundEnd="rgb(30, 27, 75)"
        firstColor="99, 102, 241"
        secondColor="139, 92, 246"
        thirdColor="236, 72, 153"
        fourthColor="79, 70, 229"
        fifthColor="124, 58, 237"
        pointerColor="99, 102, 241"
        size="80%"
        blendingValue="multiply"
        containerClassName="fixed inset-0 -z-10"
        interactive={true}
      />

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
