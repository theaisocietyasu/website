"use client"

import { motion } from "framer-motion"
import { Github, Instagram, Linkedin, ExternalLink } from "lucide-react"
import { ThreeDCard } from "@/components/ui/3d-card"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import type { Workshop } from "@/lib/types"

interface WorkshopContentProps {
  workshop: Workshop
}

export function WorkshopContent({ workshop }: WorkshopContentProps) {
  return (
    <div className="workshop-content w-full lg:w-3/4 p-4 md:p-8 bg-dark-950">
      {/* Social Media Icons */}
      <div className="flex justify-end space-x-4 mb-8">
        <motion.a
          href="https://www.instagram.com/theaisociety.asu/"
          className="social-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          whileHover={{ y: -3 }}
        >
          <Instagram size={20} className="text-dark-300 hover:text-white transition-colors" />
        </motion.a>
        <motion.a
          href="https://asu.campuslabs.com/engage/organization/the-ai-society"
          className="social-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Sun Devil Sync"
          whileHover={{ y: -3 }}
        >
          <ExternalLink size={20} className="text-dark-300 hover:text-white transition-colors" />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/company/theaisociety-asu/"
          className="social-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          whileHover={{ y: -3 }}
        >
          <Linkedin size={20} className="text-dark-300 hover:text-white transition-colors" />
        </motion.a>
        <motion.a
          href="https://github.com/theaisocietyasu"
          className="social-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          whileHover={{ y: -3 }}
        >
          <Github size={20} className="text-dark-300 hover:text-white transition-colors" />
        </motion.a>
      </div>

      {/* Workshop Title */}
      <motion.h1
        key={workshop.id + "-title"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-white"
      >
        {workshop.title}
      </motion.h1>

      {/* YouTube Video */}
      <motion.div
        key={workshop.id + "-video"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="workshop-video mb-8"
      >
        <AnimatedGradientBorder borderRadius="1rem" borderWidth={1.5} glowIntensity={0.3}>
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

      {/* Files Section */}
      <motion.div
        key={workshop.id + "-resources"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="workshop-resources"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Resources</h2>
        <div className="flex flex-wrap gap-2">
          {workshop.files.map((file, index) => (
            <ThreeDCard key={index} depth={5} rotationIntensity={5} glareIntensity={0.1} hoverScale={1.05}>
              <a
                href={file.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 bg-dark-900/80 backdrop-blur-sm border border-dark-800/50 rounded-lg text-primary-300 hover:text-white transition-colors"
              >
                {file.name}
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
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Description</h2>
        <div className="text-dark-100 prose prose-invert max-w-none p-6 bg-dark-900/30 backdrop-blur-sm border border-dark-800/50 rounded-xl">
          {workshop.procedures}
        </div>
      </motion.div>
    </div>
  )
}
