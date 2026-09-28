"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { ArrowDown, ArrowUp, ArrowUpRight, GripVertical, Pencil, Plus, Trash2, X } from "lucide-react"
import { RelinkMarkdown } from "@/components/site/relink/markdown"
import type { RelinkBanner, RelinkLink } from "@/lib/types"

type Tab = "links" | "banners"

const pad = (n: number) => String(n).padStart(2, "0")

async function request(url: string, init?: RequestInit) {
  const res = await fetch(url, init)
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error ?? `Request failed (${res.status})`)
  }
  return res.json()
}

const json = (method: string, body: unknown): RequestInit => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

export default function RelinkEditPage() {
  const router = useRouter()
  const { status } = useSession()
  const [tab, setTab] = useState<Tab>("links")
  const [links, setLinks] = useState<RelinkLink[]>([])
  const [banners, setBanners] = useState<RelinkBanner[]>([])
  const [loaded, setLoaded] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingLink, setEditingLink] = useState<RelinkLink | null>(null)
  const [editingBanner, setEditingBanner] = useState<RelinkBanner | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const refresh = useCallback(async () => {
    try {
      const [l, b] = await Promise.all([request("/api/relink/links"), request("/api/relink/banners")])
      setLinks(l)
      setBanners(b)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/relink/signin")
    if (status === "authenticated") refresh()
  }, [status, router, refresh])

  async function run(action: () => Promise<unknown>) {
    setBusy(true)
    setError(null)
    try {
      await action()
      await refresh()
      return true
    } catch (e) {
      setError((e as Error).message)
      return false
    } finally {
      setBusy(false)
    }
  }

  async function saveLink(link: RelinkLink) {
    const ok = await run(() => request("/api/relink/links", json(link._id ? "PUT" : "POST", link)))
    if (ok) setEditingLink(null)
  }

  async function saveBanner(banner: RelinkBanner) {
    const ok = await run(() => request("/api/relink/banners", json(banner._id ? "PUT" : "POST", banner)))
    if (ok) setEditingBanner(null)
  }

  async function remove(kind: Tab, id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return
    await run(() => request(`/api/relink/${kind}?id=${id}`, { method: "DELETE" }))
  }

  /** Moves one item and saves only the entries whose position changed. */
  async function move(kind: Tab, items: (RelinkLink | RelinkBanner)[], from: number, to: number) {
    if (to < 0 || to >= items.length || from === to) return
    const next = [...items]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    const changed = next.map((item, order) => ({ ...item, order })).filter((item, i) => items[i]?._id !== item._id)
    if (kind === "links") setLinks(next as RelinkLink[])
    else setBanners(next as RelinkBanner[])
    await run(() => Promise.all(changed.map((item) => request(`/api/relink/${kind}`, json("PUT", item)))))
  }

  if (status !== "authenticated" || !loaded) {
    return (
      <div className="wrap py-32 text-center">
        <p className="label">
          loading<span className="cursor ml-1" />
        </p>
      </div>
    )
  }

  const items: (RelinkLink | RelinkBanner)[] = tab === "links" ? links : banners

  return (
    <>
      <header className="sky">
        <div className="wrap pb-12 pt-16 md:pb-16 md:pt-20">
          <p className="label !text-ink/70">[relink] officer editor</p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-paper-warm [text-shadow:0_1px_24px_var(--glow)]">
            Relink
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/relink" target="_blank" className="btn bg-paper-warm/40">
              View live page <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
            <button type="button" className="btn bg-paper-warm/40" onClick={() => signOut({ callbackUrl: "/relink" })}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="wrap max-w-4xl pt-12">
        <div role="tablist" aria-label="Relink content" className="flex flex-wrap items-center gap-2">
          {(["links", "banners"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`${tab === t ? "btn-solid" : "btn"} !px-3.5 !py-1.5 !text-[11px]`}
            >
              {t} ({pad(t === "links" ? links.length : banners.length)})
            </button>
          ))}
          <button
            type="button"
            className="btn ml-auto !px-3.5 !py-1.5 !text-[11px]"
            disabled={busy || !!editingLink || !!editingBanner}
            onClick={() =>
              tab === "links"
                ? setEditingLink({ title: "", url: "", description: "", order: links.length })
                : setEditingBanner({ title: "", content: "", order: banners.length })
            }
          >
            <Plus aria-hidden="true" className="h-3.5 w-3.5" /> New {tab === "links" ? "link" : "banner"}
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-6 flex items-start justify-between gap-4 border border-signal bg-signal-soft/40 px-3 py-2.5 text-sm">
            {error}
            <button type="button" aria-label="Dismiss" onClick={() => setError(null)}>
              <X className="h-4 w-4" />
            </button>
          </p>
        )}

        {tab === "links" && editingLink && (
          <LinkForm link={editingLink} busy={busy} onChange={setEditingLink} onSave={saveLink} onCancel={() => setEditingLink(null)} />
        )}
        {tab === "banners" && editingBanner && (
          <BannerForm
            banner={editingBanner}
            busy={busy}
            onChange={setEditingBanner}
            onSave={saveBanner}
            onCancel={() => setEditingBanner(null)}
            onError={setError}
          />
        )}

        {items.length === 0 ? (
          <div className="dither mt-8 border border-dashed border-ink/40 px-6 py-16 text-center">
            <p className="label">no {tab} yet</p>
          </div>
        ) : (
          <ul className="mt-8 border-t border-ink">
            {items.map((item, i) => (
              <li
                key={item._id}
                draggable={!busy}
                onDragStart={() => setDragIndex(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  if (dragIndex !== null) move(tab, items, dragIndex, i)
                  setDragIndex(null)
                }}
                onDragEnd={() => setDragIndex(null)}
                className={`grid grid-cols-[2rem_1fr] items-start gap-x-3 gap-y-2 md:grid-cols-[auto_2rem_1fr_auto] border-b border-ink py-5 transition-opacity ${
                  dragIndex === i ? "opacity-40" : ""
                }`}
              >
                <GripVertical aria-hidden="true" className="mt-1 hidden h-4 w-4 cursor-grab text-ink-mute md:block" />
                <span className="label mt-1 text-signal">{pad(i + 1)}</span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold leading-tight tracking-[-0.02em]">{item.title}</p>
                  {"url" in item ? (
                    <>
                      <p className="mt-1 truncate font-mono text-xs text-ink-mute">{item.url}</p>
                      {item.description && <p className="mt-1 text-sm text-ink-soft">{item.description}</p>}
                    </>
                  ) : (
                    <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                      {item.imageUrl ? "[image] " : ""}
                      {item.content}
                    </p>
                  )}
                </div>
                <div className="col-start-2 -ml-2 flex items-center gap-1 md:col-start-auto md:ml-0">
                  <IconButton label="Move up" disabled={busy || i === 0} onClick={() => move(tab, items, i, i - 1)}>
                    <ArrowUp className="h-4 w-4" />
                  </IconButton>
                  <IconButton label="Move down" disabled={busy || i === items.length - 1} onClick={() => move(tab, items, i, i + 1)}>
                    <ArrowDown className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    label="Edit"
                    disabled={busy}
                    onClick={() => ("url" in item ? setEditingLink(item) : setEditingBanner(item as RelinkBanner))}
                  >
                    <Pencil className="h-4 w-4" />
                  </IconButton>
                  <IconButton label="Delete" disabled={busy} onClick={() => remove(tab, item._id!, item.title)} danger>
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

function IconButton({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  danger?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`grid h-8 w-8 place-items-center border border-transparent transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-transparent ${
        danger ? "hover:text-signal" : ""
      }`}
    >
      {children}
    </button>
  )
}

function FormWindow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="window mt-8">
      <div className="window-bar">
        <span className="window-title">{title}</span>
      </div>
      <div className="space-y-5 p-5 md:p-6">{children}</div>
    </section>
  )
}

function FormActions({ busy, canSave, onSave, onCancel }: { busy: boolean; canSave: boolean; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="flex gap-3 pt-1">
      <button type="button" className="btn-solid" disabled={busy || !canSave} onClick={onSave}>
        {busy ? "Saving..." : "Save"}
      </button>
      <button type="button" className="btn" onClick={onCancel}>
        Cancel
      </button>
    </div>
  )
}

function LinkForm({
  link,
  busy,
  onChange,
  onSave,
  onCancel,
}: {
  link: RelinkLink
  busy: boolean
  onChange: (l: RelinkLink) => void
  onSave: (l: RelinkLink) => void
  onCancel: () => void
}) {
  return (
    <FormWindow title={link._id ? "edit_link" : "new_link"}>
      <label className="block">
        <span className="field-label">Title</span>
        <input className="field" value={link.title} maxLength={120} placeholder="Join our Discord" onChange={(e) => onChange({ ...link, title: e.target.value })} />
      </label>
      <label className="block">
        <span className="field-label">URL</span>
        <input className="field font-mono !text-sm" type="url" value={link.url} placeholder="https://" onChange={(e) => onChange({ ...link, url: e.target.value })} />
      </label>
      <label className="block">
        <span className="field-label">Description (optional)</span>
        <input
          className="field"
          value={link.description ?? ""}
          maxLength={280}
          onChange={(e) => onChange({ ...link, description: e.target.value })}
        />
      </label>
      <FormActions busy={busy} canSave={!!link.title.trim() && !!link.url.trim()} onSave={() => onSave(link)} onCancel={onCancel} />
    </FormWindow>
  )
}

function BannerForm({
  banner,
  busy,
  onChange,
  onSave,
  onCancel,
  onError,
}: {
  banner: RelinkBanner
  busy: boolean
  onChange: (b: RelinkBanner) => void
  onSave: (b: RelinkBanner) => void
  onCancel: () => void
  onError: (message: string) => void
}) {
  const [uploading, setUploading] = useState(false)

  async function upload(file: File) {
    setUploading(true)
    try {
      const form = new FormData()
      form.append("file", file)
      const { url } = await request("/api/relink/upload", { method: "POST", body: form })
      onChange({ ...banner, imageUrl: url })
    } catch (e) {
      onError((e as Error).message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <FormWindow title={banner._id ? "edit_banner" : "new_banner"}>
      <label className="block">
        <span className="field-label">Title</span>
        <input className="field" value={banner.title} maxLength={120} onChange={(e) => onChange({ ...banner, title: e.target.value })} />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="field-label">Content (markdown)</span>
          <textarea
            className="field min-h-[220px] font-mono !text-[13px]"
            value={banner.content}
            maxLength={5000}
            placeholder="**Bold**, *italic*, [links](https://...)"
            onChange={(e) => onChange({ ...banner, content: e.target.value })}
          />
        </label>
        <div>
          <span className="field-label">Preview</span>
          <div className="min-h-[220px] border border-dashed border-ink/40 bg-paper p-4">
            <RelinkMarkdown>{banner.content || "*Nothing yet*"}</RelinkMarkdown>
          </div>
        </div>
      </div>

      <div>
        <span className="field-label">Image (optional, PNG/JPEG/WebP/GIF, 5 MB max)</span>
        {banner.imageUrl && (
          <div className="mb-3 flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner.imageUrl} alt="" className="max-h-40 border border-ink" />
            <button type="button" className="btn !px-3 !py-1.5" onClick={() => onChange({ ...banner, imageUrl: undefined })}>
              Remove
            </button>
          </div>
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          disabled={uploading}
          className="block w-full font-mono text-xs file:mr-4 file:cursor-pointer file:rounded-full file:border file:border-ink file:bg-paper-warm file:px-4 file:py-2 file:font-mono file:text-xs file:uppercase file:tracking-[0.12em] hover:file:bg-ink hover:file:text-paper"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) upload(file)
            e.target.value = ""
          }}
        />
        {uploading && <p className="label mt-2">uploading...</p>}
      </div>

      <FormActions
        busy={busy || uploading}
        canSave={!!banner.title.trim() && !!banner.content.trim()}
        onSave={() => onSave(banner)}
        onCancel={onCancel}
      />
    </FormWindow>
  )
}
