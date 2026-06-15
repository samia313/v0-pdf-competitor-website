'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AdminLogout from '@/components/admin-logout'

interface Order {
  id: string
  orderId: string
  userId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  planId: string
  planName: string
  amount: number
  currency: string
  paymentMethod: string
  paymentStatus: 'pending' | 'verified'
  paymentProof?: string
  notes?: string
  createdAt: string
  updatedAt: string
  verifiedAt?: string
  verifiedBy?: string
}

export default function AdminOrdersPage() {
  const [allOrders, setAllOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders')
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        const data = await response.json()
        setAllOrders(data)
      } catch (err) {
        console.error('[v0] Error fetching orders:', err)
        setError('Unable to load orders. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const pendingOrders = allOrders.filter(o => o.paymentStatus === 'pending')
  const verifiedOrders = allOrders.filter(o => o.paymentStatus === 'verified')

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Payment Management</h1>
            <p className="text-slate-400">Track and verify customer orders in real-time</p>
          </div>
          <AdminLogout />
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg bg-red-950/50 border border-red-800/50 p-4 mb-8">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center">
            <p className="text-slate-400">Loading orders...</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900/50 to-black p-6">
                <p className="text-sm text-slate-400 mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-white">{allOrders.length}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900/50 to-black p-6">
                <p className="text-sm text-slate-400 mb-2">Pending</p>
                <p className="text-3xl font-bold text-yellow-400">{pendingOrders.length}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900/50 to-black p-6">
                <p className="text-sm text-slate-400 mb-2">Verified</p>
                <p className="text-3xl font-bold text-green-400">{verifiedOrders.length}</p>
              </div>
            </div>

            {/* Orders Section */}
            <div className="space-y-6">
              {/* Pending Orders */}
              {pendingOrders.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Pending Orders ({pendingOrders.length})</h2>
                  <div className="space-y-3">
                    {pendingOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Orders */}
              {verifiedOrders.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Verified Orders ({verifiedOrders.length})</h2>
                  <div className="space-y-3">
                    {verifiedOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                </div>
              )}

              {allOrders.length === 0 && (
                <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center">
                  <p className="text-slate-400">No orders found</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-gradient-to-r from-slate-900/50 to-slate-800/30 p-6 hover:border-slate-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-slate-400">Order #{order.orderId}</p>
          <p className="text-lg font-semibold text-white">{order.customerName}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.paymentStatus === 'verified'
              ? 'bg-green-500/20 text-green-300'
              : 'bg-yellow-500/20 text-yellow-300'
          }`}
        >
          {order.paymentStatus === 'verified' ? 'Verified' : 'Pending'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div>
          <p className="text-slate-500 mb-1">Email</p>
          <p className="text-slate-200">{order.customerEmail}</p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Amount</p>
          <p className="text-slate-200">
            {order.currency} {order.amount}
          </p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Plan</p>
          <p className="text-slate-200">{order.planName}</p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Date</p>
          <p className="text-slate-200">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {order.notes && (
        <div className="mb-4">
          <p className="text-sm text-slate-500 mb-1">Notes</p>
          <p className="text-slate-300 text-sm">{order.notes}</p>
        </div>
      )}

      {order.paymentStatus === 'pending' && (
        <div className="flex gap-2">
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            Verify Payment
          </Button>
          <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            Reject
          </Button>
        </div>
      )}
    </div>
  )
}
