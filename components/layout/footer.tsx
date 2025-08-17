import Image from "next/image"
import { Instagram, Linkedin, Github, ExternalLink, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-dark-900 to-dark-950 border-t border-dark-800/50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center text-center md:text-left gap-8 md:gap-12">
          {/* Left section - Logo, title, description, and social links */}
          <div className="flex-1 space-y-6 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Image src="/logo.png" alt="The AI Society Logo" width={40} height={40} className="rounded-lg" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">The AI Society</h2>
            </div>

            <p className="text-dark-300 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0 text-center md:text-left">
              Arizona State University's premier AI club dedicated to nurturing knowledge and driving innovation in the
              field of Artificial Intelligence.
            </p>

            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="https://www.instagram.com/theaisociety.asu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/theaisocietyasu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/theaisocietyasu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300"
                aria-label="View our projects on GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.youtube.com/@TheAISocietyASU/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube size={24} />
              </a>
              <a
                href="https://discord.gg/dCWm6xBGtM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300"
                aria-label="Join our Discord community"
              >
                <ExternalLink size={24} />
              </a>
            </div>
          </div>

          {/* Right section - Quick Links and Contact */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center md:items-start">
            {/* Quick Links */}
            <div className="min-w-[120px] text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-dark-300 hover:text-primary-400 transition-colors duration-300 text-sm">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/projects"
                    className="text-dark-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#programs"
                    className="text-dark-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/dCWm6xBGtM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    Join Discord
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="min-w-[200px] text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-2">
                <a
                  href="mailto:theaisociety@asu.edu"
                  className="text-dark-300 hover:text-primary-400 transition-colors duration-300 text-sm block"
                >
                  theaisociety@asu.edu
                </a>
                <p className="text-dark-300 text-sm">Sun Devil Central</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-dark-800/50 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-400 text-sm">© 2025 The AI Society at ASU. All rights reserved.</p>
            <p className="text-dark-400 text-sm">Built with ❤️ by The AI Society team</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
