'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'

export async function startCheckoutSession(productId: string) {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product "${productId}" not found`)
  }

  if (product.priceInCents === 0) {
    throw new Error('Cannot checkout free plan')
  }

  const isSubscription = product.period === 'month' || product.period === 'year'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pdfilio.com'

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'hosted',
    redirect_on_completion: 'always',
    success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pricing`,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${product.name} Plan`,
            description: product.description,
          },
          unit_amount: product.priceInCents,
          ...(isSubscription && {
            recurring: {
              interval: product.period as 'month' | 'year',
              interval_count: 1,
            },
          }),
        },
        quantity: 1,
      },
    ],
    mode: isSubscription ? 'subscription' : 'payment',
  })

  if (!session.url) {
    throw new Error('Failed to create checkout session')
  }

  return session.url
}

