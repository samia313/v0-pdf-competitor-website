import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    // Check admin session
    const adminSession = request.cookies.get('admin-session')?.value
    if (!adminSession) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const db = pool

    const contacts = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt))

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Admin contacts error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check admin session
    const adminSession = request.cookies.get('admin-session')?.value
    if (!adminSession) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const id = parseInt(url.pathname.split('/').pop() || '0')

    if (!id) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const db = pool

    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin delete contact error:', error)
    return NextResponse.json(
      { message: 'Failed to delete contact' },
      { status: 500 }
    )
  }
}
