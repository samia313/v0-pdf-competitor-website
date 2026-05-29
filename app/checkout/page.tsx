'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Lock, CreditCard, Smartphone, Building2, Copy, Check, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PRODUCTS, getMonthlyPrice } from '@/lib/products'
import { PKR_PRICES } from '@/lib/payment-config'
import { createManualPaymentOrder } from '@/app/actions/payments'

type PaymentMethod = 'card' | 'jazzcash' | 'easypaisa' | 'bank'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const planId = searchParams.get('plan')
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('jazzcash')
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' })
  const [orderCreated, setOrderCreated] = useState<{
    orderId: string
    instructions: {
      title: string
      steps: string[]
      accountNumber: string
      accountTitle: string
      bankName?: string
      iban?: string
    }
  } | null>(null)
  const [copied, setCopied] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const product = PRODUCTS.find(p => p.id === planId)
  const pkrPrice = planId ? PKR_PRICES[planId as keyof typeof PKR_PRICES] : 0

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(''), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!planId || paymentMethod === 'card') return
    
    setIsLoading(true)
    try {
      const result = await createManualPaymentOrder(planId, paymentMethod, customerInfo)
      if (result.success) {
        setOrderCreated({
          orderId: result.orderId,
          instructions: result.instructions as typeof orderCreated extends { instructions: infer T } ? T : never,
        })
      }
    } catch (error) {
      console.error('Error creating order:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
                  </div>

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

                  {/* Prices */}
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">USD Price</span>
                      <span className="font-semibold">${(product.priceInCents / 100).toFixed(2)} / {product.period}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-medium">PKR Price</span>
                      <span className="font-bold text-primary">Rs. {pkrPrice?.toLocaleString()} / {product.period}</span>
                    </div>
                    {product.period === 'year' && (
                      <p className="text-sm text-green-600">
                        Save 33% with yearly billing!
                      </p>
                    )}
                  </div>

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
                        <span className="text-xs text-muted-foreground">Safe</span>
                      </div>
                    </div>
                  </div>

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

            {/* Payment Methods */}
            <div className="order-1 lg:order-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  {!orderCreated ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Payment Method Selection */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('jazzcash')}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                            paymentMethod === 'jazzcash' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">JazzCash</p>
                            <p className="text-xs text-muted-foreground">Mobile Wallet</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('easypaisa')}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                            paymentMethod === 'easypaisa' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">Easypaisa</p>
                            <p className="text-xs text-muted-foreground">Mobile Wallet</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bank')}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                            paymentMethod === 'bank' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">Bank Transfer</p>
                            <p className="text-xs text-muted-foreground">Pakistani Banks</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                            paymentMethod === 'card' 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">Card</p>
                            <p className="text-xs text-muted-foreground">Visa/Mastercard</p>
                          </div>
                        </button>
                      </div>

                      {paymentMethod === 'card' ? (
                        <div className="bg-muted/50 rounded-lg p-6 text-center">
                          <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground mb-4">
                            International card payments coming soon!
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Please use JazzCash, Easypaisa, or Bank Transfer for now.
                          </p>
                        </div>
                      ) : (
                        <>
                          {/* Customer Info */}
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                placeholder="Enter your full name"
                                value={customerInfo.name}
                                onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email Address</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={customerInfo.email}
                                onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone">Phone Number (WhatsApp)</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="03XX-XXXXXXX"
                                value={customerInfo.phone}
                                onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                                required
                              />
                            </div>
                          </div>

                          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                            {isLoading ? 'Processing...' : `Pay Rs. ${pkrPrice?.toLocaleString()} via ${paymentMethod === 'jazzcash' ? 'JazzCash' : paymentMethod === 'easypaisa' ? 'Easypaisa' : 'Bank Transfer'}`}
                          </Button>
                        </>
                      )}
                    </form>
                  ) : (
                    /* Payment Instructions */
                    <div className="space-y-6">
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <p className="font-medium text-green-700 dark:text-green-400">
                          Order Created Successfully!
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                          Order ID: <span className="font-mono font-bold">{orderCreated.orderId}</span>
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">{orderCreated.instructions.title}</h3>
                        
                        {/* Account Details */}
                        <div className="bg-muted/50 rounded-lg p-4 space-y-3 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Account Number</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold">{orderCreated.instructions.accountNumber}</span>
                              <button
                                onClick={() => copyToClipboard(orderCreated.instructions.accountNumber, 'account')}
                                className="p-1 hover:bg-muted rounded"
                              >
                                {copied === 'account' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Account Title</span>
                            <span className="font-medium">{orderCreated.instructions.accountTitle}</span>
                          </div>
                          {orderCreated.instructions.bankName && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Bank</span>
                              <span className="font-medium">{orderCreated.instructions.bankName}</span>
                            </div>
                          )}
                          {orderCreated.instructions.iban && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">IBAN</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm">{orderCreated.instructions.iban}</span>
                                <button
                                  onClick={() => copyToClipboard(orderCreated.instructions.iban!, 'iban')}
                                  className="p-1 hover:bg-muted rounded"
                                >
                                  {copied === 'iban' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          )}
                          <div className="flex justify-between items-center pt-2 border-t">
                            <span className="text-sm text-muted-foreground">Amount</span>
                            <span className="font-bold text-primary text-lg">Rs. {pkrPrice?.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Steps */}
                        <ol className="space-y-3">
                          {orderCreated.instructions.steps.map((step, index) => (
                            <li key={index} className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </span>
                              <span className="text-sm pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Upload Screenshot */}
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                        <p className="font-medium mb-2">Upload Payment Screenshot</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          After payment, upload screenshot for quick verification
                        </p>
                        <Button variant="outline">
                          Choose File
                        </Button>
                      </div>

                      {/* WhatsApp Support */}
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <p className="text-sm text-center">
                          <span className="font-medium">Need help?</span> Send payment screenshot on WhatsApp:{' '}
                          <a 
                            href="https://wa.me/923XXXXXXXXX" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 font-bold hover:underline"
                          >
                            +92 3XX XXXXXXX
                          </a>
                        </p>
                      </div>

                      <Button variant="outline" className="w-full" onClick={() => setOrderCreated(null)}>
                        Start New Order
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Payment Methods Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">Supported Payment Methods in Pakistan</p>
            <div className="flex justify-center gap-4 items-center flex-wrap">
              <div className="bg-card border rounded px-4 py-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500 rounded-full" />
                <span className="text-sm font-medium">JazzCash</span>
              </div>
              <div className="bg-card border rounded px-4 py-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Easypaisa</span>
              </div>
              <div className="bg-card border rounded px-4 py-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full" />
                <span className="text-sm font-medium">Bank Transfer</span>
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
