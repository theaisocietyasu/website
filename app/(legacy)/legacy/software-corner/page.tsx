"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/legacy/layout/navbar"
import { Footer } from "@/components/legacy/layout/footer"
import { ProjectCard } from "@/components/legacy/software-corner/project-card"
import { NAV_ITEMS } from "@/lib/navigation"
import type { SoftwareProject } from "@/lib/types"

const SIDEBAR_WIDTH = 380

export default function SoftwareCornerPage() {
  const [projects, setProjects] = useState<SoftwareProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<SoftwareProject | null>(null)
  const [navbarHeight, setNavbarHeight] = useState(80)
  const [isMobile, setIsMobile] = useState(false)

  const fetchProjects = async (cursor?: string | null, search?: string) => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        pageSize: "12",
        published: "true",
      })

      if (cursor) {
        params.append("cursor", cursor)
      }

      if (search && search.trim()) {
        params.append("search", search.trim())
      }

      const response = await fetch(`/api/projects?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }

      const data = await response.json()

      if (cursor) {
        setProjects((prev) => [...prev, ...data.data])
      } else {
        setProjects(data.data)
      }
      setHasMore(data.hasMore)
      setNextCursor(data.nextCursor)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects(null, searchQuery)
  }, [searchQuery])

  useEffect(() => {
    const navbar = document.querySelector("nav, header") as HTMLElement | null
    if (navbar) setNavbarHeight(navbar.offsetHeight)

    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Prevent body scroll on mobile when sidebar is open
  useEffect(() => {
    if (isMobile && selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobile, selectedProject])

  const handleLoadMore = () => {
    if (nextCursor && !isLoading) {
      fetchProjects(nextCursor, searchQuery)
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setSearchQuery(formData.get("search") as string)
  }

  const handleSelectProject = (project: SoftwareProject) => {
    setSelectedProject((prev) => (prev?._id === project._id ? null : project))
  }

  const sidebarOpen = !!selectedProject

  // Sidebar content shared between mobile and desktop
  const SidebarContent = () =>
    selectedProject ? (
      <>
        {/* Thumbnail */}
        <div className="relative w-full h-52 flex-shrink-0 bg-dark-950">
          <Image
            src={
              selectedProject.thumbnail_file_id
                ? `/api/projects/${selectedProject.thumbnail_file_id}/thumbnail`
                : "/placeholder-project.png"
            }
            alt={selectedProject.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-dark-950/70 border border-dark-700/60 text-dark-300 hover:text-white hover:bg-dark-800 transition-colors backdrop-blur-sm"
            aria-label="Close project details"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 3l8 8M11 3L3 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex flex-col flex-1 overflow-y-auto p-6 gap-5">
          {/* Title */}
          <div>
            <span className="inline-flex items-center rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-300 border border-primary-500/20 mb-3">
              Project details
            </span>
            <h2 className="font-heading text-2xl font-bold text-white leading-tight">
              {selectedProject.title}
            </h2>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-dark-400">
              Description
            </h3>
            <p className="text-sm text-dark-100 leading-relaxed whitespace-pre-line">
              {selectedProject.description}
            </p>
          </div>

          {/* Collaborators */}
          {selectedProject.collaborators && selectedProject.collaborators.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-dark-400">
                Collaborators
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.collaborators.map((name) => (
                  <span
                    key={name}
                    className="rounded-full bg-dark-800 border border-dark-700 px-3 py-1 text-xs font-medium text-dark-100"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1" />

          {/* Links */}
          <div className="flex gap-2 pt-4 border-t border-dark-800">
            {selectedProject.github_url && (
              <a
                href={selectedProject.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-dark-700 bg-dark-800 px-4 py-2.5 text-sm font-semibold text-dark-100 hover:bg-dark-700 hover:border-dark-500 transition-colors"
              >
                GitHub
              </a>
            )}
            {selectedProject.live_url && (
              <a
                href={selectedProject.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-700/30 hover:shadow-lg transition-shadow"
              >
                Live demo
              </a>
            )}
          </div>
        </div>
      </>
    ) : null

  return (
    <main className="flex min-h-screen flex-col bg-dark-950 bg-grid-pattern relative">
      {/* Background glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-primary-500/6 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-60 w-[500px] h-[500px] bg-secondary-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent-500/4 rounded-full blur-3xl" />
      </div>

      <Navbar navItems={NAV_ITEMS} />

      {/* ── MOBILE SIDEBAR: full-screen overlay ── */}
      <AnimatePresence>
        {sidebarOpen && isMobile && selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setSelectedProject(null)}
            />
            {/* Sheet slides up from bottom */}
            <motion.aside
              key="mobile-sidebar"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                // Leave a little gap at the top so users know they can close it
                maxHeight: `calc(100vh - ${navbarHeight}px)`,
                zIndex: 50,
              }}
              className="flex flex-col bg-dark-900 border-t border-dark-800 shadow-2xl shadow-black/60 rounded-t-2xl overflow-hidden"
            >
              {/* Drag handle indicator */}
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 rounded-full bg-dark-600" />
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── DESKTOP SIDEBAR: fixed panel on right ── */}
      <AnimatePresence>
        {sidebarOpen && !isMobile && selectedProject && (
          <motion.aside
            key="desktop-sidebar"
            initial={{ x: SIDEBAR_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: SIDEBAR_WIDTH }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: navbarHeight,
              right: 0,
              width: SIDEBAR_WIDTH,
              height: `calc(100vh - ${navbarHeight}px)`,
              zIndex: 40,
            }}
            className="flex flex-col bg-dark-900 border-l border-dark-800 shadow-2xl shadow-black/60"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── PAGE CONTENT ── */}
      <div
        className="flex-1 px-6 pt-32 pb-20 relative z-10 transition-[padding] duration-300"
        style={{
          // Only add sidebar padding on desktop
          paddingRight:
            sidebarOpen && !isMobile
              ? `calc(1.5rem + ${SIDEBAR_WIDTH}px)`
              : undefined,
        }}
      >
        <div className="mx-auto w-full max-w-[1400px]">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <h1 className="mb-5 font-heading text-5xl font-bold md:text-7xl leading-tight gradient-text">
              Software Corner
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-dark-200 leading-relaxed">
              Explore innovative projects built by AIS officers. From AI
              applications to web development, discover what our community is
              creating.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-14"
          >
            <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg
                      className="h-5 w-5 text-dark-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="search"
                    placeholder="Search projects..."
                    className="w-full rounded-xl border border-dark-700/60 bg-dark-900/60 pl-12 pr-5 py-3.5 text-white placeholder-dark-500 backdrop-blur-sm transition-all focus:border-primary-500/60 focus:bg-dark-800/80 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl bg-primary-600 hover:bg-primary-500 px-7 py-3.5 font-semibold text-white shadow-lg transition-colors"
                >
                  Search
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Projects Grid */}
          {isLoading && projects.length === 0 ? (
            <div className="flex min-h-[500px] items-center justify-center">
              <div className="text-center">
                <div className="relative mx-auto mb-5 h-16 w-16">
                  <div className="absolute inset-0 animate-spin rounded-full border-4 border-dark-700 border-t-primary-500" />
                </div>
                <p className="text-sm font-medium text-dark-300">Loading projects...</p>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex min-h-[500px] items-center justify-center"
            >
              <div className="text-center max-w-sm">
                <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-dark-800/60 border border-dark-700/60 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-dark-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-xl font-semibold text-white mb-2">No projects found</p>
                <p className="text-dark-400 text-sm">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "Check back soon for new projects"}
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-4 grid gap-6"
                style={{
                  // auto-fill naturally reflows based on available width.
                  // 280px is the minimum card width — the browser works out
                  // how many columns fit, so the grid responds to the sidebar
                  // narrowing the container without any hardcoded counts.
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                }}
              >
                {projects.map((project, index) => (
                  <motion.button
                    layout
                    key={project._id}
                    type="button"
                    onClick={() => handleSelectProject(project)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className={`text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 rounded-2xl transition-shadow ${
                      selectedProject?._id === project._id
                        ? "ring-2 ring-primary-500/60"
                        : ""
                    }`}
                  >
                    <ProjectCard project={project} />
                  </motion.button>
                ))}
              </motion.div>

              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-14 flex justify-center"
                >
                  <motion.button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.03 }}
                    whileTap={{ scale: isLoading ? 1 : 0.97 }}
                    className="inline-flex items-center gap-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 px-8 py-3.5 font-semibold text-white shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More
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
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}