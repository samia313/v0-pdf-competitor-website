'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PRODUCTS } from '@/lib/products'
import { StripeCheckout } from '@/components/stripe-checkout'
import { PaymentMethodSelector } from '@/components/payment-method-selector'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = searchParams.get('product') || 'premium-monthly'
  const product = PRODUCTS.find(p => p.id === productId)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Invalid Plan</h1>
            <p className="text-muted-foreground mb-6">The plan you selected is not available.</p>
            <Link href="/pricing">
              <Button>Back to Pricing</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const price = (product.priceInCents / 100).toFixed(2)
  const billingPeriod = product.period === 'month' ? 'Month' : 'Year'

  const handlePaymentMethodSelected = (method: string) => {
    setSelectedPaymentMethod(method)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/pricing" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Pricing
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{product.name} Plan</h3>
                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      {product.popular && (
                        <Badge className="bg-orange-500 text-white">Most Popular</Badge>
                      )}
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-semibold">${price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Billing Cycle</span>
                        <span className="font-semibold">Per {billingPeriod.toLowerCase()}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between">
                        <span className="font-semibold">Total Due</span>
                        <span className="text-xl font-bold text-primary">${price}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-sm mb-3">Includes:</h4>
                      <ul className="space-y-2">
                        {product.features.slice(0, 6).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 border border-green-200 dark:border-green-900/50 text-center">
                      <p className="text-xs text-green-700 dark:text-green-400 font-medium">
                        7-Day Money-Back Guarantee
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Section */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Payment Method</CardTitle>
                    <CardDescription>
                      Choose how you want to pay
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                  <PaymentMethodSelector 
                    productId={productId}
                    productPrice={parseFloat(price)}
                    onMethodSelected={handlePaymentMethodSelected}
                  />

                    {/* Payment Processing */}
                    {selectedPaymentMethod && (
                      <div className="space-y-4 pt-4 border-t">
                        {selectedPaymentMethod === 'stripe' && (
                          <div>
                            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-900/50 mb-4">
                              <div className="flex gap-3">
                                <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                <div className="text-sm">
                                  <p className="font-semibold text-blue-900 dark:text-blue-400 mb-1">Secure Payment</p>
                                  <p className="text-blue-800/80 dark:text-blue-300/80">
                                    Your payment is secured by Stripe, encrypted with SSL, and fully PCI compliant
                                  </p>
                                </div>
                              </div>
                            </div>
                            <StripeCheckout productId={productId} />
                          </div>
                        )}

                        {selectedPaymentMethod === 'paypal' && (
                          <Button size="lg" className="w-full">
                            Continue to PayPal
                          </Button>
                        )}

                    {selectedPaymentMethod && selectedPaymentMethod !== 'stripe' && selectedPaymentMethod !== 'paypal' && (
                      <div className="space-y-4 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          Payment instructions have been shown above. Complete the transfer and your subscription will be activated after verification.
                        </p>
                      </div>
                    )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Support */}
                <Card className="mt-6 bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-base">Help & Support</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Payment issues?</strong><br />
                      Contact us at support@pdfilio.com
                    </p>
                    <p>
                      <strong className="text-foreground">Have questions?</strong><br />
                      Check our FAQ or live chat for help
                    </p>
                  </CardContent>
                </Card>
              </div>
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
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
