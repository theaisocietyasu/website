"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ProjectCard } from "@/components/software-corner/project-card"
import { EditProjectModal } from "@/components/software-corner/edit-project-modal"
import type { SoftwareProject, NavItem } from "@/lib/types"
import {
  IconHome,
  IconUsers,
  IconCalendar,
  IconCode,
} from "@tabler/icons-react"

export default function AdminSoftwareCornerPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<SoftwareProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<SoftwareProject | null>(
    null
  )
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [showDrafts, setShowDrafts] = useState(false)

  const navItems: NavItem[] = [
    { name: "Home", link: "/", icon: <IconHome className="h-4 w-4" /> },
    {
      name: "Projects",
      link: "/projects",
      icon: <IconUsers className="h-4 w-4" />,
    },
    {
      name: "Events",
      link: "/events",
      icon: <IconCalendar className="h-4 w-4" />,
    },
    {
      name: "Software Corner",
      link: "/software-corner",
      icon: <IconCode className="h-4 w-4" />,
    },
  ]

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/relink/signin")
    }
  }, [status, router])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        pageSize: "100",
        published: showDrafts ? "false" : "true",
      })

      const response = await fetch(`/api/projects?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }

      const data = await response.json()
      setProjects(data.data)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setIsLoading(false)
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
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900">
      <Navbar navItems={navItems} />

      <div className="flex-1 px-8 pt-32 pb-16">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="mb-2 font-space-grotesk text-4xl font-bold text-white md:text-5xl">
                  Manage Projects
                </h1>
                <p className="text-dark-100">
                  Create, edit, and publish projects in the Software Corner
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDrafts(!showDrafts)}
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 font-medium text-white transition-colors hover:bg-white/10"
                >
                  {showDrafts ? "Show Published" : "Show Drafts"}
                </button>
                <button
                  onClick={openCreateModal}
                  className="rounded-lg bg-primary-600 px-6 py-2 font-medium text-white transition-colors hover:bg-primary-700"
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
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-sm text-dark-200">Total Projects</p>
              <p className="mt-1 font-space-grotesk text-3xl font-bold text-white">
                {projects.length}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-sm text-dark-200">Published</p>
              <p className="mt-1 font-space-grotesk text-3xl font-bold text-green-400">
                {projects.filter((p) => p.published).length}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-sm text-dark-200">Drafts</p>
              <p className="mt-1 font-space-grotesk text-3xl font-bold text-yellow-400">
                {projects.filter((p) => !p.published).length}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-sm text-dark-200">Your Projects</p>
              <p className="mt-1 font-space-grotesk text-3xl font-bold text-primary-400">
                {
                  projects.filter(
                    (p) => p.owner_discord_id === session?.user?.discordId
                  ).length
                }
              </p>
            </div>
          </motion.div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
            </div>
          ) : projects.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-xl text-dark-200">
                  {showDrafts ? "No draft projects" : "No published projects"}
                </p>
                <p className="mt-2 text-sm text-dark-300">
                  Create your first project to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project._id} className="relative">
                  <ProjectCard
                    project={project}
                    isAdmin
                    onEdit={() => openEditModal(project)}
                    onDelete={() => handleDeleteProject(project)}
                  />
                  <button
                    onClick={() => handleTogglePublish(project)}
                    className={`absolute right-2 top-2 z-10 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      project.published
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-yellow-500 text-dark-950 hover:bg-yellow-600"
                    }`}
                  >
                    {project.published ? "Published" : "Publish"}
                  </button>
                </div>
              ))}
            </div>
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
