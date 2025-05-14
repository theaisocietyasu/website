"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import type { NavItem } from "@/lib/types"
import { cn } from "@/lib/utils"

interface NavbarProps {
  navItems: NavItem[]
  className?: string
}

export function Navbar({ navItems, className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "py-3 bg-dark-950/80 backdrop-blur-md border-b border-dark-800/50" : "py-5",
          className,
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image src="/logo.png" alt="The AI Society Logo" width={40} height={40} className="object-contain" />
              </div>
              <span className="font-heading font-bold text-xl text-white">The AI Society</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive =
                  pathname === item.link ||
                  (pathname.startsWith("/projects") && item.link === "/projects") ||
                  (pathname.startsWith("/ml_lab") && item.link === "/projects") ||
                  (pathname.startsWith("/nlp_lab") && item.link === "/projects")

                return (
                  <Link
                    key={`nav-${index}`}
                    href={item.link}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors relative",
                      isActive ? "text-white" : "text-dark-200 hover:text-white hover:bg-dark-800/50",
                    )}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-indicator"
                        className="absolute inset-0 rounded-md bg-dark-800/80 -z-0"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </Link>
                )
              })}
              <AnimatedGradientBorder borderRadius="0.5rem" borderWidth={1} glowIntensity={0.5}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 bg-dark-900/80 hover:bg-dark-800/80 border-0"
                  onClick={() => window.open("https://discord.gg/dCWm6xBGtM", "_blank")}
                >
                  Join Discord
                </Button>
              </AnimatedGradientBorder>
            </nav>

            {/* Mobile Menu Button */}
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

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-20 bg-dark-950/95 backdrop-blur-md md:hidden"
          >
            <nav className="container mx-auto px-4 py-8 flex flex-col gap-4 items-center text-center">
              {navItems.map((item, index) => {
                const isActive =
                  pathname === item.link ||
                  (pathname.startsWith("/projects") && item.link === "/projects") ||
                  (pathname.startsWith("/ml_lab") && item.link === "/projects") ||
                  (pathname.startsWith("/nlp_lab") && item.link === "/projects")

                return (
                  <Link
                    key={`mobile-nav-${index}`}
                    href={item.link}
                    className={cn(
                      "px-4 py-3 rounded-md text-lg font-medium transition-colors flex items-center justify-center",
                      isActive ? "bg-dark-800/80 text-white" : "text-dark-200 hover:text-white hover:bg-dark-800/50",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    {item.name}
                  </Link>
                )
              })}

              {/* Custom Discord button without AnimatedGradientBorder */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    window.open("https://discord.gg/dCWm6xBGtM", "_blank")
                    setIsMobileMenuOpen(false)
                  }}
                  className="inline-flex items-center justify-center px-6 py-2 rounded-md text-white bg-dark-900/80 hover:bg-dark-800/80 border border-purple-500/50 transition-colors"
                >
                  Join Discord
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
