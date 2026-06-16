import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/lib/i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function proxy(request: NextRequest) {
  // Apply i18n middleware first
  const intlResponse = intlMiddleware(request)

  // Check if it's an admin route that needs auth
  const pathname = request.nextUrl.pathname
  
  if (
    pathname.includes('/admin/login') ||
    pathname.includes('/api/admin/login')
  ) {
    return intlResponse
  }

  if (pathname.includes('/admin')) {
    const adminSession = request.cookies.get('admin-session')?.value

    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return intlResponse
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
}
