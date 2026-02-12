import { NextRequest, NextResponse } from 'next/server'
import connectMongoose from '@/lib/mongoose'
import Project from '@/lib/models/Project'
import { requireOfficer } from '@/lib/auth-middleware'
import { PAGINATION } from '@/lib/config'

/**
 * GET /api/projects/mine
 * Private endpoint - returns only the authenticated user's projects
 * Query params:
 *   - pageSize: number (default 24, max 100)
 *   - cursor: ISO date string for cursor-based pagination
 *   - published: boolean (optional filter by published status)
 */
export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const authResult = await requireOfficer(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { discordId } = authResult

    await connectMongoose()

    const { searchParams } = new URL(request.url)
    const pageSizeParam = searchParams.get('pageSize')
    const cursor = searchParams.get('cursor')
    const publishedParam = searchParams.get('published')

    const pageSize = Math.min(
      parseInt(pageSizeParam || String(PAGINATION.ADMIN_PAGE_SIZE), 10),
      PAGINATION.MAX_PAGE_SIZE
    )

    const query: Record<string, any> = {
      owner_discord_id: discordId,
    }

    // Filter by published status if specified
    if (publishedParam !== null) {
      query.published = publishedParam === 'true'
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
