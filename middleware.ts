import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip auth check for login page and login API
  if (
    request.nextUrl.pathname === '/admin/login' ||
    request.nextUrl.pathname === '/api/admin/login'
  ) {
    return NextResponse.next()
  }

  // Check for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('admin-session')?.value

    // If no session cookie, redirect to login
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
