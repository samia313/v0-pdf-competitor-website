'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Copy, Check, ChevronRight } from 'lucide-react'
import { LOCAL_PAYMENT_METHODS } from '@/lib/payment-methods'

interface PaymentModalProps {
  plan: { name: string; price: number }
  onClose: () => void
}

export default function PaymentModal({ plan, onClose }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const pricePKR = Math.round(plan.price * 280) // USD to PKR conversion
  const selectedPayment = selectedMethod ? LOCAL_PAYMENT_METHODS.find(m => m.id === selectedMethod) : null

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (selectedPayment) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-2xl border border-border max-w-md w-full p-8">
          <button onClick={() => setSelectedMethod(null)} className="text-muted-foreground hover:text-foreground mb-4">
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold mb-2">{selectedPayment.name}</h2>
          <p className="text-sm text-muted-foreground mb-6">{selectedPayment.instructions}</p>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-1">Amount to Send</p>
            <p className="text-2xl font-bold text-primary">{pricePKR} PKR</p>
            <p className="text-xs text-muted-foreground mt-1">(≈ ${plan.price}/month)</p>
          </div>

          <div className="bg-secondary rounded-lg p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-2">Send to</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{selectedPayment.number}</p>
                <p className="text-xs text-muted-foreground">{selectedPayment.title}</p>
              </div>
              <button
                onClick={() => handleCopy(selectedPayment.number)}
                className="p-2 hover:bg-background rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold mb-3">Steps:</p>
            <ol className="space-y-2">
              {selectedPayment.steps.map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-semibold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs text-muted-foreground pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-blue-50/50 border border-blue-200/50 rounded-lg p-3 mb-6">
            <p className="text-xs text-blue-900">
              <span className="font-semibold">Processing time:</span> {selectedPayment.processingTime}
            </p>
          </div>

          <Button className="w-full mb-3 h-12 font-semibold" onClick={onClose}>
            Payment Sent - Confirm
          </Button>
          <Button variant="outline" className="w-full h-12 font-semibold" onClick={() => setSelectedMethod(null)}>
            Back to Payment Methods
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl border border-border max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{plan.name} Plan</h2>
            <p className="text-3xl font-bold text-primary mt-2">${plan.price}/month</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-muted-foreground">You are subscribing to the {plan.name} plan.</p>
          <div className="bg-secondary rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Billing Amount</p>
            <p className="text-2xl font-bold">${plan.price}</p>
            <p className="text-xs text-muted-foreground mt-1">Billed monthly</p>
          </div>
        </div>

        <p className="text-sm font-semibold mb-3">Choose Payment Method:</p>

        <div className="space-y-2 mb-6">
          {/* Stripe Card */}
          <button
            onClick={() => window.location.href = '/checkout'}
            className="w-full p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">💳 Credit/Debit Card</p>
                <p className="text-xs text-muted-foreground">Visa, MasterCard, AMEX</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>

          {/* Local Payment Methods */}
          {LOCAL_PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className="w-full p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{method.icon}</span>
                    <p className="font-semibold text-foreground">{method.name}</p>
                    {method.id === 'jazzcash' && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{method.number}</p>
                  <p className="text-xs text-muted-foreground">{method.processingTime}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>

        <Button variant="outline" className="w-full h-12 font-semibold" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
