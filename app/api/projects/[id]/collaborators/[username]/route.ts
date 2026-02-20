import { NextRequest, NextResponse } from 'next/server'
import connectMongoose from '@/lib/mongoose'
import Project from '@/lib/models/Project'
import { requireOfficer } from '@/lib/auth-middleware'
import { Types } from 'mongoose'

/**
 * DELETE /api/projects/[id]/collaborators/[username]
 * Remove collaborator (officer only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; username: string } }
) {
  try {
    const authResult = await requireOfficer(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { discordId } = authResult

    await connectMongoose()

    const { id, username } = params

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
        { error: 'Not authorized to modify this project' },
        { status: 403 }
      )
    }

    const index = project.collaborators.indexOf(username)
    if (index === -1) {
      return NextResponse.json(
        { error: 'Collaborator not found' },
        { status: 404 }
      )
    }

    project.collaborators.splice(index, 1)
    await project.save()

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error removing collaborator:', error)
    return NextResponse.json(
      { error: 'Failed to remove collaborator' },
      { status: 500 }
    )
  }
}
