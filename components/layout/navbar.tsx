"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import type { NavItem } from "@/lib/types"
import { cn } from "@/lib/utils"

interface NavbarProps {
  navItems: NavItem[]
  className?: string
}

export function Navbar({ navItems, className }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to render nav links
  const renderNavLink = (item: NavItem, index: number, isMobile = false) => {
    const isActive =
      pathname === item.link ||
      (pathname.startsWith("/projects") && item.link === "/projects") ||
      (pathname.startsWith("/ml_lab") && item.link === "/projects") ||
      (pathname.startsWith("/nlp_lab") && item.link === "/projects") ||
      (pathname.startsWith("/events") && item.link === "/events")

    const isExternal = item.link.startsWith("http")
    const shouldOpenNewTab = isExternal

    const navLinkClassName = cn(
      isMobile
        ? "px-4 py-3 rounded-md text-lg font-medium transition-colors flex items-center justify-center"
        : "px-4 py-2 rounded-md text-sm font-medium transition-colors relative",
      isActive
        ? isMobile
          ? "bg-dark-800/80 text-white"
          : "text-white"
        : "text-dark-200 hover:text-white hover:bg-dark-800/50",
    )

    const handleClick = isMobile ? () => setIsMobileMenuOpen(false) : undefined

    if (shouldOpenNewTab) {
      return (
        <a
          key={`nav-${isMobile ? "mobile-" : ""}${index}`}
          href={item.link}
          className={navLinkClassName}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          {item.icon && isMobile && <span className="mr-3">{item.icon}</span>}
          <span className="relative z-10">{item.name}</span>
          {isActive && !isMobile && (
            <motion.span
              layoutId="navbar-active-indicator"
              className="absolute inset-0 rounded-md bg-dark-800/80 -z-0"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
        </a>
      )
    }

    return (
      <Link
        key={`nav-${isMobile ? "mobile-" : ""}${index}`}
        href={item.link}
        className={navLinkClassName}
        onClick={handleClick}
      >
        {item.icon && isMobile && <span className="mr-3">{item.icon}</span>}
        <span className="relative z-10">{item.name}</span>
        {isActive && !isMobile && (
          <motion.span
            layoutId="navbar-active-indicator"
            className="absolute inset-0 rounded-md bg-dark-800/80 -z-0"
            transition={{ duration: 0.5 }}
          />
        )}
      </Link>
    )
  }

  const mobileDiscordLinkClasses = "w-full flex items-center justify-center py-3"

  // Estimate width based on typical "Discord" text length next to an icon.
  // The image provided is 160x36. So aspect ratio is 160/36 = 4.44
  // If height is 25px, width = 25 * 4.44 = ~111px. Let's use 110px.
  const desktopDiscordLogoWidth = 85
  const desktopDiscordLogoHeight = 19

  // If height is 25px for mobile, width = 25 * 4.44 = ~111px. Let's use 110px.
  const mobileDiscordLogoWidth = 110
  const mobileDiscordLogoHeight = 25

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-3",
          isScrolled ? "bg-dark-950/80 backdrop-blur-md" : "",
          className,
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image src="/logo.png" alt="The AI Society Logo" width={40} height={40} className="object-contain" />
              </div>
              <span className="font-heading font-bold text-xl text-white">The AI Society</span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item, index) => renderNavLink(item, index))}
              <a
                href="https://discord.gg/dCWm6xBGtM"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join Discord"
                className="flex items-center justify-center h-8 px-1 rounded-md hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950"
              >
                <Image
                  src="/discord-new-logo.png"
                  alt="Discord"
                  width={desktopDiscordLogoWidth}
                  height={desktopDiscordLogoHeight}
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>
            </nav>

            <button
              className="md:hidden p-2 rounded-md text-dark-200 hover:text-white hover:bg-dark-800/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-20 bg-dark-950/95 backdrop-blur-md md:hidden"
          >
            <nav className="container mx-auto px-4 py-8 flex flex-col gap-3 items-center text-center">
              {navItems.map((item, index) => renderNavLink(item, index, true))}
              <a
                href="https://discord.gg/dCWm6xBGtM"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-md text-lg font-medium transition-colors flex items-center justify-center text-dark-200 hover:text-white hover:bg-dark-800/50 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 -mt-3"
                aria-label="Join Discord"
              >
                <Image
                  src="/discord-new-logo.png"
                  alt="Discord"
                  width={mobileDiscordLogoWidth}
                  height={mobileDiscordLogoHeight}
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
