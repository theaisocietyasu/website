"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThreeDCard } from "@/components/ui/3d-card"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import type { AIProject } from "@/lib/types"

interface ProjectSlideshowProps {
  projects: AIProject[]
  selectedProject: AIProject
  setSelectedProject: (project: AIProject) => void
}

export function ProjectSlideshow({ projects, selectedProject, setSelectedProject }: ProjectSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToNextSlide = () => {
    const nextIndex = (currentSlide + 1) % selectedProject.slides.length
    setCurrentSlide(nextIndex)
    setDirection(1)
  }

  const goToPrevSlide = () => {
    const prevIndex = currentSlide === 0 ? selectedProject.slides.length - 1 : currentSlide - 1
    setCurrentSlide(prevIndex)
    setDirection(-1)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Project Selection Sidebar */}
      <div className="lg:w-1/4 space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Projects</h3>
        <div className="space-y-3">
          {projects.map((project) => (
            <AnimatedGradientBorder
              key={project.id}
              borderRadius="0.5rem"
              borderWidth={1}
              glowIntensity={selectedProject.id === project.id ? 0.5 : 0.1}
              hoverEffect={true}
            >
              <button
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  selectedProject.id === project.id
                    ? "bg-dark-800/80 text-white"
                    : "bg-dark-900/50 text-dark-200 hover:text-white"
                }`}
                onClick={() => {
                  setSelectedProject(project)
                  setCurrentSlide(0)
                }}
              >
                <h4 className="font-medium">{project.title}</h4>
                <p className="text-xs text-dark-300 mt-1">{project.team}</p>
              </button>
            </AnimatedGradientBorder>
          ))}
        </div>
      </div>

      {/* Slideshow */}
      <div className="lg:w-3/4">
        <ThreeDCard
          depth={15}
          rotationIntensity={5}
          glareIntensity={0.15}
          hoverScale={1.01}
          backgroundGradient="linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.05))"
        >
          <Card variant="glass" className="border-0 bg-transparent backdrop-blur-none p-0 overflow-hidden">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={selectedProject.slides[currentSlide] || "/placeholder.svg"}
                    alt={`${selectedProject.title} slide ${currentSlide + 1}`}
                    className="w-full h-full object-contain bg-dark-950/80"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-dark-900/80 hover:bg-dark-800/80 border-dark-700"
                  onClick={goToPrevSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-xs text-dark-200">
                  {currentSlide + 1} / {selectedProject.slides.length}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-dark-900/80 hover:bg-dark-800/80 border-dark-700"
                  onClick={goToNextSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
              <p className="text-dark-200 text-sm mb-4">By {selectedProject.team}</p>
              <p className="text-dark-100">{selectedProject.description}</p>
            </div>
          </Card>
        </ThreeDCard>
      </div>
    </div>
  )
}
