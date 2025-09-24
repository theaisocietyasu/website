"use client"

import { useState, useEffect } from "react"
import { IconHome, IconUsers, IconCalendar, IconCalendarPlus } from "@tabler/icons-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { SectionHeading } from "@/components/ui/section-heading"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Button } from "@/components/ui/button"
import type { NavItem } from "@/lib/types"

const navItems: NavItem[] = [
  { name: "Home", link: "/", icon: <IconHome className="h-6 w-6" /> },
  { name: "Projects", link: "/projects", icon: <IconUsers className="h-6 w-6" /> },
  { name: "Events", link: "/events", icon: <IconCalendar className="h-6 w-6" /> },
  {
    name: "SDC",
    link: "https://sundevilcentral.eoss.asu.edu/AIS/club_signup",
    icon: <IconCalendar className="h-6 w-6" />,
  },
]

function NotionEmbed() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const SkeletonLoader = () => (
    <div className="animate-pulse bg-dark-800/50 rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-6 bg-dark-700/50 rounded w-32"></div>
        <div className="h-8 bg-dark-700/50 rounded w-24"></div>
      </div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            <div className="h-4 bg-dark-700/50 rounded w-20"></div>
            <div className="h-4 bg-dark-700/50 rounded flex-1"></div>
            <div className="h-4 bg-dark-700/50 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="relative w-full">
      {isLoading && <SkeletonLoader />}
      <iframe
        src="https://theaisociety.notion.site/ebd/2678867868b4806e8ce0e81e94f95b99?v=2678867868b481f18a38000c715b632d"
        width="100%"
        height="600"
        className={`rounded-xl border border-dark-800/50 transition-opacity duration-500 ${
          isLoading ? "opacity-0 absolute inset-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        title="Events Calendar"
      />
    </div>
  )
}

export default function EventsPage() {
  const particleColors = ["#6366f1", "#8b5cf6", "#ec4899"]

  const handleAddToCalendar = () => {
    const calendarUrl = "https://calendar.google.com/calendar/u/0?cid=Y180ZWZkNGJkNDI4ZGY3MjdjNTY2ZWVmNzk0ZjU4MjEwZGIzNTNhMjk4ZTZjZjY5NzU3OTI2MjgzNjNiNzY2ODdkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
    window.open(calendarUrl, "_blank")
  }

  return (
    <main className="flex flex-col min-h-screen bg-dark-950">
      <Navbar navItems={navItems} />
      
      {/* Header Section */}
      <section className="py-16 md:py-20 lg:py-32 px-6 relative">
        <ParticleBackground
          particleCount={30}
          particleSize={[1, 2]}
          particleSpeed={[0.05, 0.2]}
          particleColor={particleColors}
          particleOpacity={[0.2, 0.5]}
          connectParticles={true}
          connectDistance={150}
          connectWidth={0.5}
          connectOpacity={0.1}
          interactive={true}
          interactiveStrength={0.3}
        />
        <div className="container mx-auto relative z-10">
          <SectionHeading
            title="Events"
            subtitle="Stay up-to-date with The AI Society's workshops, seminars, and networking events. Join us to learn, connect, and grow your AI expertise."
            className="mb-8 md:mb-12"
          />
          
          {/* Call to Action Button */}
          <div className="flex justify-center mb-16 md:mb-20">
            <Button
              onClick={handleAddToCalendar}
              variant="primary"
              size="lg"
              leftIcon={<IconCalendarPlus className="h-5 w-5" />}
              className="bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700"
            >
              Add to Your Calendar
            </Button>
          </div>
        </div>
      </section>
      
      {/* Notion Embed Section */}
      <section className="px-6 pb-16 md:pb-20 lg:pb-32">
        <div className="container mx-auto max-w-7xl">
          <NotionEmbed />
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
