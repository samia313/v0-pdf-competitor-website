import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // TODO: Implement Stripe webhook handling
    return NextResponse.json({ error: 'Not implemented yet' }, { status: 501 })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
