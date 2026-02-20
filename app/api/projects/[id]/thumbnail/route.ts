import { NextRequest, NextResponse } from 'next/server'
import { downloadFile } from '@/lib/gridfs'
import { Types } from 'mongoose'

/**
 * GET /api/projects/[id]/thumbnail
 * Stream thumbnail from GridFS
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid file ID' },
        { status: 400 }
      )
    }

    const fileId = new Types.ObjectId(id)
    const { stream, file } = await downloadFile(fileId)

    // Convert Node stream to Web Stream
    const readableStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk: Buffer) => {
          controller.enqueue(new Uint8Array(chunk))
        })
        stream.on('end', () => {
          controller.close()
        })
        stream.on('error', (error) => {
          controller.error(error)
        })
      },
    })

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': file.contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error streaming thumbnail:', error)
    return NextResponse.json(
      { error: 'Failed to load thumbnail' },
      { status: 500 }
    )
  }
}
