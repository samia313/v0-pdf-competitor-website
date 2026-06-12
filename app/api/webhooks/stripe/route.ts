import Stripe from 'stripe'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature') || ''

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle subscription events
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (!userId) {
          console.error('No userId in subscription metadata')
          break
        }

        // Extract plan ID from price ID
        let planId = 'free'
        if (subscription.items.data[0]?.price?.id === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO) {
          planId = 'pro'
        } else if (subscription.items.data[0]?.price?.id === process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS) {
          planId = 'business'
        }

        // Update or create subscription in database
        await db.subscriptions.upsert({
          where: { userId },
          update: {
            planId,
            status: subscription.status === 'active' ? 'active' : 'inactive',
            stripeSubscriptionId: subscription.id,
            endDate: new Date(subscription.current_period_end * 1000),
          },
          create: {
            userId,
            planId,
            status: subscription.status === 'active' ? 'active' : 'inactive',
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            startDate: new Date(subscription.current_period_start * 1000),
            endDate: new Date(subscription.current_period_end * 1000),
          },
        })
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (!userId) break

        // Mark subscription as cancelled
        await db.subscriptions.updateMany({
          where: { userId },
          data: { status: 'cancelled' },
        })
        break
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        console.log('Invoice paid:', invoice.id)
        // You can track successful payments here
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        console.error('Invoice payment failed:', invoice.id)
        // You can send a notification to the user here
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
