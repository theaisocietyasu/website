import { ObjectId, type Db } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import type { RelinkBanner, RelinkLink } from '@/lib/types'

/** Image types Relink accepts for banner uploads. SVG is excluded because it can carry script. */
export const RELINK_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'] as const
export const RELINK_MAX_UPLOAD_BYTES = 5 * 1024 * 1024

const MAX_TITLE = 120
const MAX_DESCRIPTION = 280
const MAX_CONTENT = 5000

export const linksCollection = () => process.env.LINKS_COLLECTION_NAME || 'links'
export const bannersCollection = () => process.env.BANNERS_COLLECTION_NAME || 'banners'

export async function relinkDb(): Promise<Db> {
  const client = await clientPromise
  return client.db('Relink')
}

export function toObjectId(id: unknown): ObjectId | null {
  return typeof id === 'string' && ObjectId.isValid(id) ? new ObjectId(id) : null
}

function text(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed ? trimmed.slice(0, max) : undefined
}

function order(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.trunc(value) : 0
}

/** Only absolute http(s) URLs, so a stored link can never run script when clicked. */
function httpUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  try {
    const url = new URL(value.trim())
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : undefined
  } catch {
    return undefined
  }
}

/** Banner images are either our own uploads or an external https image. */
function imageUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value) return undefined
  if (/^\/api\/relink\/upload\/[a-f0-9]{24}$/.test(value)) return value
  const url = httpUrl(value)
  return url?.startsWith('https://') ? url : undefined
}

type Parsed<T> = { ok: true; value: T } | { ok: false; error: string }

export function parseLink(body: any): Parsed<Omit<RelinkLink, '_id' | 'createdAt' | 'updatedAt'>> {
  const title = text(body?.title, MAX_TITLE)
  const url = httpUrl(body?.url)
  if (!title) return { ok: false, error: 'Title is required' }
  if (!url) return { ok: false, error: 'URL must start with http:// or https://' }
  return {
    ok: true,
    value: { title, url, description: text(body?.description, MAX_DESCRIPTION), order: order(body?.order) },
  }
}

export function parseBanner(body: any): Parsed<Omit<RelinkBanner, '_id' | 'createdAt' | 'updatedAt'>> {
  const title = text(body?.title, MAX_TITLE)
  const content = text(body?.content, MAX_CONTENT)
  if (!title) return { ok: false, error: 'Title is required' }
  if (!content) return { ok: false, error: 'Content is required' }
  if (body?.imageUrl && !imageUrl(body.imageUrl)) return { ok: false, error: 'Image must be an upload or an https URL' }
  return { ok: true, value: { title, content, imageUrl: imageUrl(body?.imageUrl), order: order(body?.order) } }
}

function serialize<T extends { _id?: unknown }>(doc: T): T {
  return { ...doc, _id: String(doc._id) }
}

/** Public read used by the /relink page and the GET endpoints. */
export async function getRelinkContent(): Promise<{ links: RelinkLink[]; banners: RelinkBanner[] }> {
  const db = await relinkDb()
  const [links, banners] = await Promise.all([
    db.collection(linksCollection()).find({}).sort({ order: 1 }).toArray(),
    db.collection(bannersCollection()).find({}).sort({ order: 1 }).toArray(),
  ])
  return {
    links: links.map((d) => serialize(d as unknown as RelinkLink)),
    banners: banners.map((d) => serialize(d as unknown as RelinkBanner)),
  }
}
