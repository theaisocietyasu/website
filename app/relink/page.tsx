'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { RelinkLink, RelinkBanner } from '@/lib/types'
import { ExternalLink } from 'lucide-react'

export default function RelinkPage() {
  const [links, setLinks] = useState<RelinkLink[]>([])
  const [banners, setBanners] = useState<RelinkBanner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [linksRes, bannersRes] = await Promise.all([
          fetch('/api/relink/links'),
          fetch('/api/relink/banners'),
        ])

        if (linksRes.ok) {
          const linksData = await linksRes.json()
          setLinks(linksData)
        }

        if (bannersRes.ok) {
          const bannersData = await bannersRes.json()
          setBanners(bannersData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Logo and Name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src="/logo.png"
              alt="AI Society Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            The AI Society at ASU
          </h1>
        </motion.div>

        {/* Banners/Announcements */}
        {banners.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            {banners.map((banner, index) => (
              <motion.div
                key={banner._id?.toString() || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400/50 transition-all"
              >
                {banner.imageUrl && (
                  <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={banner.imageUrl}
                      alt={banner.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {banner.title}
                </h3>
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {banner.content}
                  </ReactMarkdown>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {links.map((link, index) => (
            <motion.a
              key={link._id?.toString() || index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="block group"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-white/30 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                      {link.title}
                    </h3>
                    {link.description && (
                      <p className="text-gray-300 text-sm">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-300 transition-colors flex-shrink-0 ml-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Empty State */}
        {links.length === 0 && banners.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 py-12"
          >
            <p className="text-lg">No content available yet.</p>
            <p className="text-sm mt-2">Check back soon!</p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12 text-gray-400 text-sm"
        >
          <p>© {new Date().getFullYear()} The AI Society at ASU</p>
        </motion.div>
      </div>
    </div>
  )
}
