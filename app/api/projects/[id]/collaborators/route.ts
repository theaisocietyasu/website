import { NextRequest, NextResponse } from 'next/server'
import connectMongoose from '@/lib/mongoose'
import Project from '@/lib/models/Project'
import { requireOfficer } from '@/lib/auth-middleware'
import { Types } from 'mongoose'

/**
 * POST /api/projects/[id]/collaborators
 * Add collaborator (officer only)
 * Body: { username: string }
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
        { error: 'Not authorized to modify this project' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { username } = body

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'GitHub username is required' },
        { status: 400 }
      )
    }

    // Validate GitHub username format (alphanumeric, hyphens, max 39 chars)
    const githubUsernameRegex = /^[a-zA-Z0-9-]{1,39}$/
    if (!githubUsernameRegex.test(username)) {
      return NextResponse.json(
        { error: 'Invalid GitHub username format' },
        { status: 400 }
      )
    }

    // Check if already exists
    if (project.collaborators.includes(username)) {
      return NextResponse.json(
        { error: 'Collaborator already added' },
        { status: 400 }
      )
    }

    project.collaborators.push(username)
    await project.save()

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error adding collaborator:', error)
    return NextResponse.json(
      { error: 'Failed to add collaborator' },
      { status: 500 }
    )
  }
}
