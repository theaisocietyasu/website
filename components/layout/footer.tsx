"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Instagram, Linkedin, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto py-8 px-4 md:px-6 bg-dark-950/90 backdrop-blur-md border-t border-dark-800/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Image src="/logo.png" alt="The AI Society Logo" width={32} height={32} className="object-contain" />
              </div>
              <span className="font-heading font-bold text-lg text-white">The AI Society</span>
            </Link>
            <p className="text-dark-300 text-sm mb-4 max-w-md">
              Arizona State University's premier AI club dedicated to nurturing knowledge and driving innovation in the
              field of Artificial Intelligence.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.instagram.com/theaisociety.asu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-white transition-colors"
                aria-label="Instagram"
                whileHover={{ y: -3 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/theaisociety-asu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
                whileHover={{ y: -3 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://github.com/theaisocietyasu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-white transition-colors"
                aria-label="GitHub"
                whileHover={{ y: -3 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://asu.campuslabs.com/engage/organization/the-ai-society"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-white transition-colors"
                aria-label="Sun Devil Sync"
                whileHover={{ y: -3 }}
              >
                <ExternalLink size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-dark-300 hover:text-white transition-colors text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <a
                  href="https://asu.campuslabs.com/engage/organization/the-ai-society/events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors text-sm"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/dCWm6xBGtM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors text-sm"
                >
                  Join Discord
                </a>
              </li>
              <li>
                <a
                  href="https://asu.campuslabs.com/engage/organization/the-ai-society"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors text-sm"
                >
                  Sun Devil Central
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-dark-300 text-sm">
                <a
                  href="mailto:theaisociety.asu@gmail.com"
                  className="text-dark-300 hover:text-white transition-colors"
                >
                  theaisociety.asu@gmail.com
                </a>
              </li>
              <li className="text-dark-300 text-sm">
                <a
                  href="https://asu.campuslabs.com/engage/organization/the-ai-society"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors"
                >
                  Sun Devil Central
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-800/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-dark-400 text-sm">© {currentYear} The AI Society at ASU. All rights reserved.</p>
            <p className="text-dark-500 text-xs mt-2 md:mt-0">Built with ❤️ by The AI Society team</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
