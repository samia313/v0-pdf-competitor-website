'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Copy, Check, ChevronRight, Loader2 } from 'lucide-react'
import { LOCAL_PAYMENT_METHODS } from '@/lib/payment-methods'

interface PaymentModalProps {
  plan: { name: string; price: number }
  onClose: () => void
}

export default function PaymentModal({ plan, onClose }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const pricePKR = Math.round(plan.price * 280)
  const selectedPayment = selectedMethod ? LOCAL_PAYMENT_METHODS.find(m => m.id === selectedMethod) : null

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmitPayment = async () => {
    if (!transactionId.trim()) {
      alert('Please enter transaction ID/reference number')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: plan.name,
          planId: plan.name.toLowerCase(),
          amount: plan.price,
          paymentMethod: selectedMethod,
          paymentProof: transactionId,
          customerEmail: 'user@example.com',
          customerPhone: selectedPayment?.number || '',
          customerName: 'Customer',
        }),
      })

      const data = await response.json()
      
      if (response.ok && data.orderId) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
          setSuccess(false)
          setTransactionId('')
          setSelectedMethod(null)
        }, 3000)
      } else {
        alert('Error: ' + (data.error || 'Failed to submit payment'))
      }
    } catch (error) {
      alert('Failed to submit payment. Please try again.')
      console.error('[v0] Payment error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-2xl border border-border max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Received!</h2>
          <p className="text-muted-foreground mb-4">
            We have received your payment request. Our team will verify it within 24 hours and activate your subscription.
          </p>
          <p className="text-sm text-muted-foreground">Check your email for updates.</p>
        </div>
      </div>
    )
  }

  if (selectedPayment) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-card rounded-2xl border border-border max-w-md w-full p-6 my-8">
          <button onClick={() => setSelectedMethod(null)} className="text-muted-foreground hover:text-foreground mb-4 float-right">
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold mb-1">{selectedPayment.name}</h2>
          <p className="text-sm text-muted-foreground mb-4">{selectedPayment.instructions}</p>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground mb-1">Amount to Send</p>
            <p className="text-2xl font-bold text-primary">{pricePKR} PKR</p>
            <p className="text-xs text-muted-foreground mt-1">(≈ ${plan.price}/month)</p>
          </div>

          <div className="bg-secondary rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground mb-2">Send to</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground text-sm">{selectedPayment.number}</p>
                <p className="text-xs text-muted-foreground">{selectedPayment.title}</p>
              </div>
              <button
                onClick={() => handleCopy(selectedPayment.number)}
                className="p-2 hover:bg-background rounded-lg transition-colors flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Steps:</p>
            <ol className="space-y-1 max-h-40 overflow-y-auto">
              {selectedPayment.steps.map((step, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-semibold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs text-muted-foreground pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-blue-50/50 border border-blue-200/50 rounded-lg p-2 mb-4">
            <p className="text-xs text-blue-900">
              <span className="font-semibold">Processing:</span> {selectedPayment.processingTime}
            </p>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold block mb-2">Transaction ID / Reference</label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter transaction ID from your payment app"
              className="w-full px-3 py-2 border border-border rounded-lg bg-secondary text-foreground text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">This helps us verify your payment quickly</p>
          </div>

          <Button 
            className="w-full mb-2 h-10 font-semibold text-sm" 
            onClick={handleSubmitPayment}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Payment Sent - Confirm'
            )}
          </Button>
          <Button variant="outline" className="w-full h-10 font-semibold text-sm" onClick={() => setSelectedMethod(null)}>
            Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-card rounded-2xl border border-border max-w-md w-full p-6 my-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{plan.name} Plan</h2>
            <p className="text-3xl font-bold text-primary mt-1">${plan.price}/month</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-sm text-muted-foreground">You are subscribing to the {plan.name} plan.</p>
          <div className="bg-secondary rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Billing Amount</p>
            <p className="text-2xl font-bold">${plan.price}</p>
            <p className="text-xs text-muted-foreground mt-1">Billed monthly</p>
          </div>
        </div>

        <p className="text-sm font-semibold mb-2">Choose Payment Method:</p>

        <div className="space-y-2 mb-4">
          <button
            onClick={() => window.location.href = '/checkout'}
            className="w-full p-3 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">💳 Credit/Debit Card</p>
                <p className="text-xs text-muted-foreground">Visa, MasterCard, AMEX</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>

          {LOCAL_PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className="w-full p-3 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{method.icon}</span>
                    <p className="font-semibold text-foreground text-sm">{method.name}</p>
                    {method.id === 'jazzcash' && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{method.number}</p>
                  <p className="text-xs text-muted-foreground">{method.processingTime}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>

        <Button variant="outline" className="w-full h-10 font-semibold text-sm" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
