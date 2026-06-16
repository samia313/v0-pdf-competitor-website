import { db } from '@/lib/db'

export async function GET() {
  try {
    const allOrders = await db.query.orders.findMany({
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    })
    return Response.json(allOrders)
  } catch (error) {
    console.error('[v0] Error fetching orders:', error)
    return Response.json([], { status: 500 })
  }
}
