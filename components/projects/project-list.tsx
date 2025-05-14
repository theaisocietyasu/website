"use client"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import type { AIProject } from "@/lib/types"

interface ProjectListProps {
  projects: AIProject[]
  selectedProject: AIProject
  setSelectedProject: (project: AIProject) => void
}

export function ProjectList({ projects, selectedProject, setSelectedProject }: ProjectListProps) {
  return (
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
              onClick={() => setSelectedProject(project)}
            >
              <h4 className="font-medium">{project.title}</h4>
              <p className="text-xs text-dark-300 mt-1">{project.team}</p>
            </button>
          </AnimatedGradientBorder>
        ))}
      </div>
    </div>
  )
}
