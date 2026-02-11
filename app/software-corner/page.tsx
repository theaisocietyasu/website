"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ProjectCard } from "@/components/software-corner/project-card"
import type { SoftwareProject, NavItem } from "@/lib/types"
import {
  IconHome,
  IconUsers,
  IconCalendar,
  IconCode,
} from "@tabler/icons-react"

export default function SoftwareCornerPage() {
  const [projects, setProjects] = useState<SoftwareProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

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
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900">
      <Navbar navItems={navItems} />

      <div className="flex-1 px-8 pt-32 pb-16">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 font-space-grotesk text-5xl font-bold text-white md:text-6xl">
              Software Corner
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-dark-100">
              Explore innovative projects built by AIS officers. From AI
              applications to web development, discover what our community is
              creating.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="search"
                  placeholder="Search projects..."
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-dark-300 backdrop-blur-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>

          {/* Projects Grid */}
          {isLoading && projects.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
            </div>
          ) : projects.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-xl text-dark-200">No projects found</p>
                <p className="mt-2 text-sm text-dark-300">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "Check back soon for new projects"}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="rounded-lg bg-primary-600 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
                  >
                    {isLoading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
