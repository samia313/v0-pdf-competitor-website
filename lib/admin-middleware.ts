import { NextRequest, NextResponse } from 'next/server'

export function adminMiddleware(request: NextRequest) {
  const adminSession = request.cookies.get('admin-session')?.value

  // Allow login page
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Redirect to login if not authenticated
  if (!adminSession) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}
