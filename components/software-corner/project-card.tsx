"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { SoftwareProject } from "@/lib/types"
import { cn } from "@/lib/utils"

interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
}

interface ProjectCardProps {
  project: SoftwareProject
  onEdit?: () => void
  onDelete?: () => void
  isAdmin?: boolean
}

export function ProjectCard({
  project,
  onEdit,
  onDelete,
  isAdmin = false,
}: ProjectCardProps) {
  const [collaboratorAvatars, setCollaboratorAvatars] = useState<
    GitHubUser[]
  >([])
  const [avatarsLoaded, setAvatarsLoaded] = useState(false)

  // Fetch GitHub avatars on mount
  useState(() => {
    if (project.collaborators.length > 0 && !avatarsLoaded) {
      Promise.all(
        project.collaborators.map((username) =>
          fetch(`https://api.github.com/users/${username}`)
            .then((res) => (res.ok ? res.json() : null))
            .catch(() => null)
        )
      ).then((users) => {
        setCollaboratorAvatars(users.filter(Boolean))
        setAvatarsLoaded(true)
      })
    }
  })

  const thumbnailUrl = project.thumbnail_file_id
    ? `/api/projects/${project.thumbnail_file_id}/thumbnail`
    : "/placeholder-project.png"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10",
        !project.published && isAdmin && "opacity-60"
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-dark-800">
        <Image
          src={thumbnailUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
        {!project.published && isAdmin && (
          <div className="absolute right-2 top-2 rounded-md bg-yellow-500/90 px-2 py-1 text-xs font-semibold text-dark-950">
            Draft
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 font-space-grotesk text-lg font-bold text-white">
          {project.title}
        </h3>
        <p className="mb-4 line-clamp-3 flex-1 text-sm text-dark-100">
          {project.description}
        </p>

        {/* Collaborators */}
        {collaboratorAvatars.length > 0 && (
          <div className="mb-4 flex items-center gap-2">
            <div className="flex -space-x-2">
              {collaboratorAvatars.slice(0, 5).map((user) => (
                <a
                  key={user.login}
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-dark-900 transition-transform hover:z-10 hover:scale-110"
                  title={user.login}
                >
                  <Image
                    src={user.avatar_url}
                    alt={user.login}
                    fill
                    className="object-cover"
                  />
                </a>
              ))}
            </div>
            {collaboratorAvatars.length > 5 && (
              <span className="text-xs text-dark-200">
                +{collaboratorAvatars.length - 5} more
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-2">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-dark-700/50 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-dark-600"
            >
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-primary-600/50 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-600"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </a>
          )}
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="mt-4 flex gap-2 border-t border-white/10 pt-4">
            <button
              onClick={onEdit}
              className="flex-1 rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
