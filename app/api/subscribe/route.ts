import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
})

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planId } = await request.json()

    if (!planId || !['pro', 'business'].includes(planId)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Get or create Stripe customer
    let customer = await stripe.customers.search({
      query: `email:"${session.user.email}"`,
      limit: 1,
    })

    let customerId: string
    if (customer.data.length > 0) {
      customerId = customer.data[0].id
    } else {
      const newCustomer = await stripe.customers.create({
        email: session.user.email || '',
        name: session.user.name || '',
      })
      customerId = newCustomer.id
    }

    // Get price ID from environment or create one
    const priceId =
      planId === 'pro'
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS

    if (!priceId) {
      return NextResponse.json(
        { error: 'Pricing not configured. Please configure Stripe prices in environment variables.' },
        { status: 500 }
      )
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        userId: session.user.id,
        planId,
      },
    })

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
