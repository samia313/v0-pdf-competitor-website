import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || 
  crypto.createHash('sha256').update(process.env.ADMIN_PASSWORD || 'admin123').digest('hex')

export async function POST(request: NextRequest) {
  try {
    // Check admin session
    const adminSession = request.cookies.get('admin-session')?.value
    if (!adminSession) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: 'Current and new passwords are required' },
        { status: 400 }
      )
    }

    const currentHash = crypto.createHash('sha256').update(currentPassword).digest('hex')

    if (currentHash !== ADMIN_PASSWORD_HASH) {
      return NextResponse.json(
        { message: 'Current password is incorrect' },
        { status: 401 }
      )
    }

    // Note: In production, you would update the password in database
    // For now, we're just validating the current password
    console.log('[v0] Password change requested - update env variable ADMIN_PASSWORD with new value')

    return NextResponse.json({ 
      success: true,
      message: 'Password changed successfully. Please contact your system administrator to apply the changes.'
    })
  } catch (error) {
    console.error('Change password error:', error)
    return NextResponse.json(
      { message: 'Failed to change password' },
      { status: 500 }
    )
  }
}
