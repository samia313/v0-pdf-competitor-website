'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, subscriptions, adminUsers, contactSubmissions, usageTracking } from '@/lib/db/schema'
import { eq, desc, and, sql, gte } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getAdminUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.email) throw new Error('Unauthorized')
  
  const admins = await db.select().from(adminUsers).where(eq(adminUsers.email, session.user.email))
  if (admins.length === 0) throw new Error('Not an admin')
  
  return { user: session.user, admin: admins[0] }
}

export async function getOrders(status?: string) {
  await getAdminUser()
  
  if (status && status !== 'all') {
    return db.select().from(orders).where(eq(orders.paymentStatus, status)).orderBy(desc(orders.createdAt))
  }
  return db.select().from(orders).orderBy(desc(orders.createdAt))
}

export async function verifyOrder(orderId: string) {
  const { user } = await getAdminUser()
  
  await db.update(orders)
    .set({ 
      paymentStatus: 'verified',
      verifiedAt: new Date(),
      verifiedBy: user.email,
      updatedAt: new Date()
    })
    .where(eq(orders.orderId, orderId))
  
  // Get order details to create subscription
  const orderDetails = await db.select().from(orders).where(eq(orders.orderId, orderId))
  if (orderDetails.length > 0) {
    const order = orderDetails[0]
    const endDate = new Date()
    
    // Set subscription end date based on plan
    if (order.planId.includes('yearly')) {
      endDate.setFullYear(endDate.getFullYear() + 1)
    } else {
      endDate.setMonth(endDate.getMonth() + 1)
    }
    
    await db.insert(subscriptions).values({
      userId: order.userId || order.customerEmail,
      userEmail: order.customerEmail,
      planId: order.planId,
      planName: order.planName,
      status: 'active',
      endDate: endDate,
      orderId: order.orderId,
    })
  }
  
  revalidatePath('/admin')
  return { success: true }
}

export async function rejectOrder(orderId: string, reason: string) {
  const { user } = await getAdminUser()
  
  await db.update(orders)
    .set({ 
      paymentStatus: 'rejected',
      notes: reason,
      verifiedAt: new Date(),
      verifiedBy: user.email,
      updatedAt: new Date()
    })
    .where(eq(orders.orderId, orderId))
  
  revalidatePath('/admin')
  return { success: true }
}

export async function getSubscriptions() {
  await getAdminUser()
  return db.select().from(subscriptions).orderBy(desc(subscriptions.createdAt))
}

export async function getContactSubmissions() {
  await getAdminUser()
  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt))
}

export async function updateContactStatus(id: number, status: string) {
  await getAdminUser()
  
  await db.update(contactSubmissions)
    .set({ 
      status,
      respondedAt: status === 'responded' ? new Date() : null
    })
    .where(eq(contactSubmissions.id, id))
  
  revalidatePath('/admin/contacts')
  return { success: true }
}

export async function getDashboardStats() {
  await getAdminUser()
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const [
    totalOrders,
    pendingOrders,
    verifiedOrders,
    totalRevenue,
    activeSubscriptions,
    todayUsage
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(orders),
    db.select({ count: sql<number>`count(*)` }).from(orders).where(eq(orders.paymentStatus, 'pending')),
    db.select({ count: sql<number>`count(*)` }).from(orders).where(eq(orders.paymentStatus, 'verified')),
    db.select({ total: sql<number>`COALESCE(SUM(amount), 0)` }).from(orders).where(eq(orders.paymentStatus, 'verified')),
    db.select({ count: sql<number>`count(*)` }).from(subscriptions).where(eq(subscriptions.status, 'active')),
    db.select({ count: sql<number>`count(*)` }).from(usageTracking).where(gte(usageTracking.createdAt, today))
  ])
  
  return {
    totalOrders: Number(totalOrders[0]?.count || 0),
    pendingOrders: Number(pendingOrders[0]?.count || 0),
    verifiedOrders: Number(verifiedOrders[0]?.count || 0),
    totalRevenue: Number(totalRevenue[0]?.total || 0),
    activeSubscriptions: Number(activeSubscriptions[0]?.count || 0),
    todayUsage: Number(todayUsage[0]?.count || 0),
  }
}

export async function addAdminUser(email: string) {
  const { admin } = await getAdminUser()
  if (admin.role !== 'superadmin') throw new Error('Only superadmin can add admins')
  
  await db.insert(adminUsers).values({ email, role: 'admin' })
  revalidatePath('/admin/settings')
  return { success: true }
}

export async function removeAdminUser(email: string) {
  const { admin } = await getAdminUser()
  if (admin.role !== 'superadmin') throw new Error('Only superadmin can remove admins')
  
  await db.delete(adminUsers).where(eq(adminUsers.email, email))
  revalidatePath('/admin/settings')
  return { success: true }
}

export async function getAdminUsers() {
  await getAdminUser()
  return db.select().from(adminUsers).orderBy(desc(adminUsers.createdAt))
}
