'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Lock, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Checkout from '@/components/checkout'
import { PRODUCTS, getMonthlyPrice } from '@/lib/products'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const planId = searchParams.get('plan')

  const product = PRODUCTS.find(p => p.id === planId)

  if (!product || product.priceInCents === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid Plan Selected</h1>
            <p className="text-muted-foreground mb-8">
              Please select a valid plan from our pricing page.
            </p>
            <Link href="/pricing">
              <Button>View Pricing Plans</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link href="/pricing" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pricing
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="order-2 lg:order-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Review your subscription details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plan Details */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{product.name} Plan</h3>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </div>
                      {product.popular && (
                        <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex justify-between text-sm">
                        <span>Billing Period</span>
                        <span className="font-medium capitalize">{product.period || 'One-time'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-medium mb-3">Included Features:</h4>
                    <ul className="space-y-2">
                      {product.features.slice(0, 5).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${(product.priceInCents / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span>${(product.priceInCents / 100).toFixed(2)} / {product.period}</span>
                    </div>
                    {product.period === 'year' && (
                      <p className="text-sm text-green-600 mt-2">
                        You save ${((getMonthlyPrice(PRODUCTS.find(p => p.id === 'premium-monthly')!) * 12 - product.priceInCents) / 100).toFixed(0)} compared to monthly billing!
                      </p>
                    )}
                  </div>

                  {/* Trust Badges */}
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span className="text-xs text-muted-foreground">Secure</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Lock className="w-5 h-5 text-green-600" />
                        <span className="text-xs text-muted-foreground">Encrypted</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        <span className="text-xs text-muted-foreground">Safe Payment</span>
                      </div>
                    </div>
                  </div>

                  {/* Guarantee */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                    <p className="text-sm text-green-700 dark:text-green-400">
                      <strong>7-Day Money-Back Guarantee</strong>
                      <br />
                      Not satisfied? Get a full refund within 7 days.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div className="order-1 lg:order-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Complete your purchase securely with Stripe</CardDescription>
                </CardHeader>
                <CardContent>
                  <Checkout productId={product.id} />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">Accepted Payment Methods</p>
            <div className="flex justify-center gap-4 items-center">
              <div className="bg-card border rounded px-3 py-2 text-sm font-medium">Visa</div>
              <div className="bg-card border rounded px-3 py-2 text-sm font-medium">Mastercard</div>
              <div className="bg-card border rounded px-3 py-2 text-sm font-medium">Amex</div>
              <div className="bg-card border rounded px-3 py-2 text-sm font-medium">PayPal</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
