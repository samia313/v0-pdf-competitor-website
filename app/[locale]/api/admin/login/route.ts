import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Logger from '@/lib/logger'
import { handleApiError, ApiError } from '@/lib/api-error-handler'
import { createRateLimitMiddleware } from '@/lib/rate-limiter'

export async function POST(request: NextRequest) {
  try {
    // Aggressive rate limiting for login attempts (5 per minute)
    const rateLimitCheck = createRateLimitMiddleware(5, 60000)(request)
    if (rateLimitCheck) return rateLimitCheck

    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      throw new ApiError(400, 'Username and password required', 'MISSING_CREDENTIALS')
    }

    Logger.debug('Admin login attempt', { username }, 'admin/login')

    // Admin credentials
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'naveed313'
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Samia@313'

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      Logger.warn('Failed login attempt', { username }, 'admin/login')
      throw new ApiError(401, 'Invalid username or password', 'INVALID_CREDENTIALS')
    }

    const response = NextResponse.json({ 
      success: true, 
      message: 'Login successful' 
    })
    
    // Set secure admin session cookie
    response.cookies.set('admin-session', crypto.randomBytes(32).toString('hex'), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/admin',
    })

    Logger.info('Admin login successful', { username }, 'admin/login')
    return response
  } catch (error) {
    Logger.error('Admin login failed', error, 'admin/login')
    return handleApiError(error)
  }
}
