import { NextRequest, NextResponse } from 'next/server'
import connectMongoose from '@/lib/mongoose'
import Project from '@/lib/models/Project'
import { requireOfficer } from '@/lib/auth-middleware'
import { uploadFile } from '@/lib/gridfs'
import { ObjectId } from 'mongodb'
import { FILE_UPLOAD, PAGINATION } from '@/lib/config'

/**
 * GET /api/projects
 * Public endpoint with cursor-based pagination
 * Query params:
 *   - pageSize: number (default 12, max 100)
 *   - cursor: ISO date string
 *   - published: boolean (default true for public view)
 *   - search: string (text search)
 */
export async function GET(request: NextRequest) {
  try {
    await connectMongoose()

    const { searchParams } = new URL(request.url)
    const pageSizeParam = searchParams.get('pageSize')
    const cursor = searchParams.get('cursor')
    const publishedParam = searchParams.get('published')
    const search = searchParams.get('search')

    const pageSize = Math.min(
      parseInt(pageSizeParam || String(PAGINATION.DEFAULT_PAGE_SIZE), 10),
      PAGINATION.MAX_PAGE_SIZE
    )

    const query: Record<string, any> = {}

    // Filter by published status
    if (publishedParam !== null) {
      query.published = publishedParam === 'true'
    } else {
      // Default to published projects for public view
      query.published = true
    }

    // Cursor-based pagination
    if (cursor) {
      try {
        const cursorDate = new Date(cursor)
        query.created_at = { $lt: cursorDate }
      } catch (e) {
        return NextResponse.json(
          { error: 'Invalid cursor format' },
          { status: 400 }
        )
      }
    }

    // Text search
    if (search && search.trim()) {
      query.$text = { $search: search.trim() }
    }

    const projects = await Project.find(query)
      .sort({ created_at: -1 })
      .limit(pageSize + 1)
      .lean()
      .exec()

    const hasMore = projects.length > pageSize
    const data = hasMore ? projects.slice(0, pageSize) : projects

    const nextCursor =
      hasMore && data.length > 0
        ? data[data.length - 1].created_at.toISOString()
        : null

    return NextResponse.json({
      data,
      nextCursor,
      hasMore,
    })
  } catch (error) {
    // Error logged internally
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/projects
 * Create new project (officer only)
 * Accepts multipart/form-data with thumbnail
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireOfficer(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { discordId } = authResult

    await connectMongoose()

    const formData = await request.formData()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const github_url = formData.get('github_url') as string | null
    const live_url = formData.get('live_url') as string | null
    const collaboratorsStr = formData.get('collaborators') as string | null
    const thumbnail = formData.get('thumbnail') as File | null

    // Validation
    if (!title || title.length > FILE_UPLOAD.MAX_TITLE_LENGTH) {
      return NextResponse.json(
        { error: 'Title is required and must be max FILE_UPLOAD.MAX_TITLE_LENGTH characters' },
        { status: 400 }
      )
    }

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      )
    }

    let collaborators: string[] = []
    if (collaboratorsStr) {
      try {
        collaborators = JSON.parse(collaboratorsStr)
      } catch (e) {
        return NextResponse.json(
          { error: 'Invalid collaborators format' },
          { status: 400 }
        )
      }
    }

    // Handle thumbnail upload
    let thumbnail_file_id: ObjectId | undefined

    if (thumbnail && thumbnail.size > 0) {
      // Validate file type
      if (!FILE_UPLOAD.ALLOWED_IMAGE_TYPES.includes(thumbnail.type)) {
        return NextResponse.json(
          { error: 'Thumbnail must be jpg, jpeg, or png' },
          { status: 400 }
        )
      }

      // Validate file size
      if (thumbnail.size > FILE_UPLOAD.MAX_SIZE) {
        return NextResponse.json(
          { error: 'Thumbnail must be less than 5MB' },
          { status: 400 }
        )
      }

      const buffer = Buffer.from(await thumbnail.arrayBuffer())
      thumbnail_file_id = await uploadFile(buffer, {
        filename: thumbnail.name,
        contentType: thumbnail.type,
      })
    }

    // Create project
    const project = await Project.create({
      title,
      description,
      thumbnail_file_id,
      github_url: github_url || undefined,
      live_url: live_url || undefined,
      collaborators,
      published: false,
      owner_discord_id: discordId,
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    // Error logged internally
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
