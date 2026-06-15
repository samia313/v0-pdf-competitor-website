'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function AdminOrderReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [orderData, setOrderData] = useState<any>(null)
  const [notesInput, setNotesInput] = useState('')

  const handleVerify = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/orders/${params.id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          notes: notesInput,
          verifiedBy: 'admin@pdfilio.com',
        }),
      })

      if (response.ok) {
        alert('Order verified successfully!')
        router.push('/admin/orders')
      } else {
        alert('Failed to verify order')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/orders/${params.id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reject',
          notes: notesInput,
        }),
      })

      if (response.ok) {
        alert('Order rejected. Customer will be notified.')
        router.push('/admin/orders')
      } else {
        alert('Failed to reject order')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="outline" onClick={() => router.back()} className="mb-4">
            ← Back
          </Button>
          <h1 className="text-3xl font-bold">Review Order</h1>
          <p className="text-muted-foreground">Verify payment and activate subscription</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order ID</p>
              <p className="font-mono font-bold text-sm">ORD-LOADING</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p className="text-yellow-700 font-semibold">Pending Verification</p>
            </div>
          </div>

          <div className="space-y-4 mb-6 pb-6 border-b border-border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Customer Name</p>
                <p className="font-semibold">Loading...</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="text-sm">Loading...</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <p className="font-mono text-sm">Loading...</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Plan</p>
                <p className="font-semibold">Loading...</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6 pb-6 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
              <p className="font-semibold">Loading...</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Transaction ID / Reference</p>
              <p className="font-mono text-sm bg-secondary rounded p-2">Loading...</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className="text-2xl font-bold">$0</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Order Date</p>
            <p className="text-sm">Loading...</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <label className="block mb-3">
            <p className="text-sm font-semibold mb-2">Admin Notes</p>
            <textarea
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder="Add notes about this payment verification..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-secondary text-foreground text-sm h-24"
            />
          </label>
        </div>

        <div className="flex gap-4">
          <Button
            className="flex-1 h-12 font-semibold"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Verify Payment & Activate
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            className="flex-1 h-12 font-semibold"
            onClick={handleReject}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 mr-2" />
                Reject Payment
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
