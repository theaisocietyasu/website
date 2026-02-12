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
      whileHover={{ y: -8 }}
      className={cn(
        "group relative flex flex-col h-[520px] overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-indigo-900/40 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-500 hover:border-purple-400/50 hover:shadow-purple-500/30",
        !project.published && isAdmin && "opacity-70"
      )}
    >
      {/* Thumbnail - Large at top */}
      <div className="relative h-[260px] w-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950">
        <Image
          src={thumbnailUrl}
          alt={project.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-purple-950/80" />
        {!project.published && isAdmin && (
          <div className="absolute right-4 top-4 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-dark-950 shadow-lg">
            Draft
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5 space-y-0.5 content-center text-center overflow-hidden">
        {/* Title */}
        <h3 className="font-space-grotesk text-2xl font-bold text-white leading-tight line-clamp-2 min-h-[2.8rem]">
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-gray-300 text-base leading-relaxed min-h-[3rem] overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
          }}
        >
          {project.description}
        </p>

        {/* Collaborator Avatars (up to 5) - centered with +N */}
        <div className="flex items-center justify-center gap-2 py-3">
          {displayedCollaborators.map((collaborator, index) => (
            <motion.a
              key={collaborator.login}
              href={collaborator.html_url}
              target={collaborator.html_url ? "_blank" : undefined}
              rel={collaborator.html_url ? "noopener noreferrer" : undefined}
              className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-purple-500/50 transition-all hover:ring-purple-400"
              title={collaborator.login}
              whileHover={{ scale: 1.1 }}
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
            <span className="text-sm font-semibold text-gray-300 ml-1">+{remainingCount}</span>
          )}
        </div>

        {/* Action Buttons: GitHub + Live Demo */}
        <div className="flex gap-3 mt-2 px-4">
          <motion.a
            href={project.github_url ?? undefined}
            target={project.github_url ? "_blank" : undefined}
            rel={project.github_url ? "noopener noreferrer" : undefined}
            whileHover={project.github_url ? { scale: 1.02 } : {}}
            whileTap={project.github_url ? { scale: 0.98 } : {}}
            onClick={!project.github_url ? (e) => e.preventDefault() : undefined}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-bold backdrop-blur-sm border overflow-hidden transition-all duration-300",
              project.github_url
                ? "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 cursor-pointer"
                : "bg-white/5 text-gray-500 border-white/10 cursor-not-allowed"
            )}
          >
            <motion.svg
              className="h-5 w-5 relative z-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              whileHover={project.github_url ? { rotate: 360 } : {}}
              transition={{ duration: 0.6 }}
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </motion.svg>
            <span className="relative z-10">GitHub</span>
          </motion.a>

          <motion.a
            href={project.live_url ?? undefined}
            target={project.live_url ? "_blank" : undefined}
            rel={project.live_url ? "noopener noreferrer" : undefined}
            whileHover={project.live_url ? { scale: 1.02 } : {}}
            whileTap={project.live_url ? { scale: 0.98 } : {}}
            onClick={!project.live_url ? (e) => e.preventDefault() : undefined}
            className={cn(
              "flex-1 inline-flex items-center pb-3 justify-center gap-2 rounded-xl px-5 py-3 text-base font-bold overflow-hidden transition-all duration-300",
              project.live_url
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50 cursor-pointer"
                : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-500 cursor-not-allowed"
            )}
          >
            <motion.svg
              className="h-5 w-5 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={project.live_url ? { x: 3, y: -3 } : {}}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </motion.svg>
            <span className="relative z-10">Live Demo</span>
          </motion.a>
        </div>

        {/* Admin Actions - Fixed height container */}
        <div className={cn("min-h-[40px] flex items-end", isAdmin && "border-t border-white/10 pt-2")}> 
          {isAdmin && (
            <div className="flex gap-2 w-full justify-end">
              <motion.button
                onClick={onEdit}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex-none relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 text-xs font-bold text-white shadow-md transition-all hover:shadow-blue-500/50"
              >
                <span className="relative z-10">Edit</span>
              </motion.button>
              <motion.button
                onClick={onDelete}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex-none relative overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-3 py-2 text-xs font-bold text-white shadow-md transition-all hover:shadow-red-500/50"
              >
                <span className="relative z-10">Delete</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
