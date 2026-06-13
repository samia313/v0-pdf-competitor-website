import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Admin credentials
    const ADMIN_USERNAME = 'naveed313'
    const ADMIN_PASSWORD = 'Samia@313'

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ 
      success: true, 
      message: 'Login successful' 
    })
    
    // Set admin session cookie
    response.cookies.set('admin-session', crypto.randomBytes(32).toString('hex'), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/admin',
    })

    console.log('[v0] Admin login successful for user:', username)
    return response
  } catch (error) {
    console.error('[v0] Admin login error:', error)
    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    )
  }
}
