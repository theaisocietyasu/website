import { NextRequest, NextResponse } from 'next/server'
import { requireOfficer } from '@/lib/auth-middleware'
import { relinkDb, toObjectId } from '@/lib/relink'

type Parser = (body: unknown) => { ok: true; value: Record<string, unknown> } | { ok: false; error: string }

/**
 * CRUD handlers for one Relink collection. Reads are public; every write requires an officer session.
 */
export function relinkCollectionRoutes(collection: () => string, parse: Parser, noun: string) {
  async function GET() {
    try {
      const db = await relinkDb()
      const docs = await db.collection(collection()).find({}).sort({ order: 1 }).toArray()
      return NextResponse.json(docs)
    } catch (error) {
      console.error(`Error fetching ${noun}s:`, error)
      return NextResponse.json({ error: `Failed to fetch ${noun}s` }, { status: 500 })
    }
  }

  async function POST(request: NextRequest) {
    const auth = await requireOfficer(request)
    if (auth instanceof NextResponse) return auth

    try {
      const parsed = parse(await request.json().catch(() => null))
      if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 })

      const now = new Date()
      const doc = { ...parsed.value, createdAt: now, updatedAt: now }
      const db = await relinkDb()
      const result = await db.collection(collection()).insertOne(doc)
      return NextResponse.json({ ...doc, _id: result.insertedId }, { status: 201 })
    } catch (error) {
      console.error(`Error creating ${noun}:`, error)
      return NextResponse.json({ error: `Failed to create ${noun}` }, { status: 500 })
    }
  }

  async function PUT(request: NextRequest) {
    const auth = await requireOfficer(request)
    if (auth instanceof NextResponse) return auth

    try {
      const body = await request.json().catch(() => null)
      const id = toObjectId(body?._id)
      if (!id) return NextResponse.json({ error: `A valid ${noun} ID is required` }, { status: 400 })

      const parsed = parse(body)
      if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 })

      const db = await relinkDb()
      const update: Record<string, unknown> = { $set: { ...parsed.value, updatedAt: new Date() } }
      // Optional fields cleared in the editor are removed rather than left stale.
      const cleared = Object.entries(parsed.value).filter(([, v]) => v === undefined).map(([k]) => k)
      if (cleared.length) {
        const set = update.$set as Record<string, unknown>
        cleared.forEach((k) => delete set[k])
        update.$unset = Object.fromEntries(cleared.map((k) => [k, '']))
      }
      const result = await db.collection(collection()).updateOne({ _id: id }, update)
      if (result.matchedCount === 0) return NextResponse.json({ error: `${noun} not found` }, { status: 404 })

      return NextResponse.json({ _id: id.toString(), ...parsed.value })
    } catch (error) {
      console.error(`Error updating ${noun}:`, error)
      return NextResponse.json({ error: `Failed to update ${noun}` }, { status: 500 })
    }
  }

  async function DELETE(request: NextRequest) {
    const auth = await requireOfficer(request)
    if (auth instanceof NextResponse) return auth

    try {
      const id = toObjectId(request.nextUrl.searchParams.get('id'))
      if (!id) return NextResponse.json({ error: `A valid ${noun} ID is required` }, { status: 400 })

      const db = await relinkDb()
      const result = await db.collection(collection()).deleteOne({ _id: id })
      if (result.deletedCount === 0) return NextResponse.json({ error: `${noun} not found` }, { status: 404 })

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error(`Error deleting ${noun}:`, error)
      return NextResponse.json({ error: `Failed to delete ${noun}` }, { status: 500 })
    }
  }

  return { GET, POST, PUT, DELETE }
}
