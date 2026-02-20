"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { SoftwareProject, ProjectFormData } from "@/lib/types"
import Image from "next/image"

interface EditProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: FormData) => Promise<void>
  project?: SoftwareProject | null
  mode: "create" | "edit"
}

export function EditProjectModal({
  isOpen,
  onClose,
  onSave,
  project,
  mode,
}: EditProjectModalProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    github_url: "",
    live_url: "",
    collaborators: [],
    thumbnail: null,
  })
  const [collaboratorInput, setCollaboratorInput] = useState("")
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (project && mode === "edit") {
      setFormData({
        title: project.title,
        description: project.description,
        github_url: project.github_url || "",
        live_url: project.live_url || "",
        collaborators: project.collaborators,
        thumbnail: null,
      })
      if (project.thumbnail_file_id) {
        setThumbnailPreview(
          `/api/projects/${project.thumbnail_file_id}/thumbnail`
        )
      }
    } else {
      setFormData({
        title: "",
        description: "",
        github_url: "",
        live_url: "",
        collaborators: [],
        thumbnail: null,
      })
      setThumbnailPreview(null)
    }
  }, [project, mode, isOpen])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        alert("Please upload a JPG, JPEG, or PNG image")
        return
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }
      setFormData({ ...formData, thumbnail: file })
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  const handleAddCollaborator = () => {
    const username = collaboratorInput.trim()
    if (username && !formData.collaborators.includes(username)) {
      // Validate GitHub username format
      const githubUsernameRegex = /^[a-zA-Z0-9-]{1,39}$/
      if (!githubUsernameRegex.test(username)) {
        alert("Invalid GitHub username format")
        return
      }
      setFormData({
        ...formData,
        collaborators: [...formData.collaborators, username],
      })
      setCollaboratorInput("")
    }
  }

  const handleRemoveCollaborator = (username: string) => {
    setFormData({
      ...formData,
      collaborators: formData.collaborators.filter((c) => c !== username),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || formData.title.length > 120) {
      alert("Title is required and must be max 120 characters")
      return
    }

    if (!formData.description) {
      alert("Description is required")
      return
    }

    setIsSubmitting(true)

    try {
      const submitData = new FormData()
      submitData.append("title", formData.title)
      submitData.append("description", formData.description)
      submitData.append("github_url", formData.github_url)
      submitData.append("live_url", formData.live_url)
      submitData.append("collaborators", JSON.stringify(formData.collaborators))

      if (formData.thumbnail) {
        submitData.append("thumbnail", formData.thumbnail)
      }

      await onSave(submitData)
      onClose()
    } catch (error) {
      console.error("Error saving project:", error)
      alert("Failed to save project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-primary-500/30 bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800 p-8 shadow-2xl shadow-primary-500/20 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-space-grotesk text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
                  {mode === "create" ? "Create New Project" : "Edit Project"}
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-dark-200 transition-all hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="mb-2.5 block text-sm font-bold uppercase tracking-wide text-primary-300">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    maxLength={120}
                    className="w-full rounded-xl border-2 border-white/10 bg-dark-800 px-5 py-3.5 text-white placeholder-dark-300 transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/30"
                    placeholder="My Awesome Project"
                    required
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-dark-300">
                      {formData.title.length}/120 characters
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2.5 block text-sm font-bold uppercase tracking-wide text-primary-300">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={5}
                    className="w-full rounded-xl border-2 border-white/10 bg-dark-800 px-5 py-3.5 text-white placeholder-dark-300 transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/30"
                    placeholder="Describe your project in detail..."
                    required
                  />
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="mb-2.5 block text-sm font-bold uppercase tracking-wide text-primary-300">
                    Thumbnail Image
                  </label>
                  <div className="flex flex-col gap-4">
                    {thumbnailPreview && (
                      <div className="relative h-40 w-full overflow-hidden rounded-xl border-2 border-white/20 shadow-lg">
                        <Image
                          src={thumbnailPreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full rounded-xl border-2 border-dashed border-white/30 bg-dark-800/50 px-6 py-4 text-sm font-semibold text-white transition-all hover:border-primary-500 hover:bg-dark-700"
                      >
                        <svg className="mx-auto mb-2 h-8 w-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Choose Thumbnail
                      </button>
                      <p className="mt-2 text-center text-xs text-dark-300">
                        JPG, JPEG, or PNG. Max 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* GitHub URL */}
                <div>
                  <label className="mb-2.5 block text-sm font-bold uppercase tracking-wide text-primary-300">
                    GitHub Repository
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <svg className="h-5 w-5 text-dark-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <input
                      type="url"
                      value={formData.github_url}
                      onChange={(e) =>
                        setFormData({ ...formData, github_url: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-white/10 bg-dark-800 pl-12 pr-5 py-3.5 text-white placeholder-dark-300 transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/30"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>

                {/* Live URL */}
                <div>
                  <label className="mb-2.5 block text-sm font-bold uppercase tracking-wide text-primary-300">
                    Live Demo URL
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <svg className="h-5 w-5 text-dark-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <input
                      type="url"
                      value={formData.live_url}
                      onChange={(e) =>
                        setFormData({ ...formData, live_url: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-white/10 bg-dark-800 pl-12 pr-5 py-3.5 text-white placeholder-dark-300 transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/30"
                      placeholder="https://myproject.com"
                    />
                  </div>
                </div>

                {/* Collaborators */}
                <div>
                  <label className="mb-2.5 block text-sm font-bold uppercase tracking-wide text-primary-300">
                    Collaborators (GitHub usernames)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={collaboratorInput}
                      onChange={(e) => setCollaboratorInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddCollaborator()
                        }
                      }}
                      className="flex-1 rounded-xl border-2 border-white/10 bg-dark-800 px-5 py-3.5 text-white placeholder-dark-300 transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/30"
                      placeholder="username"
                    />
                    <button
                      type="button"
                      onClick={handleAddCollaborator}
                      className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:from-primary-500 hover:to-primary-600 hover:shadow-xl hover:scale-105"
                    >
                      Add
                    </button>
                  </div>
                  {formData.collaborators.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {formData.collaborators.map((username) => (
                        <div
                          key={username}
                          className="flex items-center gap-2.5 rounded-xl border border-primary-500/30 bg-dark-800/80 px-4 py-2.5 shadow-md backdrop-blur-sm"
                        >
                          <svg className="h-4 w-4 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          <span className="text-sm font-semibold text-white">{username}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCollaborator(username)}
                            className="text-dark-300 transition-colors hover:text-red-400"
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl border-2 border-white/20 bg-dark-800/50 px-6 py-4 font-bold text-white shadow-md backdrop-blur-sm transition-all hover:bg-dark-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 font-bold text-white shadow-lg transition-all hover:from-primary-500 hover:to-primary-600 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                      </span>
                    ) : mode === "create"
                      ? "Create Project"
                      : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
