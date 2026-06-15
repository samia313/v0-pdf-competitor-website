import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { usageTracking, contactSubmissions } from '@/lib/db/schema'
import { desc, sql, gte } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    // Check admin session
    const adminSession = request.cookies.get('admin-session')?.value
    if (!adminSession) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const db = pool

    // Get last 30 days of usage data
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const usageData = await db
      .select({
        date: sql<string>`DATE(${usageTracking.createdAt})`,
        count: sql<number>`COUNT(*)`,
      })
      .from(usageTracking)
      .where(gte(usageTracking.createdAt, thirtyDaysAgo))
      .groupBy(sql`DATE(${usageTracking.createdAt})`)
      .orderBy(sql`DATE(${usageTracking.createdAt})`)

    // Get total usage this month
    const monthStart = new Date()
    monthStart.setDate(1)

    const totalUsageResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(usageTracking)
      .where(gte(usageTracking.createdAt, monthStart))

    const totalUsage = totalUsageResult[0]?.count || 0

    // Get top tools
    const topToolsResult = await db
      .select({
        name: usageTracking.toolName,
        count: sql<number>`COUNT(*)`,
      })
      .from(usageTracking)
      .where(gte(usageTracking.createdAt, monthStart))
      .groupBy(usageTracking.toolName)
      .orderBy(desc(sql`COUNT(*)`))
      .limit(10)

    // Get contact count
    const contactCountResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(contactSubmissions)
      .where(gte(contactSubmissions.createdAt, monthStart))

    const contactCount = contactCountResult[0]?.count || 0

    return NextResponse.json({
      totalUsage,
      contactCount,
      toolsUsage: usageData.map(d => ({
        date: d.date,
        count: d.count,
      })),
      topTools: topToolsResult.map(t => ({
        name: t.name,
        count: t.count,
      })),
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
