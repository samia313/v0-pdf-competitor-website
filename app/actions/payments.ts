'use server'

import { PKR_PRICES } from '@/lib/payment-config'

// LemonSqueezy Checkout URL Generator
export async function createLemonSqueezyCheckout(planId: string, email?: string) {
  const storeId = process.env.LEMONSQUEEZY_STORE_ID
  const variantId = process.env[`LEMONSQUEEZY_${planId.toUpperCase().replace('-', '_')}_VARIANT_ID`]
  
  if (!storeId || !variantId) {
    throw new Error('LemonSqueezy configuration missing')
  }
  
  // Build checkout URL
  let checkoutUrl = `https://${storeId}.lemonsqueezy.com/checkout/buy/${variantId}`
  
  if (email) {
    checkoutUrl += `?checkout[email]=${encodeURIComponent(email)}`
  }
  
  return { url: checkoutUrl }
}

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
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  
  const price = PKR_PRICES[planId as keyof typeof PKR_PRICES]
  
  // In production, save this to database
  const order = {
    orderId,
    planId,
    paymentMethod,
    amount: price,
    currency: 'PKR',
    status: 'pending',
    customerInfo,
    createdAt: new Date().toISOString(),
  }
  
  // Here you would save to database
  // await db.orders.create(order)
  
  console.log('Manual payment order created:', order)
  
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
        `Send PKR ${amount.toLocaleString()} to: 03XXXXXXXXX`,
        `In reference/message, write: ${orderId}`,
        'Take screenshot of payment confirmation',
        'Upload screenshot below or send to our WhatsApp',
      ],
      accountNumber: '03XXXXXXXXX',
      accountTitle: 'PDFMaster',
    },
    easypaisa: {
      title: 'Easypaisa Payment Instructions',
      steps: [
        'Open Easypaisa App on your phone',
        'Go to "Send Money"',
        `Send PKR ${amount.toLocaleString()} to: 03XXXXXXXXX`,
        `In reference/message, write: ${orderId}`,
        'Take screenshot of payment confirmation',
        'Upload screenshot below or send to our WhatsApp',
      ],
      accountNumber: '03XXXXXXXXX',
      accountTitle: 'PDFMaster',
    },
    bank: {
      title: 'Bank Transfer Instructions',
      steps: [
        'Login to your bank app or visit branch',
        `Transfer PKR ${amount.toLocaleString()} to the account below`,
        `In reference/narration, write: ${orderId}`,
        'Take screenshot of payment confirmation',
        'Upload screenshot below or email to support@pdfmaster.com',
      ],
      bankName: 'Meezan Bank', // Change to your bank
      accountNumber: '0000-0000000000',
      accountTitle: 'PDFMaster',
      iban: 'PK00MEZN0000000000000000',
    },
  }
  
  return instructions[method as keyof typeof instructions]
}

// Verify payment (admin use)
export async function verifyManualPayment(orderId: string) {
  // In production, update database
  // await db.orders.update({ orderId }, { status: 'completed' })
  
  return { success: true, message: 'Payment verified successfully' }
}
