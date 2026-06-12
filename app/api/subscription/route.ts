import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // TODO: Implement proper session handling with Better Auth
    return NextResponse.json({ error: 'Not implemented yet' }, { status: 501 })
  } catch (error) {
    console.error('Failed to fetch subscription:', error)
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 })
  }
}
