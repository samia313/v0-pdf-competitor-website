// Payment Configuration for Pakistan
// Multiple payment methods supported

export const PAYMENT_METHODS = {
  // LemonSqueezy - International Payments (Works in Pakistan)
  lemonSqueezy: {
    enabled: true,
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, International Cards',
    icon: 'credit-card',
  },
  // Local Pakistani Payment Methods
  jazzCash: {
    enabled: true,
    name: 'JazzCash',
    description: 'Pay via JazzCash Mobile Wallet',
    icon: 'smartphone',
    accountNumber: '0303-9109260',
    accountTitle: 'Naveed Ahmad Sharif',
  },
  easypaisa: {
    enabled: true,
    name: 'Easypaisa',
    description: 'Pay via Easypaisa Mobile Wallet',
    icon: 'smartphone',
    accountNumber: '0345-0100172',
    accountTitle: 'Naveed Ahmad Sharif',
  },
  bankTransfer: {
    enabled: true,
    name: 'Bank Transfer',
    description: 'Direct bank transfer (Pakistan banks)',
    icon: 'building',
    bankName: 'Faysal Bank',
    accountNumber: '3667786000002590',
    accountTitle: 'Naveed Ahmad Sharif',
    iban: 'PK83FAYS3667786000002590',
  },
}

// LemonSqueezy Products (Create these in your LemonSqueezy dashboard)
export const LEMONSQUEEZY_PRODUCTS = {
  'premium-monthly': {
    variantId: '', // Add your LemonSqueezy variant ID
    priceInCents: 900,
  },
  'premium-yearly': {
    variantId: '', // Add your LemonSqueezy variant ID  
    priceInCents: 7200,
  },
  'business-monthly': {
    variantId: '', // Add your LemonSqueezy variant ID
    priceInCents: 2500,
  },
  'business-yearly': {
    variantId: '', // Add your LemonSqueezy variant ID
    priceInCents: 20000,
  },
}

// Pakistani Rupee Prices
export const PKR_PRICES = {
  'premium-monthly': 2500,
  'premium-yearly': 20000,
  'business-monthly': 7000,
  'business-yearly': 56000,
}
