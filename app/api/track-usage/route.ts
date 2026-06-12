import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const session = await getSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { toolName, fileSize } = await request.json()

    // Track the usage
    await db.usage_tracking.create({
      data: {
        userId: session.user.id,
        toolUsed: toolName,
        fileSize: fileSize || 0,
        ipAddress: request.headers.get('x-forwarded-for') || '',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to track usage:', error)
    return NextResponse.json({ error: 'Failed to track usage' }, { status: 500 })
  }
}
