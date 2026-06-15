import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AdminLogout from '@/components/admin-logout'

export default async function AdminOrdersPage() {
  try {
    const allOrders = await db.query.orders.findMany({
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    })

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

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900/50 to-black p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-white">{allOrders.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <span className="text-lg">📊</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-yellow-800/50 bg-gradient-to-b from-yellow-950/30 to-black p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-200 mb-1">Pending Review</p>
                  <p className="text-3xl font-bold text-yellow-400">{pendingOrders.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                  <span className="text-lg">⏳</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-green-800/50 bg-gradient-to-b from-green-950/30 to-black p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-200 mb-1">Verified</p>
                  <p className="text-3xl font-bold text-green-400">{verifiedOrders.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <span className="text-lg">✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">Pending Payments</h2>
              <p className="text-slate-400 text-sm">Orders waiting for verification</p>
            </div>
            {pendingOrders.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900/50 to-black p-12 text-center">
                <p className="text-slate-400">No pending orders</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-900/50">
                      <th className="text-left px-6 py-4 font-semibold text-slate-200">Order ID</th>
                      <th className="text-left px-6 py-4 font-semibold text-slate-200">Customer</th>
                      <th className="text-left px-6 py-4 font-semibold text-slate-200">Email</th>
                      <th className="text-left px-6 py-4 font-semibold text-slate-200">Plan</th>
                      <th className="text-left px-6 py-4 font-semibold text-slate-200">Amount</th>
                      <th className="text-left px-6 py-4 font-semibold text-slate-200">Method</th>
                      <th className="text-left px-6 py-4 font-semibold text-slate-200">Transaction</th>
                      <th className="text-left px-6 py-4 font-semibold text-slate-200">Date</th>
                      <th className="text-left px-6 py-4 font-semibold text-slate-200">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {pendingOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-900/30 transition">
                        <td className="px-6 py-4 font-mono text-xs text-slate-300">{order.orderId?.slice(0, 8)}...</td>
                        <td className="px-6 py-4 text-slate-300 font-medium">{order.customerName}</td>
                        <td className="px-6 py-4 text-xs text-slate-400">{order.customerEmail}</td>
                        <td className="px-6 py-4 text-slate-300 font-semibold">{order.planName}</td>
                        <td className="px-6 py-4 text-slate-300">${order.amount}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-300">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-slate-400">{order.paymentProof?.slice(0, 6)}...</td>
                        <td className="px-6 py-4 text-xs text-slate-400">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/admin/orders/${order.id}`}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                              Review
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        {/* Verified Orders */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Verified Payments</h2>
            <p className="text-slate-400 text-sm">Successfully completed and activated subscriptions</p>
          </div>
          {verifiedOrders.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900/50 to-black p-12 text-center">
              <p className="text-slate-400">No verified orders</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-900/50">
                    <th className="text-left px-6 py-4 font-semibold text-slate-200">Order ID</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-200">Customer</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-200">Plan</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-200">Amount</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-200">Method</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-200">Verified On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {verifiedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-900/30 transition">
                      <td className="px-6 py-4 font-mono text-xs text-slate-300">{order.orderId?.slice(0, 8)}...</td>
                      <td className="px-6 py-4 text-slate-300 font-medium">{order.customerName}</td>
                      <td className="px-6 py-4 text-slate-300 font-semibold">{order.planName}</td>
                      <td className="px-6 py-4 text-slate-300">${order.amount}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-900/40 border border-green-700/50 text-green-300">
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {order.verifiedAt ? new Date(order.verifiedAt).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('[v0] Error loading orders:', error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Error Loading Orders</h1>
          <p className="text-muted-foreground">Please check the database connection</p>
        </div>
      </div>
    )
  }
}
