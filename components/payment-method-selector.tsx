'use client'

import { useState } from 'react'
import { LOCAL_PAYMENT_METHODS, PAYMENT_METHODS } from '@/lib/payment-methods'
import { startCheckoutSession } from '@/app/[locale]/actions/stripe'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, AlertCircle, CheckCircle2, Copy, Check } from 'lucide-react'
import { useState as useStateReact } from 'react'

interface PaymentMethodSelectorProps {
  productId: string
  onMethodSelected: (method: string) => void
  productPrice: number
}

export function PaymentMethodSelector({
  productId,
  onMethodSelected,
  productPrice,
}: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null)
  const [orderCreated, setOrderCreated] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  const handleSelect = (methodId: string) => {
    setSelectedMethod(methodId)
    setError(null)
    onMethodSelected(methodId)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedNumber(text)
    setTimeout(() => setCopiedNumber(null), 2000)
  }

  const handlePaymentClick = async (methodId: string) => {
    setIsProcessing(true)
    setError(null)

    try {
      if (methodId === 'stripe') {
        // Stripe - Direct to hosted checkout
        const checkoutUrl = await startCheckoutSession(productId)
        if (checkoutUrl && typeof window !== 'undefined') {
          window.location.href = checkoutUrl
        }
      } else if (methodId === 'paypal') {
        // PayPal - Ready for integration
        setError('PayPal integration coming soon. Please use Stripe or local payment methods.')
        setIsProcessing(false)
      } else if (['easypaisa', 'jazzcash', 'bank_transfer'].includes(methodId)) {
        // Local methods - Create order
        const response = await fetch('/api/orders/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId,
            paymentMethod: methodId,
            amount: productPrice,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to create order')
        }

        const data = await response.json()
        setOrderId(data.orderId)
        setOrderCreated(true)
        setIsProcessing(false)
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Payment setup failed'
      setError(errorMsg)
      setIsProcessing(false)
    }
  }

  const selectedPaymentMethod = PAYMENT_METHODS.find(m => m.id === selectedMethod)
  const localMethod = LOCAL_PAYMENT_METHODS.find(m => m.id === selectedMethod)

  // If order created for local payment, show payment instructions
  if (orderCreated && localMethod) {
    return (
      <div className="space-y-6">
        {/* Order Created Success */}
        <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 dark:border-green-900/50">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900 dark:text-green-400">Order Created Successfully</p>
              <p className="text-sm text-green-800/80 dark:text-green-300/80 mt-1">
                Order ID: <span className="font-mono font-bold">{orderId}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Payment Details Card */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
            <CardTitle className="text-lg">{localMethod.name} Payment Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Account Details */}
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-2">RECIPIENT</p>
                <p className="text-sm font-medium">{localMethod.title}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-2">{localMethod.name.toUpperCase()} NUMBER</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-mono font-bold">{localMethod.number}</p>
                  <button
                    onClick={() => copyToClipboard(localMethod.number)}
                    className="p-2 hover:bg-background rounded-md transition-colors"
                  >
                    {copiedNumber === localMethod.number ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-2">AMOUNT (PKR)</p>
                <p className="text-sm font-medium">{(productPrice * 280).toLocaleString()} PKR</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-2">YOUR ORDER ID (Reference)</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono font-bold">{orderId}</p>
                  <button
                    onClick={() => copyToClipboard(orderId || '')}
                    className="p-2 hover:bg-background rounded-md transition-colors"
                  >
                    {copiedNumber === orderId ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div>
              <h4 className="font-semibold mb-4">How to Complete Payment:</h4>
              <div className="space-y-3">
                {localMethod.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="pt-1">
                      <p className="text-sm leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 border border-amber-200 dark:border-amber-900/50">
              <p className="text-sm text-amber-900 dark:text-amber-400">
                <strong>Important:</strong> After completing the payment, please send us an email to <strong>support@pdfilio.com</strong> with your Order ID and transaction proof. Your premium account will be activated within {localMethod.processingTime}.
              </p>
            </div>

            {/* Email Button */}
            <a
              href={`mailto:support@pdfilio.com?subject=Payment%20Confirmation%20-%20Order%20${orderId}&body=I%20have%20completed%20payment%20for%20Order%20ID:%20${orderId}%0A%0APayment%20Method:%20${localMethod.name}%0A%0APlease%20verify%20and%20activate%20my%20premium%20account.`}
              className="block"
            >
              <Button size="lg" className="w-full">
                Send Confirmation Email
              </Button>
            </a>

            {/* Back Button */}
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => {
                setOrderCreated(false)
                setOrderId(null)
              }}
            >
              Choose Different Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Payment method selection UI
  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div>
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* International Methods */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-muted-foreground">International Payment</h3>
        <div className="grid gap-3">
          {PAYMENT_METHODS.filter(m => m.type === 'online').map(method => (
            <button
              key={method.id}
              onClick={() => handleSelect(method.id)}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1 text-left">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{method.name}</p>
                      {method.recommended && (
                        <Badge className="bg-orange-500 text-white text-xs">Recommended</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">⚡ {method.processingTime} activation</p>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>

              {/* Payment Button for Selected Method */}
              {selectedMethod === method.id && (
                <div className="mt-4 pt-4 border-t">
                  <Button
                    onClick={() => handlePaymentClick(method.id)}
                    disabled={isProcessing}
                    size="sm"
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Continue to Payment'
                    )}
                  </Button>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Local Payment Methods */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-muted-foreground">Local Payment (Pakistan)</h3>
        <div className="grid gap-3">
          {PAYMENT_METHODS.filter(m => m.type === 'local').map(method => (
            <button
              key={method.id}
              onClick={() => handleSelect(method.id)}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1 text-left">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{method.name}</p>
                      {method.recommended && (
                        <Badge className="bg-green-600 text-white text-xs">Best for Pakistan</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">⏱️ {method.processingTime}</p>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>

              {/* Payment Button for Selected Method */}
              {selectedMethod === method.id && (
                <div className="mt-4 pt-4 border-t">
                  <Button
                    onClick={() => handlePaymentClick(method.id)}
                    disabled={isProcessing}
                    size="sm"
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Order...
                      </>
                    ) : (
                      'Get Payment Instructions'
                    )}
                  </Button>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-900/50">
        <p className="text-sm text-blue-700 dark:text-blue-400">
          🔒 <strong>All payments are secure and encrypted.</strong> Your information is protected. Premium access is granted within minutes of verified payment.
        </p>
      </div>
    </div>
  )
}
