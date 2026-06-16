'use server'

import { PKR_PRICES } from '@/lib/payment-config'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { PRODUCTS } from '@/lib/products'
import { sendOrderConfirmationEmail } from '@/lib/email'

// Manual Payment Order Creation
export async function createManualPaymentOrder(
  planId: string,
  paymentMethod: 'jazzcash' | 'easypaisa' | 'bank',
  customerInfo: {
    name: string
    email: string
    phone: string
  }
) {
  // Generate unique order ID
  const orderId = `ORBIX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
  
  const price = PKR_PRICES[planId as keyof typeof PKR_PRICES]
  const product = PRODUCTS.find(p => p.id === planId)
  
  if (!price || !product) {
    throw new Error('Invalid plan selected')
  }
  
  // Save to database
  await db.insert(orders).values({
    orderId,
    customerName: customerInfo.name,
    customerEmail: customerInfo.email,
    customerPhone: customerInfo.phone,
    planId,
    planName: product.name,
    amount: price,
    currency: 'PKR',
    paymentMethod,
    paymentStatus: 'pending',
  })
  
  // Send confirmation email (non-blocking)
  sendOrderConfirmationEmail({
    to: customerInfo.email,
    customerName: customerInfo.name,
    orderId,
    planName: product.name,
    amount: price,
    paymentMethod,
  }).catch(console.error)
  
  return {
    success: true,
    orderId,
    amount: price,
    paymentMethod,
    instructions: getPaymentInstructions(paymentMethod, price, orderId),
  }
}

function getPaymentInstructions(method: string, amount: number, orderId: string) {
  const instructions = {
    jazzcash: {
      title: 'JazzCash Payment Instructions',
      steps: [
        'Open JazzCash App on your phone',
        'Go to "Send Money" or "Mobile Account"',
        `Send PKR ${amount.toLocaleString()} to: 0303-9109260`,
        `In reference/message, write: ${orderId}`,
        'Take screenshot of payment confirmation',
        'Upload screenshot below or send to our WhatsApp',
      ],
      accountNumber: '0303-9109260',
      accountTitle: 'Naveed Ahmad Sharif',
    },
    easypaisa: {
      title: 'Easypaisa Payment Instructions',
      steps: [
        'Open Easypaisa App on your phone',
        'Go to "Send Money"',
        `Send PKR ${amount.toLocaleString()} to: 0345-0100172`,
        `In reference/message, write: ${orderId}`,
        'Take screenshot of payment confirmation',
        'Upload screenshot below or send to our WhatsApp',
      ],
      accountNumber: '0345-0100172',
      accountTitle: 'Naveed Ahmad Sharif',
    },
    bank: {
      title: 'Bank Transfer Instructions',
      steps: [
        'Login to your bank app or visit branch',
        `Transfer PKR ${amount.toLocaleString()} to the account below`,
        `In reference/narration, write: ${orderId}`,
        'Take screenshot of payment confirmation',
        'Upload screenshot below or email to support@orbixdocs.com',
      ],
      bankName: 'Faysal Bank',
      accountNumber: '3667786000002590',
      accountTitle: 'Naveed Ahmad Sharif',
      iban: 'PK83FAYS3667786000002590',
    },
  }
  
  return instructions[method as keyof typeof instructions]
}
