'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle2, Home, Zap, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const orderId = searchParams.get('orderId')
  const paymentMethod = searchParams.get('method')

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      stripe: 'Credit/Debit Card',
      paypal: 'PayPal',
      easypaisa: 'EasyPaisa',
      jazzcash: 'Jazz Cash',
      bank_transfer: 'Bank Transfer',
    }
    return labels[method] || 'Online Payment'
  }

  const isPendingPayment = ['easypaisa', 'jazzcash', 'bank_transfer'].includes(paymentMethod || '')

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          {/* Success Icon & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10 border-2 border-green-500/20 mb-6">
              <CheckCircle2 className="h-14 w-14 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-3">
              {isPendingPayment ? 'Payment Request Received!' : 'Payment Successful!'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isPendingPayment 
                ? 'We received your payment request. Your subscription will be activated after verification.'
                : 'Your premium subscription is now active and ready to use'}
            </p>
          </div>

          {/* Main Card */}
          <Card className="mb-6 border-green-200/50 dark:border-green-900/50">
            <CardHeader className="bg-gradient-to-r from-green-500/5 to-emerald-500/5">
              <Badge className="w-fit mx-auto mb-4 bg-green-500 text-white hover:bg-green-600">
                {isPendingPayment ? 'Pending Verification' : 'Premium Plan Activated'}
              </Badge>
              <CardTitle className="text-center text-2xl">Welcome to PDFilio Premium</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Confirmation ID */}
              <div className="bg-muted rounded-lg p-4 border border-border/50">
                <p className="text-xs text-muted-foreground font-semibold mb-1">
                  {isPendingPayment ? 'ORDER ID' : 'ORDER CONFIRMATION ID'}
                </p>
                <p className="font-mono text-sm break-all text-foreground">
                  {orderId || sessionId}
                </p>
              </div>

              {/* Payment Method Info */}
              {paymentMethod && (
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-900/50">
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    <strong>Payment Method:</strong> {getPaymentMethodLabel(paymentMethod)}
                  </p>
                  {isPendingPayment && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                      Verification typically takes 5-15 minutes for mobile payments or 1-2 business days for bank transfers.
                    </p>
                  )}
                </div>
              )}

              {/* Features Unlocked */}
              <div className="space-y-3">
                <h3 className="font-semibold text-base flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  You now have access to:
                </h3>
                <div className="grid gap-2">
                  {[
                    'Unlimited file uploads and processing',
                    'Access to all 34+ PDF tools',
                    'Up to 4GB file size per upload',
                    'Priority processing speed',
                    'Ad-free experience',
                    'OCR and AI-powered tools',
                    'Batch file processing',
                    'Download all converted files'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-600" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Confirmation */}
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200/50 dark:border-blue-900/50">
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-900 dark:text-blue-400 mb-1">Confirmation Email</p>
                    <p className="text-blue-800/80 dark:text-blue-300/80">
                      Check your email for order confirmation and next steps
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <Link href="/tools/merge-pdf" className="block">
                  <Button size="lg" className="w-full">
                    Start Using Premium Tools
                  </Button>
                </Link>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link href="/dashboard">
                    <Button variant="outline" size="lg" className="w-full">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" size="lg" className="w-full">
                      View All Plans
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Card */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Questions?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
              <p>Your subscription will auto-renew on your next billing date. You can cancel anytime from your dashboard without penalty.</p>
              <p>All your files are securely processed and deleted after 24 hours.</p>
              <p>Need help? Contact our support team at support@pdfilio.com</p>
              {isPendingPayment && (
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  Your payment is being verified. Check your email for confirmation once processed.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><span>Loading...</span></div>}>
      <SuccessContent />
    </Suspense>
  )
}
