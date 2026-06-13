'use client'

import { useState } from 'react'
import { startCheckoutSession } from '@/app/actions/stripe'
import { Button } from '@/components/ui/button'
import { Loader2, AlertCircle } from 'lucide-react'

export function StripeCheckout({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('[v0] Starting checkout for product:', productId)
      const checkoutUrl = await startCheckoutSession(productId)
      console.log('[v0] Got checkout URL:', !!checkoutUrl)
      
      if (!checkoutUrl) {
        throw new Error('Failed to create checkout session')
      }

      if (typeof window !== 'undefined') {
        window.location.href = checkoutUrl
      }
    } catch (err) {
      console.error('[v0] Checkout error:', err)
      const errorMsg = err instanceof Error ? err.message : 'Payment setup failed. Please try again.'
      setError(errorMsg)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div>
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
              <p className="text-red-500 dark:text-red-300 text-xs mt-1">Please refresh and try again or contact support@pdfilio.com</p>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        size="lg"
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Preparing payment...
          </>
        ) : (
          'Continue to Payment'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Secure payment powered by Stripe
      </p>
    </div>
  )
}
