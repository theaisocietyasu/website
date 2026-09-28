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

  // Get up to 5 collaborators to display
  const displayedCollaborators = collaboratorAvatars.slice(0, 5)
  const remainingCount = Math.max(0, collaboratorAvatars.length - 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative flex flex-col h-[500px] overflow-hidden rounded-2xl bg-dark-900/60 backdrop-blur-md border border-dark-800/60 shadow-card transition-all duration-500 hover:border-primary-500/40 hover:shadow-xl hover:shadow-primary-500/10",
        !project.published && isAdmin && "opacity-60"
      )}
    >
      {/* Thumbnail */}
      <div className="relative h-[220px] w-full flex-shrink-0 overflow-hidden bg-dark-900">
        <Image
          src={thumbnailUrl}
          alt={project.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/10 to-dark-950/90" />

        {/* Admin Actions - Top Left */}
        {isAdmin && (
          <div className="absolute left-3 top-3 flex gap-1.5 z-10">
            <motion.button
              onClick={onEdit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-primary-600 hover:bg-primary-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-colors"
            >
              Edit
            </motion.button>
            <motion.button
              onClick={onDelete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-red-600/90 hover:bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-colors"
            >
              Delete
            </motion.button>
          </div>
        )}

        {!project.published && isAdmin && (
          <div className="absolute right-3 top-3 rounded-full bg-yellow-500 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-dark-950 shadow-lg">
            Draft
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 text-center overflow-hidden">
        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-white leading-snug line-clamp-2 min-h-[2.6rem]">
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="mt-1.5 text-dark-300 text-sm leading-relaxed min-h-[2.8rem] overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
          }}
        >
          {project.description}
        </p>

        {/* Collaborator Avatars */}
        <div className="flex items-center justify-center gap-1.5 py-3">
          {displayedCollaborators.map((collaborator) => (
            <motion.a
              key={collaborator.login}
              href={collaborator.html_url}
              target={collaborator.html_url ? "_blank" : undefined}
              rel={collaborator.html_url ? "noopener noreferrer" : undefined}
              className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-primary-500/40 transition-all hover:ring-primary-400/70"
              title={collaborator.login}
              whileHover={{ scale: 1.12 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image
                src={collaborator.avatar_url}
                alt={collaborator.login}
                fill
                className="object-cover"
              />
            </motion.a>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs font-semibold text-dark-400 ml-0.5">+{remainingCount}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-auto pt-1">
          <motion.a
            href={project.github_url ?? undefined}
            target={project.github_url ? "_blank" : undefined}
            rel={project.github_url ? "noopener noreferrer" : undefined}
            whileHover={project.github_url ? { scale: 1.02 } : {}}
            whileTap={project.github_url ? { scale: 0.98 } : {}}
            onClick={!project.github_url ? (e) => e.preventDefault() : undefined}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold border transition-all duration-300",
              project.github_url
                ? "bg-dark-800/70 text-dark-100 border-dark-700/60 hover:bg-dark-700/80 hover:border-dark-600 hover:text-white cursor-pointer"
                : "bg-dark-900/40 text-dark-600 border-dark-800/40 cursor-not-allowed"
            )}
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </motion.a>

          <motion.a
            href={project.live_url ?? undefined}
            target={project.live_url ? "_blank" : undefined}
            rel={project.live_url ? "noopener noreferrer" : undefined}
            whileHover={project.live_url ? { scale: 1.02 } : {}}
            whileTap={project.live_url ? { scale: 0.98 } : {}}
            onClick={!project.live_url ? (e) => e.preventDefault() : undefined}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300",
              project.live_url
                ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-lg hover:shadow-primary-500/25 cursor-pointer"
                : "bg-dark-800/40 text-dark-600 cursor-not-allowed"
            )}
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Live Demo</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
