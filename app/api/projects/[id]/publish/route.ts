import { NextRequest, NextResponse } from 'next/server'
import connectMongoose from '@/lib/mongoose'
import Project from '@/lib/models/Project'
import { requireOfficer } from '@/lib/auth-middleware'
import { Types } from 'mongoose'

/**
 * POST /api/projects/[id]/publish
 * Toggle publish status (officer only)
 * Body: { published: boolean }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireOfficer(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { discordId } = authResult

    await connectMongoose()

    const { id } = params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      )
    }

    const project = await Project.findById(id)

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Verify ownership
    if (project.owner_discord_id !== discordId) {
      return NextResponse.json(
        { error: 'Not authorized to publish this project' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { published } = body

    if (typeof published !== 'boolean') {
      return NextResponse.json(
        { error: 'Published status must be a boolean' },
        { status: 400 }
      )
    }

    project.published = published
    await project.save()

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error toggling publish status:', error)
    return NextResponse.json(
      { error: 'Failed to update publish status' },
      { status: 500 }
    )
  }
}
