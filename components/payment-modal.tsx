import React from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface PaymentModalProps {
  plan: { name: string; price: number }
  onClose: () => void
}

export default function PaymentModal({ plan, onClose }: PaymentModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl border border-border max-w-md w-full p-8">
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

        <Button className="w-full mb-3 h-12 font-semibold" onClick={onClose}>
          Continue to Payment
        </Button>
        <Button variant="outline" className="w-full h-12 font-semibold" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
