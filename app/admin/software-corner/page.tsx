"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ProjectCard } from "@/components/software-corner/project-card"
import { EditProjectModal } from "@/components/software-corner/edit-project-modal"
import { NAV_ITEMS } from "@/lib/navigation"
import type { SoftwareProject } from "@/lib/types"

export default function AdminSoftwareCornerPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<SoftwareProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<SoftwareProject | null>(
    null
  )
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [showDrafts, setShowDrafts] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/relink/signin")
    }
  }, [status, router])

  const fetchProjects = async (cursor?: string | null) => {
    try {
      if (cursor) {
        setIsLoadingMore(true)
      } else {
        setIsLoading(true)
      }

      const params = new URLSearchParams()

      if (showDrafts) {
        params.append("published", "false")
      }

      if (cursor) {
        params.append("cursor", cursor)
      }

      const response = await fetch(`/api/projects/mine?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }

      const data = await response.json()

      if (cursor) {
        // Append to existing projects
        setProjects((prev) => [...prev, ...data.data])
      } else {
        // Replace projects (initial load or filter change)
        setProjects(data.data)
      }

      setHasMore(data.hasMore)
      setNextCursor(data.nextCursor)
    } catch (error) {
      // Error logged internally
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  const handleLoadMore = () => {
    if (nextCursor && !isLoadingMore) {
      fetchProjects(nextCursor)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchProjects()
    }
  }, [status, showDrafts])

  const handleCreateProject = async (formData: FormData) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create project")
      }

      await fetchProjects()
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error creating project:", error)
      alert(error instanceof Error ? error.message : "Failed to create project")
      throw error
    }
  }

  const handleEditProject = async (formData: FormData) => {
    if (!editingProject) return

    try {
      const response = await fetch(`/api/projects/${editingProject._id}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update project")
      }

      await fetchProjects()
      setIsModalOpen(false)
      setEditingProject(null)
    } catch (error) {
      console.error("Error updating project:", error)
      alert(error instanceof Error ? error.message : "Failed to update project")
      throw error
    }
  }

  const handleDeleteProject = async (project: SoftwareProject) => {
    if (
      !confirm(
        `Are you sure you want to delete "${project.title}"? This action cannot be undone.`
      )
    ) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${project._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete project")
      }

      await fetchProjects()
    } catch (error) {
      console.error("Error deleting project:", error)
      alert(error instanceof Error ? error.message : "Failed to delete project")
    }
  }

  const handleTogglePublish = async (project: SoftwareProject) => {
    const action = project.published ? "unpublish" : "publish"
    if (
      !confirm(
        `Are you sure you want to ${action} "${project.title}"?`
      )
    ) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${project._id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !project.published }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `Failed to ${action} project`)
      }

      await fetchProjects()
    } catch (error) {
      console.error(`Error ${action}ing project:`, error)
      alert(
        error instanceof Error ? error.message : `Failed to ${action} project`
      )
    }
  }

  const openCreateModal = () => {
    setModalMode("create")
    setEditingProject(null)
    setIsModalOpen(true)
  }

  const openEditModal = (project: SoftwareProject) => {
    setModalMode("edit")
    setEditingProject(project)
    setIsModalOpen(true)
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <Navbar navItems={NAV_ITEMS} />

      <div className="flex-1 px-6 pt-32 pb-20 relative z-10">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-primary-500/20 to-purple-500/20 px-5 py-2 backdrop-blur-sm border border-primary-500/30">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary-300">
                    Admin Dashboard
                  </span>
                </div>
                <h1 className="mb-3 font-space-grotesk text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 to-purple-200 md:text-6xl">
                  Manage Projects
                </h1>
                <p className="text-xl text-dark-50">
                  Create, edit, and publish projects in the Software Corner
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDrafts(!showDrafts)}
                  className="rounded-2xl border-2 border-white/20 bg-white/5 px-6 py-3.5 font-bold text-white backdrop-blur-md shadow-lg transition-all hover:bg-white/10 hover:shadow-xl hover:scale-105"
                >
                  {showDrafts ? "Show Published" : "Show Drafts"}
                </button>
                <button
                  onClick={openCreateModal}
                  className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-3.5 font-bold text-white shadow-lg transition-all hover:from-primary-500 hover:to-primary-600 hover:shadow-xl hover:scale-105"
                >
                  + New Project
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-md shadow-lg transition-all hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/20">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold uppercase tracking-wide text-primary-300">My Projects</p>
                <svg className="h-8 w-8 text-primary-400 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <p className="font-space-grotesk text-5xl font-bold text-white">
                {projects.length}
              </p>
            </div>
            <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-green-500/10 to-green-500/5 p-6 backdrop-blur-md shadow-lg transition-all hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/20">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold uppercase tracking-wide text-green-300">Published</p>
                <svg className="h-8 w-8 text-green-400 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-space-grotesk text-5xl font-bold text-green-400">
                {projects.filter((p) => p.published).length}
              </p>
            </div>
            <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 p-6 backdrop-blur-md shadow-lg transition-all hover:border-yellow-500/50 hover:shadow-xl hover:shadow-yellow-500/20">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold uppercase tracking-wide text-yellow-300">Drafts</p>
                <svg className="h-8 w-8 text-yellow-400 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-space-grotesk text-5xl font-bold text-yellow-400">
                {projects.filter((p) => !p.published).length}
              </p>
            </div>
          </motion.div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="flex min-h-[500px] items-center justify-center">
              <div className="text-center">
                <div className="relative mx-auto mb-6 h-20 w-20">
                  <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary-500/30 border-t-primary-500" />
                  <div className="absolute inset-2 animate-ping rounded-full bg-primary-500/20" />
                </div>
                <p className="text-lg font-medium text-primary-300">Loading projects...</p>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex min-h-[500px] items-center justify-center"
            >
              <div className="text-center max-w-md">
                <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center border border-primary-500/30">
                  <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-white mb-3">
                  {showDrafts ? "No draft projects" : "No published projects"}
                </p>
                <p className="text-lg text-dark-100">
                  Create your first project to get started
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <ProjectCard
                      project={project}
                      isAdmin
                      onEdit={() => openEditModal(project)}
                      onDelete={() => handleDeleteProject(project)}
                    />
                    <button
                      onClick={() => handleTogglePublish(project)}
                      className={`absolute right-3 top-3 z-10 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide shadow-lg transition-all hover:scale-110 ${
                        project.published
                          ? "bg-green-500 text-white hover:bg-green-600 hover:shadow-green-500/50"
                          : "bg-yellow-500 text-dark-950 hover:bg-yellow-600 hover:shadow-yellow-500/50"
                      }`}
                    >
                      {project.published ? "✓ Published" : "Publish"}
                    </button>
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More Button */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-16 flex justify-center"
                >
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="group rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-10 py-4 font-bold text-white shadow-lg transition-all hover:from-primary-500 hover:to-primary-600 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoadingMore ? (
                      <span className="flex items-center gap-3">
                        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Load More Projects
                        <svg className="h-5 w-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                    )}
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />

      {/* Edit/Create Modal */}
      <EditProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProject(null)
        }}
        onSave={modalMode === "create" ? handleCreateProject : handleEditProject}
        project={editingProject}
        mode={modalMode}
      />
    </main>
  )
}
