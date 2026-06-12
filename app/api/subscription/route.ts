import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user subscription from database
    const subscription = await db.subscriptions.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })

    // Get usage tracking for today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const usage = await db.usage_tracking.countTracking({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: today,
        },
      },
    })

    const planId = subscription?.planId || 'free'
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId) || SUBSCRIPTION_PLANS[0]

    return NextResponse.json({
      planId,
      status: subscription?.status || 'active',
      startDate: subscription?.startDate?.toISOString(),
      renewalDate: subscription?.endDate?.toISOString(),
      filesUsed: usage || 0,
      filesLimit: plan.filesPerDay,
      features: plan.features,
      aiTools: plan.aiTools,
      emailSupport: plan.emailSupport,
    })
  } catch (error) {
    console.error('Failed to fetch subscription:', error)
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 })
  }
}
