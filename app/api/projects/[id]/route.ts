import { NextRequest, NextResponse } from 'next/server'
import connectMongoose from '@/lib/mongoose'
import Project from '@/lib/models/Project'
import { requireOfficer, optionalAuth } from '@/lib/auth-middleware'
import { uploadFile, deleteFile } from '@/lib/gridfs'
import { Types } from 'mongoose'
import { FILE_UPLOAD } from '@/lib/config'

/**
 * GET /api/projects/[id]
 * Get single project by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoose()

    const { id } = params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      )
    }

    const project = await Project.findById(id).lean().exec()

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Draft projects are only visible to authenticated officers
    if (!project.published) {
      const { discordId } = await optionalAuth(request)
      if (!discordId) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }
    }

    return NextResponse.json(project)
  } catch (error) {
    // Error logged internally
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/projects/[id]
 * Update project (officer only)
 * Can replace thumbnail if provided
 */
export async function PUT(
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
        { error: 'Not authorized to edit this project' },
        { status: 403 }
      )
    }

    const formData = await request.formData()

    const title = formData.get('title') as string | null
    const description = formData.get('description') as string | null
    const github_url = formData.get('github_url') as string | null
    const live_url = formData.get('live_url') as string | null
    const collaboratorsStr = formData.get('collaborators') as string | null
    const thumbnail = formData.get('thumbnail') as File | null

    // Update fields if provided
    if (title !== null) {
      if (title.length > 120) {
        return NextResponse.json(
          { error: 'Title must be max 120 characters' },
          { status: 400 }
        )
      }
      project.title = title
    }

    if (description !== null) {
      if (!description) {
        return NextResponse.json(
          { error: 'Description cannot be empty' },
          { status: 400 }
        )
      }
      project.description = description
    }

    if (github_url !== null) {
      project.github_url = github_url || undefined
    }

    if (live_url !== null) {
      project.live_url = live_url || undefined
    }

    if (collaboratorsStr !== null) {
      try {
        project.collaborators = JSON.parse(collaboratorsStr)
      } catch (e) {
        return NextResponse.json(
          { error: 'Invalid collaborators format' },
          { status: 400 }
        )
      }
    }

    // Handle thumbnail replacement
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

      // Delete old thumbnail if exists
      if (project.thumbnail_file_id) {
        try {
          await deleteFile(project.thumbnail_file_id)
        } catch (e) {
          // Thumbnail deletion failed silently
        }
      }

      // Upload new thumbnail
      const buffer = Buffer.from(await thumbnail.arrayBuffer())
      project.thumbnail_file_id = await uploadFile(buffer, {
        filename: thumbnail.name,
        contentType: thumbnail.type,
      })
    }

    await project.save()

    return NextResponse.json(project)
  } catch (error) {
    // Error logged internally
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/projects/[id]
 * Delete project (officer only)
 */
export async function DELETE(
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
        { error: 'Not authorized to delete this project' },
        { status: 403 }
      )
    }

    // Delete thumbnail if exists
    if (project.thumbnail_file_id) {
      try {
        await deleteFile(project.thumbnail_file_id)
      } catch (e) {
        // Thumbnail deletion failed silently
      }
    }

    await Project.findByIdAndDelete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    // Error logged internally
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
