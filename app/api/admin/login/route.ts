import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    // Default admin password - change this or use environment variable
    const ADMIN_PASSWORD = 'admin123'

    // Check password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true, message: 'Login successful' })
    
    // Set admin session cookie
    response.cookies.set('admin-session', crypto.randomBytes(32).toString('hex'), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/admin',
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    )
  }
}
