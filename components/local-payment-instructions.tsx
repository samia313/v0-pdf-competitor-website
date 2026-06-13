'use client'

import { LocalPaymentMethod } from '@/lib/payment-methods'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

export function LocalPaymentInstructions({ method }: { method: LocalPaymentMethod }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(method.number)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{method.icon}</span>
          <CardTitle className="text-lg">{method.name}</CardTitle>
          <Badge variant="outline" className="ml-auto">
            {method.processingTime}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Payment Details */}
        <div className="bg-white dark:bg-slate-950 rounded-lg p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground font-semibold mb-1">ACCOUNT HOLDER</p>
            <p className="font-medium">{method.title}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-semibold mb-1">
              {method.id === 'bank_transfer' ? 'BANK ACCOUNT' : 'MOBILE NUMBER'}
            </p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-sm font-semibold">{method.number}</p>
              <button
                onClick={copyToClipboard}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-slate-950 rounded-lg p-4 space-y-3">
          <p className="text-sm font-semibold">How to Pay:</p>
          <ol className="text-sm space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span className="flex-shrink-0 font-semibold">1.</span>
              <span>{method.instructions}</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0 font-semibold">2.</span>
              <span>We'll verify your payment within {method.processingTime}</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0 font-semibold">3.</span>
              <span>Your subscription will be activated immediately after verification</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0 font-semibold">4.</span>
              <span>You'll receive confirmation email with receipt</span>
            </li>
          </ol>
        </div>

        {/* Important Note */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-lg p-3">
          <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">
            💡 Keep your transaction receipt as proof of payment
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
