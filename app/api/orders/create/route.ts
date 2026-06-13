import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentMethod, productId, amount, customerEmail } = body

    if (!paymentMethod || !productId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`

    // Handle local payment methods
    if (['easypaisa', 'jazzcash', 'bank_transfer'].includes(paymentMethod)) {
      // Store order as pending payment
      const orderData = {
        orderId,
        paymentMethod,
        productId,
        amount,
        customerEmail,
        status: 'pending',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      }

      // In production, save to database
      console.log('[v0] Creating pending order:', orderData)

      // Send confirmation email
      if (customerEmail) {
        // Email service would go here
        console.log('[v0] Would send confirmation email to:', customerEmail)
      }

      return NextResponse.json({
        success: true,
        orderId,
        message: 'Payment request created. Please complete the transfer and we will verify it shortly.',
        paymentDetails: {
          method: paymentMethod,
          amount,
        },
      })
    }

    return NextResponse.json(
      { error: 'Invalid payment method' },
      { status: 400 }
    )
  } catch (error) {
    console.error('[v0] Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
