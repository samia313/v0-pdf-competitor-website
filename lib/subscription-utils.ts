import { getSession } from '@/lib/auth'
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans'

export interface UserSubscriptionStatus {
  planId: string
  status: 'active' | 'cancelled' | 'expired'
  filesUsedToday: number
  filesLimit: number
  canUseAI: boolean
  canUsePremiumTools: boolean
  canBatchProcess: boolean
  message?: string
}

export async function checkSubscriptionStatus(): Promise<UserSubscriptionStatus> {
  const session = await getSession()

  if (!session?.user?.id) {
    return {
      planId: 'free',
      status: 'active',
      filesUsedToday: 0,
      filesLimit: 5,
      canUseAI: false,
      canUsePremiumTools: false,
      canBatchProcess: false,
      message: 'Please sign in to use more tools',
    }
  }

  try {
    const response = await fetch('/api/subscription', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      const plan = SUBSCRIPTION_PLANS.find((p) => p.id === data.planId)

      return {
        planId: data.planId,
        status: data.status,
        filesUsedToday: data.filesUsed || 0,
        filesLimit: data.filesLimit || 5,
        canUseAI: plan?.aiTools || false,
        canUsePremiumTools: plan?.id !== 'free',
        canBatchProcess: plan?.id === 'business',
      }
    }
  } catch (error) {
    console.error('Failed to check subscription:', error)
  }

  const defaultPlan = SUBSCRIPTION_PLANS[0] // Free plan
  return {
    planId: 'free',
    status: 'active',
    filesUsedToday: 0,
    filesLimit: defaultPlan.filesPerDay,
    canUseAI: false,
    canUsePremiumTools: false,
    canBatchProcess: false,
  }
}

export async function trackFileUsage(
  toolName: string,
  fileSize: number
): Promise<boolean> {
  const session = await getSession()

  if (!session?.user?.id) {
    return false
  }

  try {
    const response = await fetch('/api/track-usage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toolName,
        fileSize,
      }),
    })

    return response.ok
  } catch (error) {
    console.error('Failed to track usage:', error)
    return false
  }
}
