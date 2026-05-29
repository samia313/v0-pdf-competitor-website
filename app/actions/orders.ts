'use server'

import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { revalidatePath } from 'next/cache'

function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `PDF-${timestamp}-${random}`
}

export async function createOrder(data: {
  customerName: string
  customerEmail: string
  customerPhone: string
  planId: string
  planName: string
  amount: number
  paymentMethod: string
  userId?: string
}) {
  const orderId = generateOrderId()
  
  await db.insert(orders).values({
    orderId,
    userId: data.userId,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    customerPhone: data.customerPhone,
    planId: data.planId,
    planName: data.planName,
    amount: data.amount,
    currency: 'PKR',
    paymentMethod: data.paymentMethod,
    paymentStatus: 'pending',
  })
  
  return { orderId }
}

export async function uploadPaymentProof(orderId: string, proofUrl: string) {
  const { eq } = await import('drizzle-orm')
  
  await db.update(orders)
    .set({ 
      paymentProof: proofUrl,
      updatedAt: new Date()
    })
    .where(eq(orders.orderId, orderId))
  
  return { success: true }
}

export async function getOrderByOrderId(orderId: string) {
  const { eq } = await import('drizzle-orm')
  const result = await db.select().from(orders).where(eq(orders.orderId, orderId))
  return result[0] || null
}
