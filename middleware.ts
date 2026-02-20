import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Check if the route is protected
  const isRelinkRoute = request.nextUrl.pathname.startsWith('/relink/edit')
  const isSoftwareCornerRoute = request.nextUrl.pathname.startsWith('/admin/software-corner')

  if (isRelinkRoute || isSoftwareCornerRoute) {
    // Check for valid session
    const session = await auth()

    if (!session) {
      // Redirect to appropriate sign-in page
      const signInUrl = isRelinkRoute ? '/relink/signin' : '/api/auth/signin'
      const callbackUrl = request.nextUrl.pathname
      return NextResponse.redirect(
        new URL(`${signInUrl}?callbackUrl=${encodeURIComponent(callbackUrl)}`, request.url)
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
