import { MongoClient, GridFSBucket, ObjectId } from 'mongodb'
import { Readable } from 'stream'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local')
}

const MONGODB_URI: string = process.env.MONGODB_URI

interface GridFSCache {
  client: MongoClient | null
  bucket: GridFSBucket | null
  promise: Promise<MongoClient> | null
}

declare global {
  var gridfs: GridFSCache | undefined
}

let cached: GridFSCache = global.gridfs || {
  client: null,
  bucket: null,
  promise: null,
}

if (!global.gridfs) {
  global.gridfs = cached
}

async function getGridFSBucket(): Promise<{
  client: MongoClient
  bucket: GridFSBucket
}> {
  if (cached.client && cached.bucket) {
    return { client: cached.client, bucket: cached.bucket }
  }

  if (!cached.promise) {
    const { DATABASE } = await import('@/lib/config')
    cached.promise = MongoClient.connect(MONGODB_URI, {
      maxPoolSize: DATABASE.MAX_POOL_SIZE,
      serverSelectionTimeoutMS: DATABASE.SERVER_SELECTION_TIMEOUT,
      socketTimeoutMS: DATABASE.SOCKET_TIMEOUT,
    })
  }

  try {
    cached.client = await cached.promise
    const db = cached.client.db()
    const { DATABASE } = await import('@/lib/config')
    cached.bucket = new GridFSBucket(db, {
      bucketName: DATABASE.GRIDFS_BUCKET_NAME,
    })
  } catch (e) {
    cached.promise = null
    throw e
  }

  return { client: cached.client, bucket: cached.bucket }
}

export interface UploadFileOptions {
  filename: string
  contentType: string
}

export async function uploadFile(
  fileBuffer: Buffer,
  options: UploadFileOptions
): Promise<ObjectId> {
  const { bucket } = await getGridFSBucket()

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(options.filename, {
      contentType: options.contentType,
    })

    const readableStream = Readable.from(fileBuffer)

    readableStream.pipe(uploadStream)

    uploadStream.on('error', reject)
    uploadStream.on('finish', () => {
      resolve(uploadStream.id as ObjectId)
    })
  })
}

export async function uploadFileStream(
  fileStream: Readable,
  options: UploadFileOptions
): Promise<ObjectId> {
  const { bucket } = await getGridFSBucket()

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(options.filename, {
      contentType: options.contentType,
    })

    fileStream.pipe(uploadStream)

    uploadStream.on('error', reject)
    uploadStream.on('finish', () => {
      resolve(uploadStream.id as ObjectId)
    })
  })
}

export async function downloadFile(fileId: ObjectId): Promise<{
  stream: NodeJS.ReadableStream
  file: { filename: string; contentType?: string }
}> {
  const { bucket } = await getGridFSBucket()

  const files = await bucket.find({ _id: fileId }).toArray()

  if (!files || files.length === 0) {
    throw new Error('File not found')
  }

  const file = files[0]
  const downloadStream = bucket.openDownloadStream(fileId)

  return {
    stream: downloadStream,
    file: {
      filename: file.filename,
      contentType: file.contentType,
    },
  }
}

export async function deleteFile(fileId: ObjectId): Promise<void> {
  const { bucket } = await getGridFSBucket()

  try {
    await bucket.delete(fileId)
  } catch (error) {
    throw new Error('Failed to delete file')
  }
}

export async function fileExists(fileId: ObjectId): Promise<boolean> {
  const { bucket } = await getGridFSBucket()

  const files = await bucket.find({ _id: fileId }).toArray()
  return files && files.length > 0
}

export default getGridFSBucket
