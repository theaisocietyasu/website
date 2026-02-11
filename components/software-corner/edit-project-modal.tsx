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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20 bg-dark-900 p-6 shadow-2xl"
            >
              <h2 className="mb-6 font-space-grotesk text-2xl font-bold text-white">
                {mode === "create" ? "Create New Project" : "Edit Project"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    maxLength={120}
                    className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-2 text-white placeholder-dark-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    placeholder="My Awesome Project"
                    required
                  />
                  <p className="mt-1 text-xs text-dark-300">
                    {formData.title.length}/120 characters
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-2 text-white placeholder-dark-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    placeholder="Describe your project..."
                    required
                  />
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Thumbnail
                  </label>
                  <div className="flex gap-4">
                    {thumbnailPreview && (
                      <div className="relative h-24 w-32 overflow-hidden rounded-lg border border-white/10">
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
                        className="rounded-lg border border-white/20 bg-dark-800 px-4 py-2 text-sm text-white transition-colors hover:bg-dark-700"
                      >
                        Choose File
                      </button>
                      <p className="mt-1 text-xs text-dark-300">
                        JPG, JPEG, or PNG. Max 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* GitHub URL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) =>
                      setFormData({ ...formData, github_url: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-2 text-white placeholder-dark-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                {/* Live URL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) =>
                      setFormData({ ...formData, live_url: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-2 text-white placeholder-dark-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    placeholder="https://myproject.com"
                  />
                </div>

                {/* Collaborators */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Collaborators (GitHub usernames)
                  </label>
                  <div className="flex gap-2">
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
                      className="flex-1 rounded-lg border border-white/10 bg-dark-800 px-4 py-2 text-white placeholder-dark-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                      placeholder="username"
                    />
                    <button
                      type="button"
                      onClick={handleAddCollaborator}
                      className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                    >
                      Add
                    </button>
                  </div>
                  {formData.collaborators.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.collaborators.map((username) => (
                        <div
                          key={username}
                          className="flex items-center gap-2 rounded-lg border border-white/10 bg-dark-800 px-3 py-1.5"
                        >
                          <span className="text-sm text-white">{username}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCollaborator(username)}
                            className="text-dark-300 hover:text-red-400"
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
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg border border-white/20 bg-dark-800 px-4 py-2 font-medium text-white transition-colors hover:bg-dark-700 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : mode === "create"
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
