import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function AdminOrdersPage() {
  try {
    const allOrders = await db.query.orders.findMany({
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    })

    const pendingOrders = allOrders.filter(o => o.paymentStatus === 'pending')
    const verifiedOrders = allOrders.filter(o => o.paymentStatus === 'verified')

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard - Orders</h1>
            <p className="text-muted-foreground">Manage and verify customer payments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
              <p className="text-3xl font-bold">{allOrders.length}</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-900 font-semibold mb-1">Pending Verification</p>
              <p className="text-3xl font-bold text-yellow-700">{pendingOrders.length}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-900 font-semibold mb-1">Verified</p>
              <p className="text-3xl font-bold text-green-700">{verifiedOrders.length}</p>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Pending Orders ({pendingOrders.length})</h2>
            {pendingOrders.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">No pending orders</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary border-b border-border">
                      <th className="text-left px-4 py-3 font-semibold">Order ID</th>
                      <th className="text-left px-4 py-3 font-semibold">Customer</th>
                      <th className="text-left px-4 py-3 font-semibold">Email</th>
                      <th className="text-left px-4 py-3 font-semibold">Plan</th>
                      <th className="text-left px-4 py-3 font-semibold">Amount</th>
                      <th className="text-left px-4 py-3 font-semibold">Method</th>
                      <th className="text-left px-4 py-3 font-semibold">Transaction ID</th>
                      <th className="text-left px-4 py-3 font-semibold">Date</th>
                      <th className="text-left px-4 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-secondary/50">
                        <td className="px-4 py-3 font-mono text-xs">{order.orderId}</td>
                        <td className="px-4 py-3">{order.customerName}</td>
                        <td className="px-4 py-3 text-xs">{order.customerEmail}</td>
                        <td className="px-4 py-3 font-semibold">{order.planName}</td>
                        <td className="px-4 py-3">${order.amount}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs">{order.paymentProof}</td>
                        <td className="px-4 py-3 text-xs">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-4 py-3">
                          <Link href={`/admin/orders/${order.id}`}>
                            <Button size="sm" variant="outline">
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
            <h2 className="text-2xl font-bold mb-4">Verified Orders ({verifiedOrders.length})</h2>
            {verifiedOrders.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">No verified orders</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary border-b border-border">
                      <th className="text-left px-4 py-3 font-semibold">Order ID</th>
                      <th className="text-left px-4 py-3 font-semibold">Customer</th>
                      <th className="text-left px-4 py-3 font-semibold">Plan</th>
                      <th className="text-left px-4 py-3 font-semibold">Amount</th>
                      <th className="text-left px-4 py-3 font-semibold">Method</th>
                      <th className="text-left px-4 py-3 font-semibold">Verified By</th>
                      <th className="text-left px-4 py-3 font-semibold">Verified Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifiedOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-secondary/50">
                        <td className="px-4 py-3 font-mono text-xs">{order.orderId}</td>
                        <td className="px-4 py-3">{order.customerName}</td>
                        <td className="px-4 py-3 font-semibold">{order.planName}</td>
                        <td className="px-4 py-3">${order.amount}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="px-4 py-3">{order.verifiedBy || '-'}</td>
                        <td className="px-4 py-3 text-xs">
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
