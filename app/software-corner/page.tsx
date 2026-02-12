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
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 inline-block rounded-full bg-gradient-to-r from-primary-500/20 to-purple-500/20 px-6 py-2 backdrop-blur-sm border border-primary-500/30"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-primary-300">
                Showcase
              </span>
            </motion.div>
            <h1 className="mb-6 font-space-grotesk text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 to-purple-200 md:text-7xl leading-tight">
              Software Corner
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-dark-50 leading-relaxed">
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
            <form onSubmit={handleSearch} className="mx-auto max-w-3xl">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                    <svg className="h-6 w-6 text-dark-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="search"
                    placeholder="Search projects by name, description..."
                    className="w-full rounded-2xl border-2 border-white/10 bg-white/5 pl-14 pr-6 py-4 text-white placeholder-dark-300 backdrop-blur-md transition-all focus:border-primary-500/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-primary-500/30 shadow-lg"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-4 font-bold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-primary-500/50"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%', skewX: -20 }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.6 }}
                  />

                  <span className="relative z-10">Search</span>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Projects Grid */}
          {isLoading && projects.length === 0 ? (
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-white mb-3">No projects found</p>
                <p className="text-lg text-dark-100">
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
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  className="mt-16 flex justify-center"
                >
                  <motion.button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-10 py-4 font-bold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Animated background */}
                    {!isLoading && (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: '-100%', skewX: -20 }}
                          whileHover={{ x: '200%' }}
                          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                        />
                      </>
                    )}

                    {isLoading ? (
                      <span className="flex items-center gap-3 relative z-10">
                        <motion.svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </motion.svg>
                        Loading...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 relative z-10">
                        Load More Projects
                        <motion.svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{ y: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </motion.svg>
                      </span>
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
