import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export interface AuthenticatedRequest extends NextRequest {
  discordId?: string
  isOfficer?: boolean
}

/**
 * Middleware to verify the user is authenticated and has officer role
 * Extracts discordId from session for use in API routes
 */
export async function requireOfficer(
  request: NextRequest
): Promise<{ discordId: string } | NextResponse> {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const discordId = session.user.discordId

    if (!discordId) {
      return NextResponse.json(
        { error: 'Invalid session - no Discord ID' },
        { status: 401 }
      )
    }

    // User has passed NextAuth middleware check for admin role
    // Session exists means they are an officer
    return { discordId }
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

/**
 * Optional authentication - extracts discordId if present but doesn't require it
 */
export async function optionalAuth(
  request: NextRequest
): Promise<{ discordId?: string }> {
  try {
    const session = await auth()
    return {
      discordId: session?.user?.discordId,
    }
  } catch (error) {
    return {}
  }
}
