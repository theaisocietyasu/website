import { NextRequest, NextResponse } from 'next/server'
import { auth, verifyDiscordAdminRole } from '@/lib/auth'

export interface AuthenticatedRequest extends NextRequest {
  discordId?: string
  isOfficer?: boolean
}

// Short per-instance cache so bursts of writes (e.g. reordering) do not each hit the Discord API.
const ROLE_CACHE_MS = 60_000
const roleCache = new Map<string, number>()

async function hasOfficerRole(discordId: string): Promise<boolean> {
  const verifiedUntil = roleCache.get(discordId)
  if (verifiedUntil && verifiedUntil > Date.now()) return true
  const ok = await verifyDiscordAdminRole(discordId)
  if (ok) roleCache.set(discordId, Date.now() + ROLE_CACHE_MS)
  else roleCache.delete(discordId)
  return ok
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

    // Sessions last days; re-check the role so a removed officer loses write access within a minute.
    if (!(await hasOfficerRole(discordId))) {
      return NextResponse.json({ error: 'Officer role required' }, { status: 403 })
    }

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
