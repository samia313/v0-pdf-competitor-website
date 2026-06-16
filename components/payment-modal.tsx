'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Copy, Check, ChevronRight, Loader2, Shield, Clock, Zap } from 'lucide-react'
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
        <div className="rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900/80 to-black backdrop-blur-xl max-w-md w-full p-8 text-center shadow-2xl shadow-green-500/5">
          <div className="w-16 h-16 rounded-full bg-green-900/40 border border-green-700/50 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Received!</h2>
          <p className="text-slate-300 mb-4">
            We have received your payment request. Our team will verify it within 24 hours.
          </p>
          <p className="text-sm text-slate-400">Check your email for updates.</p>
        </div>
      </div>
    )
  }

  if (selectedPayment) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900/80 to-black backdrop-blur-xl max-w-md w-full p-8 my-8 shadow-2xl shadow-blue-500/5">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedPayment.name}</h2>
              <p className="text-sm text-slate-400 mt-1">{selectedPayment.instructions}</p>
            </div>
            <button onClick={() => setSelectedMethod(null)} className="text-slate-400 hover:text-slate-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/20 border border-blue-700/50 rounded-xl p-4 mb-6">
            <p className="text-xs font-medium text-blue-300 uppercase tracking-wide mb-2">Total Amount</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{pricePKR}</span>
              <span className="text-slate-400">PKR</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">(≈ ${plan.price}/month)</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-3">Send Payment To</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-lg mb-1">{selectedPayment.number}</p>
                  <p className="text-xs text-slate-400">{selectedPayment.title}</p>
                </div>
                <button
                  onClick={() => handleCopy(selectedPayment.number)}
                  className="p-3 hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
                >
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-slate-400" />}
                </button>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-3">Steps to Pay</p>
              <ol className="space-y-2">
                {selectedPayment.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-700/50 text-blue-300 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-slate-300 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/30 border border-slate-700/30 rounded-lg p-3 mb-6">
            <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <p className="text-xs text-slate-300">
              <span className="font-semibold">Processing time:</span> {selectedPayment.processingTime}
            </p>
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-white block mb-2">Transaction ID / Reference Number</label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Paste your transaction ID here"
              className="w-full px-4 py-3 border border-slate-700 rounded-lg bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition text-sm"
            />
            <p className="text-xs text-slate-400 mt-2">This helps us quickly verify your payment</p>
          </div>

          <Button 
            className="w-full mb-3 h-11 font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/20 rounded-lg" 
            onClick={handleSubmitPayment}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting Payment...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Payment Sent - Confirm
              </>
            )}
          </Button>
          <Button variant="outline" className="w-full h-11 font-semibold border-slate-700 text-slate-300 hover:bg-slate-800 rounded-lg" onClick={() => setSelectedMethod(null)}>
            Back to Methods
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900/80 to-black backdrop-blur-xl max-w-md w-full p-8 my-8 shadow-2xl shadow-blue-500/5">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm text-slate-400 mb-2">Subscribe to</p>
            <h2 className="text-3xl font-bold text-white mb-2">{plan.name} Plan</h2>
            <p className="text-sm text-slate-400">
              <span className="text-2xl font-bold text-white">${plan.price}</span>
              <span>/month</span>
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plan Features */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-700/50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>Unlock all premium features</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300 mt-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Secure payment processing</span>
          </div>
        </div>

        <p className="text-sm font-semibold text-white mb-4">Choose Payment Method</p>

        <div className="space-y-3 mb-6">
          {/* Card Payment */}
          <button
            onClick={() => window.location.href = '/checkout'}
            className="w-full p-4 rounded-xl border-2 border-slate-700 bg-slate-800/50 hover:border-blue-500 hover:bg-slate-800 transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-900/40 border border-blue-700/50 flex items-center justify-center group-hover:bg-blue-900/60 transition">
                  <span className="text-lg">💳</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Credit/Debit Card</p>
                  <p className="text-xs text-slate-400 mt-1">Visa, MasterCard, AMEX</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition" />
            </div>
          </button>

          {/* Local Payment Methods */}
          {LOCAL_PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left group ${
                method.id === 'jazzcash'
                  ? 'border-orange-600/50 bg-orange-900/20 hover:border-orange-500 hover:bg-orange-900/30'
                  : 'border-slate-700 bg-slate-800/50 hover:border-blue-500 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition ${
                    method.id === 'jazzcash'
                      ? 'bg-orange-900/40 border border-orange-700/50'
                      : 'bg-blue-900/40 border border-blue-700/50'
                  }`}>
                    <span className="text-lg">{method.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white text-sm">{method.name}</p>
                      {method.id === 'jazzcash' && (
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-600/40 border border-orange-600/50 text-orange-300">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{method.number}</p>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {method.processingTime}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>

        <Button variant="outline" className="w-full h-11 font-semibold border-slate-700 text-slate-300 hover:bg-slate-800 rounded-lg" onClick={onClose}>
          Cancel
        </Button>

        {/* Security Note */}
        <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Shield className="w-3 h-3" />
          <span>Secure and encrypted payment</span>
        </div>
      </div>
    </div>
  )
}
