export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  priceInCents: number
  stripePriceId: string
  features: string[]
  filesPerDay: number
  aiTools: boolean
  emailSupport: boolean
  priority: boolean
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    priceInCents: 0,
    stripePriceId: '',
    features: [
      '5 files per day',
      'Basic tools only (20 tools)',
      'Watermark on output',
      'Community support',
      'Web access only',
    ],
    filesPerDay: 5,
    aiTools: false,
    emailSupport: false,
    priority: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for daily users',
    priceInCents: 999, // $9.99/month
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || '',
    features: [
      '100 files per day',
      'All tools (30+ tools)',
      'No watermark',
      'AI Summarizer & Translator',
      'Advanced PDF Editor',
      'Batch processing',
      'Cloud storage integration',
      'Email support',
      'Web + Mobile',
    ],
    filesPerDay: 100,
    aiTools: true,
    emailSupport: true,
    priority: false,
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For teams and enterprises',
    priceInCents: 2999, // $29.99/month
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS || '',
    features: [
      'Unlimited files',
      'All Pro features',
      'E-Signature (certified)',
      'Form detection & filling',
      'Redaction tool',
      'PDF comparison',
      'Workflow automation',
      'Priority support (24/7)',
      'Team management',
      'API access',
      'Custom branding',
    ],
    filesPerDay: 999999,
    aiTools: true,
    emailSupport: true,
    priority: true,
  },
]

export function getPlanById(planId: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find((plan) => plan.id === planId)
}

export function getMonthlyPrice(priceInCents: number): string {
  return (priceInCents / 100).toFixed(2)
}
