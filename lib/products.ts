export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  period?: 'month' | 'year'
  features: string[]
  popular?: boolean
  toolsPerDay?: number | 'unlimited'
  maxFileSize?: string
  batchProcessing?: boolean
  priorityProcessing?: boolean
  noAds?: boolean
  apiAccess?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Basic PDF tools for personal use',
    priceInCents: 0,
    features: [
      '5 tasks per day',
      'Max 25MB file size',
      'Basic PDF tools',
      'Standard processing speed',
      'Ads supported',
    ],
    toolsPerDay: 5,
    maxFileSize: '25MB',
    batchProcessing: false,
    priorityProcessing: false,
    noAds: false,
    apiAccess: false,
  },
  {
    id: 'premium-monthly',
    name: 'Premium',
    description: 'Unlimited access for professionals',
    priceInCents: 900, // $9.00/month
    period: 'month',
    popular: true,
    features: [
      'Unlimited tasks',
      'Max 4GB file size',
      'All PDF tools included',
      'Batch processing',
      'Priority processing speed',
      'No advertisements',
      'OCR & AI tools',
      'Email support',
    ],
    toolsPerDay: 'unlimited',
    maxFileSize: '4GB',
    batchProcessing: true,
    priorityProcessing: true,
    noAds: true,
    apiAccess: false,
  },
  {
    id: 'premium-yearly',
    name: 'Premium',
    description: 'Best value - Save 33%',
    priceInCents: 7200, // $72.00/year ($6/month)
    period: 'year',
    features: [
      'Unlimited tasks',
      'Max 4GB file size',
      'All PDF tools included',
      'Batch processing',
      'Priority processing speed',
      'No advertisements',
      'OCR & AI tools',
      'Email support',
      '2 months FREE',
    ],
    toolsPerDay: 'unlimited',
    maxFileSize: '4GB',
    batchProcessing: true,
    priorityProcessing: true,
    noAds: true,
    apiAccess: false,
  },
  {
    id: 'business-monthly',
    name: 'Business',
    description: 'For teams and businesses',
    priceInCents: 2500, // $25.00/month
    period: 'month',
    features: [
      'Everything in Premium',
      'Up to 10 team members',
      'Max 10GB file size',
      'API access',
      'Custom branding',
      'Advanced analytics',
      'Priority support',
      'SSO integration',
    ],
    toolsPerDay: 'unlimited',
    maxFileSize: '10GB',
    batchProcessing: true,
    priorityProcessing: true,
    noAds: true,
    apiAccess: true,
  },
  {
    id: 'business-yearly',
    name: 'Business',
    description: 'Best value for teams - Save 33%',
    priceInCents: 20000, // $200.00/year
    period: 'year',
    features: [
      'Everything in Premium',
      'Up to 10 team members',
      'Max 10GB file size',
      'API access',
      'Custom branding',
      'Advanced analytics',
      'Priority support',
      'SSO integration',
      '4 months FREE',
    ],
    toolsPerDay: 'unlimited',
    maxFileSize: '10GB',
    batchProcessing: true,
    priorityProcessing: true,
    noAds: true,
    apiAccess: true,
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getMonthlyPrice(product: Product): number {
  if (product.period === 'year') {
    return Math.round(product.priceInCents / 12)
  }
  return product.priceInCents
}
