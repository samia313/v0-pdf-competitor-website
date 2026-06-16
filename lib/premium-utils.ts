import { db } from '@/lib/db'

/**
 * Check if user has premium subscription
 */
export async function isPremiumUser(userId: string): Promise<boolean> {
  try {
    const result = await db.query(
      `SELECT status FROM subscriptions 
       WHERE userId = $1 AND status = 'active' AND endDate > CURRENT_TIMESTAMP
       LIMIT 1`,
      [userId]
    )
    return result.rows.length > 0
  } catch (error) {
    console.error('[v0] Error checking premium status:', error)
    return false
  }
}

/**
 * Get user subscription details
 */
export async function getUserSubscription(userId: string) {
  try {
    const result = await db.query(
      `SELECT * FROM subscriptions 
       WHERE userId = $1 AND status = 'active' AND endDate > CURRENT_TIMESTAMP
       LIMIT 1`,
      [userId]
    )
    return result.rows[0] || null
  } catch (error) {
    console.error('[v0] Error fetching subscription:', error)
    return null
  }
}

/**
 * Check AI token usage limits for the month
 */
export async function checkAITokenUsage(userId: string, monthlyLimit: number = 100000): Promise<{
  used: number
  remaining: number
  percentage: number
  exceeded: boolean
}> {
  try {
    const result = await db.query(
      `SELECT COALESCE(SUM(tokensUsed), 0) as total
       FROM ai_usage_tracking
       WHERE userId = $1
       AND createdAt >= date_trunc('month', CURRENT_TIMESTAMP)`,
      [userId]
    )

    const used = result.rows[0]?.total || 0
    const remaining = Math.max(0, monthlyLimit - used)
    const percentage = (used / monthlyLimit) * 100

    return {
      used,
      remaining,
      percentage,
      exceeded: used > monthlyLimit,
    }
  } catch (error) {
    console.error('[v0] Error checking token usage:', error)
    return {
      used: 0,
      remaining: monthlyLimit,
      percentage: 0,
      exceeded: false,
    }
  }
}

/**
 * Get AI tool limits based on subscription tier
 */
export function getAIToolLimits(planId: string) {
  const limits: Record<string, { monthlyTokens: number; filesPerDay: number }> = {
    free: {
      monthlyTokens: 0,
      filesPerDay: 0,
    },
    pro: {
      monthlyTokens: 100000,
      filesPerDay: 20,
    },
    business: {
      monthlyTokens: 500000,
      filesPerDay: 100,
    },
  }

  return limits[planId] || limits.free
}
