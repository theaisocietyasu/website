'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { RelinkLink, RelinkBanner } from '@/lib/types'
import {
  Trash2,
  Plus,
  Save,
  X,
  GripVertical,
  ExternalLink,
  Upload,
  Eye,
  Edit,
  Link as LinkIcon,
  Megaphone,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function RelinkEditPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [links, setLinks] = useState<RelinkLink[]>([])
  const [banners, setBanners] = useState<RelinkBanner[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'links' | 'banners'>('links')
  const [editingLink, setEditingLink] = useState<RelinkLink | null>(null)
  const [editingBanner, setEditingBanner] = useState<RelinkBanner | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/relink/signin')
    } else if (status === 'authenticated') {
      fetchData()
    }
  }, [status, router]);

  async function handleSignOut() {
    await signOut({ callbackUrl: "/relink" });
  }

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
      setLoading(false);
    }
  }

  async function saveLink(link: RelinkLink) {
    setSaving(true);
    try {
      const method = link._id ? 'PUT' : 'POST'
      const res = await fetch('/api/relink/links', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(link),
      })

      if (res.ok) {
        await fetchData()
        setEditingLink(null)
      }
    } catch (error) {
      console.error('Error saving link:', error)
      alert('Failed to save link')
    } finally {
      setSaving(false)
    }
  }

  async function deleteLink(id: string) {
    if (!confirm('Are you sure you want to delete this link?')) return

    setSaving(true)
    try {
      const res = await fetch(`/api/relink/links?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        await fetchData()
      }
    } catch (error) {
      console.error('Error deleting link:', error)
      alert('Failed to delete link')
    } finally {
      setSaving(false)
    }
  }

  async function saveBanner(banner: RelinkBanner) {
    setSaving(true)
    try {
      const method = banner._id ? 'PUT' : 'POST'
      const res = await fetch('/api/relink/banners', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(banner),
      })

      if (res.ok) {
        await fetchData()
        setEditingBanner(null)
      }
    } catch (error) {
      console.error('Error saving banner:', error)
      alert('Failed to save banner')
    } finally {
      setSaving(false)
    }
  }

  async function deleteBanner(id: string) {
    if (!confirm('Are you sure you want to delete this banner?')) return

    setSaving(true)
    try {
      const res = await fetch(`/api/relink/banners?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        await fetchData()
      }
    } catch (error) {
      console.error('Error deleting banner:', error)
      alert('Failed to delete banner')
    } finally {
      setSaving(false)
    }
  }

  async function uploadImage(file: File): Promise<string | null> {
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/relink/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        return data.url
      }
      return null
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  function createNewLink() {
    setEditingLink({
      title: '',
      url: '',
      description: '',
      order: links.length,
    });
  }

  async function reorderLinks(fromIndex: number, toIndex: number) {
    const newLinks = [...links];
    const [movedLink] = newLinks.splice(fromIndex, 1);
    newLinks.splice(toIndex, 0, movedLink);

    const updatedLinks = newLinks.map((link, index) => ({
      ...link,
      order: index,
    }));

    setLinks(updatedLinks);

    // Persist order to database using Promise.allSettled for better error handling
    try {
      const updatePromises = updatedLinks.map((link) =>
        fetch("/api/relink/links", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(link),
        }).then((res) => {
          if (!res.ok) {
            throw new Error(
              `Failed to update link ${link._id}: ${res.statusText}`,
            );
          }
          return res;
        }),
      );

      const results = await Promise.allSettled(updatePromises);

      const failedUpdates = results.filter(
        (result) => result.status === "rejected",
      );

      if (failedUpdates.length > 0) {
        console.error("Some link updates failed:", failedUpdates);
        alert(
          `Failed to save ${failedUpdates.length} link(s). Please try again.`,
        );
        await fetchData();
      }
    } catch (error) {
      console.error("Error updating link order:", error);
      alert("Failed to save link order. Please try again.");
      await fetchData();
    }
  }

  function createNewBanner() {
    setEditingBanner({
      title: '',
      content: '',
      order: banners.length,
    });
  }

  if (loading || status === 'loading' || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Relink Editor
            </h1>
            <p className="text-gray-300">
              Manage links and announcements for the AI Society
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/relink">
              <Button variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
            </Link>
            <Button variant="outline" onClick={handleSignOut} className="gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setActiveTab('links')}
            variant={activeTab === 'links' ? 'primary' : 'outline'}
            className="gap-2"
          >
            <LinkIcon className="w-4 h-4" />
            Links ({links.length})
          </Button>
          <Button
            onClick={() => setActiveTab('banners')}
            variant={activeTab === 'banners' ? 'primary' : 'outline'}
            className="gap-2"
          >
            <Megaphone className="w-4 h-4" />
            Banners ({banners.length})
          </Button>
        </div>

        {/* Links Tab */}
        {activeTab === 'links' && (
          <div className="space-y-6">
            <Button
              onClick={createNewLink}
              className="w-full gap-2"
              size="lg"
              disabled={!!editingLink}
            >
              <Plus className="w-5 h-5" />
              Add New Link
            </Button>

            <AnimatePresence>
              {editingLink && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Card className="p-6 bg-white/10 backdrop-blur-sm border-purple-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        {editingLink._id ? 'Edit Link' : 'New Link'}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingLink(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-white mb-2 font-medium">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={editingLink.title}
                          onChange={(e) =>
                            setEditingLink({
                              ...editingLink,
                              title: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                          placeholder="e.g., Join Our Discord"
                        />
                      </div>

                      <div>
                        <label className="block text-white mb-2 font-medium">
                          URL *
                        </label>
                        <input
                          type="url"
                          value={editingLink.url}
                          onChange={(e) =>
                            setEditingLink({
                              ...editingLink,
                              url: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                          placeholder="https://..."
                        />
                      </div>

                      <div>
                        <label className="block text-white mb-2 font-medium">
                          Description (Optional)
                        </label>
                        <input
                          type="text"
                          value={editingLink.description || ''}
                          onChange={(e) =>
                            setEditingLink({
                              ...editingLink,
                              description: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                          placeholder="Short description..."
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => saveLink(editingLink)}
                          disabled={
                            !editingLink.title || !editingLink.url || saving
                          }
                          className="flex-1 gap-2"
                        >
                          <Save className="w-4 h-4" />
                          {saving ? 'Saving...' : 'Save Link'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingLink(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {links.map((link, index) => (
                <Card
                  key={link._id?.toString()}
                  draggable
                  onDragStart={() => setDraggedIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedIndex !== null && draggedIndex !== index) {
                      reorderLinks(draggedIndex, index);
                    }
                    setDraggedIndex(null);
                  }}
                  onDragLeave={() => {}}
                  className={`p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/30 transition-all cursor-move ${
                    draggedIndex === index ? "opacity-50" : ""
                  } ${draggedIndex !== null && draggedIndex !== index ? "hover:bg-white/20" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{link.title}</h4>
                      <p className="text-gray-400 text-sm">{link.url}</p>
                      {link.description && (
                        <p className="text-gray-300 text-sm mt-1">
                          {link.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingLink(link)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteLink(link._id!.toString())}
                        disabled={saving}
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {links.length === 0 && !editingLink && (
              <div className="text-center text-gray-400 py-12">
                <LinkIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No links yet</p>
                <p className="text-sm">
                  Click the button above to add your first link
                </p>
              </div>
            )}
          </div>
        )}

        {/* Banners Tab */}
        {activeTab === 'banners' && (
          <div className="space-y-6">
            <Button
              onClick={createNewBanner}
              className="w-full gap-2"
              size="lg"
              disabled={!!editingBanner}
            >
              <Plus className="w-5 h-5" />
              Add New Banner
            </Button>

            <AnimatePresence>
              {editingBanner && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Card className="p-6 bg-white/10 backdrop-blur-sm border-purple-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        {editingBanner._id ? 'Edit Banner' : 'New Banner'}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingBanner(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-white mb-2 font-medium">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={editingBanner.title}
                          onChange={(e) =>
                            setEditingBanner({
                              ...editingBanner,
                              title: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                          placeholder="e.g., Upcoming Event"
                        />
                      </div>

                      <div>
                        <label className="block text-white mb-2 font-medium">
                          Content * (Markdown supported)
                        </label>
                        <textarea
                          value={editingBanner.content}
                          onChange={(e) =>
                            setEditingBanner({
                              ...editingBanner,
                              content: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
                          rows={8}
                          placeholder="Write your announcement here... You can use **bold**, *italic*, [links](url), etc."
                        />
                      </div>

                      <div>
                        <label className="block text-white mb-2 font-medium">
                          Image (Optional)
                        </label>
                        {editingBanner.imageUrl && (
                          <div className="mb-2">
                            <img
                              src={editingBanner.imageUrl}
                              alt="Preview"
                              className="max-h-48 rounded-lg"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setEditingBanner({
                                  ...editingBanner,
                                  imageUrl: undefined,
                                })
                              }
                              className="mt-2"
                            >
                              Remove Image
                            </Button>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await uploadImage(file);
                              if (url) {
                                setEditingBanner({
                                  ...editingBanner,
                                  imageUrl: url,
                                });
                              }
                            }
                          }}
                          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                          disabled={uploadingImage}
                        />
                        {uploadingImage && (
                          <p className="text-sm text-gray-400 mt-2">
                            Uploading...
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-white mb-2 font-medium">
                          Preview
                        </label>
                        <div className="p-4 bg-white/5 border border-white/20 rounded-lg prose prose-invert max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {editingBanner.content || '*No content yet*'}
                          </ReactMarkdown>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => saveBanner(editingBanner)}
                          disabled={
                            !editingBanner.title ||
                            !editingBanner.content ||
                            saving
                          }
                          className="flex-1 gap-2"
                        >
                          <Save className="w-4 h-4" />
                          {saving ? 'Saving...' : 'Save Banner'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingBanner(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {banners.map((banner) => (
                <Card
                  key={banner._id?.toString()}
                  className="p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <GripVertical className="w-5 h-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">
                        {banner.title}
                      </h4>
                      <div className="prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {banner.content.substring(0, 200) +
                            (banner.content.length > 200 ? "..." : "")}
                        </ReactMarkdown>
                      </div>
                      {banner.imageUrl && (
                        <p className="text-gray-400 text-xs mt-2">
                          📷 Has image
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingBanner(banner)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteBanner(banner._id!.toString())}
                        disabled={saving}
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {banners.length === 0 && !editingBanner && (
              <div className="text-center text-gray-400 py-12">
                <Megaphone className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No banners yet</p>
                <p className="text-sm">
                  Click the button above to add your first banner
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
