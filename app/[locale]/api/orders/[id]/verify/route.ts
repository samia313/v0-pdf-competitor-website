import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { action, notes, verifiedBy } = body

    const orderId = parseInt(params.id)
    if (isNaN(orderId)) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 })
    }

    if (action === 'verify') {
      const result = await db
        .update(orders)
        .set({
          paymentStatus: 'verified',
          verifiedAt: new Date(),
          verifiedBy,
          notes,
          updatedAt: new Date(),
        })
        .where(eq(orders.id, orderId))
        .returning()

      console.log('[v0] Order verified:', result)

      // TODO: Send confirmation email to customer
      // TODO: Activate subscription

      return NextResponse.json({ success: true, message: 'Order verified' })
    } else if (action === 'reject') {
      const result = await db
        .update(orders)
        .set({
          paymentStatus: 'rejected',
          notes,
          updatedAt: new Date(),
        })
        .where(eq(orders.id, orderId))
        .returning()

      console.log('[v0] Order rejected:', result)

      // TODO: Send rejection email to customer

      return NextResponse.json({ success: true, message: 'Order rejected' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('[v0] Order verification error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}
