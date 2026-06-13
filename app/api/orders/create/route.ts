import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      planName,
      planId,
      amount,
      paymentMethod,
      paymentProof,
      customerEmail,
      customerPhone,
      customerName,
    } = body

    if (!planName || !amount || !paymentMethod || !paymentProof) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const orderId = `ORD-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`

    const result = await db.insert(orders).values({
      orderId,
      planName,
      planId,
      amount,
      currency: 'USD',
      paymentMethod,
      paymentProof,
      customerEmail,
      customerPhone,
      customerName,
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning()

    console.log('[v0] Order created:', result)

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to customer

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Payment request received. We will verify it within 24 hours.',
    })
  } catch (error) {
    console.error('[v0] Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
