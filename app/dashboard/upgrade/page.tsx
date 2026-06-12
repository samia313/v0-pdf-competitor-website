'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import { SUBSCRIPTION_PLANS, getMonthlyPrice } from '@/lib/subscription-plans'

export default function UpgradePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const plan = searchParams.get('plan') || 'pro'
  const currentPlan = SUBSCRIPTION_PLANS.find((p) => p.id === plan)

  if (!currentPlan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Invalid Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/pricing')}>Back to Pricing</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleUpgrade = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: plan }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to start checkout')
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{currentPlan.name} Plan</CardTitle>
            <CardDescription>Upgrade your PDFilio account today</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Price */}
            <div className="text-center py-6 border-b">
              <div className="text-5xl font-bold mb-2">${getMonthlyPrice(currentPlan.priceInCents)}</div>
              <p className="text-muted-foreground">/month, billed monthly</p>
              <p className="text-sm text-muted-foreground mt-2">Cancel anytime, no questions asked</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-4">Plan Features</h3>
              <ul className="space-y-3">
                {currentPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">Secure Payment</h4>
              <p className="text-sm text-muted-foreground">
                Your payment information is secure and encrypted. We use Stripe, the trusted payment processor used by millions of businesses.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-4">
              <Button onClick={() => router.back()} variant="outline" className="flex-1">
                Back
              </Button>
              <Button onClick={handleUpgrade} disabled={loading} className="flex-1">
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? 'Processing...' : 'Continue to Payment'}
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="text-center text-xs text-muted-foreground">
              <Badge variant="outline">🔒 Secure by Stripe</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
