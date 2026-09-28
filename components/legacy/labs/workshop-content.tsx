"use client"

import { motion } from "framer-motion"
import {
  Github,
  Instagram,
  Linkedin,
  ExternalLink,
  FileText,
  FileJson,
  FileSpreadsheet,
  FileArchive,
  TableIcon,
  Code2,
} from "lucide-react"
import { ThreeDCard } from "@/components/legacy/ui/3d-card"
import { AnimatedGradientBorder } from "@/components/legacy/ui/animated-gradient-border"
import type { Workshop } from "@/lib/types"
import { cn } from "@/lib/utils"

interface WorkshopContentProps {
  workshop: Workshop
}

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase()
  if (extension === "pdf") return <FileText className="mr-2 h-5 w-5 text-red-400" />
  if (extension === "ipynb") return <FileJson className="mr-2 h-5 w-5 text-yellow-400" />
  if (extension === "xlsx") return <FileSpreadsheet className="mr-2 h-5 w-5 text-green-400" />
  if (extension === "zip") return <FileArchive className="mr-2 h-5 w-5 text-purple-400" />
  if (extension === "csv") return <TableIcon className="mr-2 h-5 w-5 text-blue-400" />
  return <Code2 className="mr-2 h-5 w-5 text-gray-400" /> // Default icon
}

export function WorkshopContent({ workshop }: WorkshopContentProps) {
  return (
    <div className="workshop-content-container w-full p-4 md:p-6 bg-dark-900/50 backdrop-blur-lg rounded-xl shadow-2xl border border-dark-800/60">
      {/* Social Media Icons - Optional, can be removed if too cluttered */}
      <div className="flex justify-end space-x-3 mb-6">
        {[
          { href: "https://www.instagram.com/theaisociety.asu/", label: "Instagram", icon: Instagram },
          {
            href: "https://asu.campuslabs.com/engage/organization/the-ai-society",
            label: "Sun Devil Sync",
            icon: ExternalLink,
          },
          { href: "https://www.linkedin.com/company/theaisociety-asu/", label: "LinkedIn", icon: Linkedin },
          { href: "https://github.com/theaisocietyasu", label: "GitHub", icon: Github },
        ].map((social) => (
          <motion.a
            key={social.label}
            href={social.href}
            className="social-icon p-2 rounded-full hover:bg-dark-700/50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            whileHover={{ y: -2, scale: 1.1 }}
          >
            <social.icon size={18} className="text-dark-300 hover:text-white transition-colors" />
          </motion.a>
        ))}
      </div>

      {/* Workshop Title */}
      <motion.h1
        key={workshop.id + "-title"} // Ensure re-animation on change
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white text-center gradient-text"
      >
        {workshop.title}
      </motion.h1>

      {/* YouTube Video */}
      <motion.div
        key={workshop.id + "-video"}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="workshop-video mb-10 md:mb-12"
      >
        <AnimatedGradientBorder borderRadius="1rem" borderWidth={2} glowIntensity={0.4} className="shadow-xl">
          <iframe
            className="w-full aspect-video rounded-xl"
            src={workshop.videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </AnimatedGradientBorder>
      </motion.div>

      {/* Resources Section */}
      <motion.div
        key={workshop.id + "-resources"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="workshop-resources mb-10 md:mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white text-center">Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {workshop.files.map((file, index) => (
            <ThreeDCard
              key={index}
              depth={10}
              rotationIntensity={8}
              glareIntensity={0.15}
              hoverScale={1.03}
              className="w-full h-full"
            >
              <a
                href={file.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center w-full h-full p-4 md:p-5 rounded-lg transition-all duration-300",
                  "bg-dark-800/60 backdrop-blur-md border border-dark-700/50",
                  "hover:bg-dark-700/70 hover:border-primary-500/70 hover:shadow-primary-500/30 hover:shadow-lg",
                )}
              >
                {getFileIcon(file.name)}
                <span className="text-sm md:text-base text-primary-300 group-hover:text-white transition-colors">
                  {file.name}
                </span>
              </a>
            </ThreeDCard>
          ))}
        </div>
      </motion.div>

      {/* Procedures Section */}
      <motion.div
        key={workshop.id + "-description"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white text-center">Procedures & Notes</h2>
        <div className="text-dark-100 prose prose-sm md:prose-base prose-invert max-w-none p-6 md:p-8 bg-dark-800/50 backdrop-blur-md border border-dark-700/50 rounded-xl shadow-lg">
          {workshop.procedures}
        </div>
      </motion.div>
    </div>
  )
}
