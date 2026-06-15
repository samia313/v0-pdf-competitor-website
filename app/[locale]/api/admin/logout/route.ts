import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  })

  // Clear admin session cookie
  response.cookies.delete('admin-session')

  console.log('[v0] Admin logged out')
  return response
}
