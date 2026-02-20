import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the route is protected
  const isRelinkRoute = request.nextUrl.pathname.startsWith('/relink/edit')
  const isSoftwareCornerRoute = request.nextUrl.pathname.startsWith('/admin/software-corner')

  if (isRelinkRoute || isSoftwareCornerRoute) {
    // Check for session token in cookies (more reliable than calling auth() in middleware)
    const sessionToken =
      request.cookies.get('authjs.session-token')?.value ||
      request.cookies.get('__Secure-authjs.session-token')?.value

    if (!sessionToken) {
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
