"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ProjectCard } from "@/components/software-corner/project-card"
import { NAV_ITEMS } from "@/lib/navigation"
import type { SoftwareProject } from "@/lib/types"

export default function SoftwareCornerPage() {
  const [projects, setProjects] = useState<SoftwareProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

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

  const handleLoadMore = () => {
    if (nextCursor && !isLoading) {
      fetchProjects(nextCursor, searchQuery)
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get("search") as string
    setSearchQuery(query)
  }

  return (
    <main className="flex min-h-screen flex-col bg-dark-950 bg-grid-pattern relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-primary-500/6 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-60 w-[500px] h-[500px] bg-secondary-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent-500/4 rounded-full blur-3xl" />
      </div>

      <Navbar navItems={NAV_ITEMS} />

      <div className="flex-1 px-6 pt-32 pb-20 relative z-10">
        <div className="mx-auto w-full max-w-[1400px]">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 inline-flex items-center px-4 py-1.5 rounded-full bg-dark-800/50 border border-dark-700 text-dark-100 text-sm"
            >
              Showcase
            </motion.div>
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
                    <svg className="h-5 w-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                  <svg className="w-8 h-8 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More */}
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
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
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
