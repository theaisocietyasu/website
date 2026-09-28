import { NextRequest, NextResponse } from 'next/server'
import { GridFSBucket } from 'mongodb'
import { RELINK_IMAGE_TYPES, relinkDb, toObjectId } from '@/lib/relink'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = toObjectId((await params).id)
    if (!id) return NextResponse.json({ error: 'File not found' }, { status: 404 })

    const bucket = new GridFSBucket(await relinkDb(), { bucketName: 'images' })
    const [file] = await bucket.find({ _id: id }).toArray()
    if (!file) return NextResponse.json({ error: 'File not found' }, { status: 404 })

    const chunks: Buffer[] = []
    for await (const chunk of bucket.openDownloadStream(id)) chunks.push(chunk as Buffer)

    // Anything stored before uploads were restricted is served as a download, never rendered inline.
    const stored = (file.metadata as { contentType?: string } | undefined)?.contentType ?? ''
    const isImage = (RELINK_IMAGE_TYPES as readonly string[]).includes(stored)

    return new NextResponse(Buffer.concat(chunks), {
      headers: {
        'Content-Type': isImage ? stored : 'application/octet-stream',
        'Content-Disposition': isImage ? 'inline' : 'attachment',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; sandbox",
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error downloading file:', error)
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 })
  }
}
