"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram, Linkedin, Github, Youtube, MessageSquare } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-dark-900 to-black border-t border-dark-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-width mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-8 md:space-y-0">
          {/* Left section - Logo, description, and social links */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Logo and title */}
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Image src="/logo.png" alt="AI Society Logo" width={32} height={32} className="mr-3" />
              <h3 className="text-xl font-bold text-white">The AI Society</h3>
            </div>

            {/* Description */}
            <p className="text-dark-300 mb-6 max-w-md text-center md:text-left">
              Arizona State University's premier AI club dedicated to nurturing knowledge and driving innovation in the
              field of Artificial Intelligence.
            </p>

            {/* Social media links */}
            <div className="flex justify-center md:justify-start space-x-4 mb-6">
              <Link
                href="https://www.instagram.com/theaisociety.asu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-pink-500 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/theaisocietyasu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-blue-500 transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://github.com/theaisocietyasu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-white transition-colors"
                aria-label="View our GitHub"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://www.youtube.com/@TheAISocietyASU/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-red-500 transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube size={20} />
              </Link>
              <Link
                href="https://discord.gg/dCWm6xBGtM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-indigo-500 transition-colors"
                aria-label="Join our Discord server"
              >
                <MessageSquare size={20} />
              </Link>
            </div>
          </div>

          {/* Right section - Quick Links and Contact */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8 md:gap-12 lg:gap-16">
            {/* Quick Links */}
            <div className="min-w-[120px] text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#hero" className="text-dark-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-dark-300 hover:text-white transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#programs" className="text-dark-300 hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://discord.gg/dCWm6xBGtM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-300 hover:text-white transition-colors"
                  >
                    Join Discord
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="min-w-[200px] text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2">
                <p className="text-dark-300">theaisociety@asu.edu</p>
                <p className="text-dark-300">Sun Devil Central</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-dark-800 mt-8 pt-8 text-center">
          <p className="text-dark-400 text-sm">© 2025 The AI Society at ASU. All rights reserved.</p>
          <p className="text-dark-400 text-sm mt-2">Built with ❤️ by The AI Society team</p>
        </div>
      </div>
    </footer>
  )
}
