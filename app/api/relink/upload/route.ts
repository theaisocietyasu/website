import { NextRequest, NextResponse } from 'next/server'
import { GridFSBucket } from 'mongodb'
import { requireOfficer } from '@/lib/auth-middleware'
import { RELINK_IMAGE_TYPES, RELINK_MAX_UPLOAD_BYTES, relinkDb } from '@/lib/relink'

export async function POST(request: NextRequest) {
  const auth = await requireOfficer(request)
  if (auth instanceof NextResponse) return auth

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    if (!(RELINK_IMAGE_TYPES as readonly string[]).includes(file.type)) {
      return NextResponse.json({ error: 'Only PNG, JPEG, WebP or GIF images are allowed' }, { status: 415 })
    }
    if (file.size > RELINK_MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: 'Image must be 5 MB or smaller' }, { status: 413 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const bucket = new GridFSBucket(await relinkDb(), { bucketName: 'images' })
    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: { contentType: file.type, uploadedBy: auth.discordId },
    })

    await new Promise<void>((resolve, reject) => {
      uploadStream.once('finish', () => resolve())
      uploadStream.once('error', reject)
      uploadStream.end(buffer)
    })

    const id = uploadStream.id.toString()
    return NextResponse.json({ fileId: id, filename: file.name, url: `/api/relink/upload/${id}` }, { status: 201 })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
