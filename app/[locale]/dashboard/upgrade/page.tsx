'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, Zap, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PRODUCTS } from '@/lib/products'

function UpgradePageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const plan = searchParams.get('plan') || 'premium-monthly'
  const currentPlan = PRODUCTS.find((p) => p.id === plan)

  if (!currentPlan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Invalid Plan Selected</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              The plan you selected is not available.
            </p>
            <Link href="/pricing" className="block">
              <Button className="w-full">Back to Pricing</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const price = (currentPlan.priceInCents / 100).toFixed(2)
  const period = currentPlan.period === 'year' ? 'year' : 'month'
  const periodLabel = period === 'year' ? 'per year' : 'per month'

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Plan Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{currentPlan.name}</CardTitle>
                    <p className="text-muted-foreground">{currentPlan.description}</p>
                  </div>
                  {currentPlan.popular && (
                    <Badge className="bg-orange-500 text-white">Most Popular</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-8 pt-6">
                {/* Price Section */}
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">Billing Amount</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">${price}</span>
                    <span className="text-lg text-muted-foreground">{periodLabel}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Billed every {period}. Cancel anytime.</p>
                </div>

                {/* Features List */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Includes:
                  </h3>
                  <ul className="space-y-3">
                    {currentPlan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security Info */}
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-900 space-y-2">
                  <p className="font-semibold text-sm text-blue-900 dark:text-blue-400">Secure Payment</p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    All transactions are processed securely through Stripe. Your card data is never stored on our servers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-semibold">{currentPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-semibold">${price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billing</span>
                    <span className="font-semibold capitalize">{period}ly</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total Due Today</span>
                    <span className="text-lg">${price}</span>
                  </div>
                </div>

                <Link href={`/checkout?product=${plan}`} className="block">
                  <Button size="lg" className="w-full">
                    Continue to Payment
                  </Button>
                </Link>

                <p className="text-xs text-center text-muted-foreground">
                  By continuing, you agree to our Terms of Service
                </p>

                <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 border border-green-200 dark:border-green-900 text-center">
                  <p className="text-xs font-semibold text-green-700 dark:text-green-400">
                    7-Day Money-Back Guarantee
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-4 text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-1">Can I change my plan later?</p>
              <p>Yes, you can upgrade or downgrade anytime from your dashboard.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">How do I cancel?</p>
              <p>Cancel anytime from your account settings. With our 7-day money-back guarantee, your first payment is fully refundable.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">What payment methods do you accept?</p>
              <p>We accept all major credit cards, PayPal, and other payment methods through Stripe.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function UpgradePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <UpgradePageContent />
    </Suspense>
  )
}
