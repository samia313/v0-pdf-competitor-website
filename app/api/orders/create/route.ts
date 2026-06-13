import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import crypto from 'crypto'
import Logger from '@/lib/logger'
import { handleApiError, ApiError, withRetry } from '@/lib/api-error-handler'
import { createRateLimitMiddleware } from '@/lib/rate-limiter'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitCheck = createRateLimitMiddleware(50, 60000)(request)
    if (rateLimitCheck) return rateLimitCheck

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

    Logger.debug('Order creation request', { planName, paymentMethod }, 'orders/create')

    if (!planName || !amount || !paymentMethod || !paymentProof) {
      throw new ApiError(400, 'Missing required fields', 'MISSING_FIELDS')
    }

    if (!customerEmail || !customerName) {
      throw new ApiError(400, 'Customer information required', 'MISSING_CUSTOMER')
    }

    const orderId = `ORD-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`

    // Retry logic for database operations
    const result = await withRetry(
      () =>
        db.insert(orders).values({
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
        }).returning(),
      3,
      500
    )

    Logger.info('Order created successfully', { orderId, customerEmail }, 'orders/create')

    // TODO: Send email notification to admin with order details
    // TODO: Send confirmation email to customer with verification instructions
    // TODO: Create audit log entry

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Payment request received. We will verify it within 24 hours.',
    })
  } catch (error) {
    Logger.error('Order creation failed', error, 'orders/create')
    return handleApiError(error)
  }
}
