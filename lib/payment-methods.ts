export interface LocalPaymentMethod {
  id: string
  name: string
  icon: string
  number: string
  title: string
  instructions: string
  processingTime: string
  fees: string
  available: boolean
  steps: string[]
}

export const LOCAL_PAYMENT_METHODS: LocalPaymentMethod[] = [
  {
    id: 'easypaisa',
    name: 'EasyPaisa',
    icon: '📱',
    number: '+923450100172',
    title: 'Naveed Ahmad Sharif',
    instructions: 'Transfer to EasyPaisa account and get instant access to premium features',
    processingTime: '5-15 minutes',
    fees: 'Free',
    available: true,
    steps: [
      'Open EasyPaisa App or USSD dial *786# on your Jazz phone',
      'Select "Send Money" option',
      'Enter receiver number: +923450100172',
      'Enter amount (PKR equivalent of plan price)',
      'Complete transaction',
      'Email us order ID with transaction reference',
      'Your account activates within 15 minutes after verification',
    ],
  },
  {
    id: 'jazzcash',
    name: 'Jazz Cash',
    icon: '💳',
    number: '+923039109260',
    title: 'Naveed Ahmad Sharif',
    instructions: 'Quick transfer via Jazz Cash with instant account activation after verification',
    processingTime: '5-15 minutes',
    fees: 'Free',
    available: true,
    steps: [
      'Dial *117# or open Jazz Cash App',
      'Select "Send Money" or "Bill Payment"',
      'Enter number: +923039109260',
      'Enter amount (Plan price in PKR)',
      'Confirm and complete payment',
      'Note your transaction ID',
      'Email us: order ID + transaction ID to support@pdfilio.com',
      'Premium access granted after verification (5-15 min)',
    ],
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: '🏦',
    number: 'PK83FAYS3667786000002590',
    title: 'Naveed Ahmad Sharif',
    instructions: 'Direct bank transfer to Faysal Bank for maximum security',
    processingTime: '1-2 business days',
    fees: 'Free',
    available: true,
    steps: [
      'Log into your bank (any Pakistani bank)',
      'Select "Fund Transfer" or "Remittance"',
      'Choose Faysal Bank as recipient bank',
      'Enter IBAN: PK83FAYS3667786000002590',
      'Account name: NAVEED AHMAD SHARIF',
      'Enter transfer amount',
      'Add payment reference: Your order ID',
      'Complete transfer and save receipt',
      'Email us receipt for quick verification',
      'Premium access granted within 1-2 business days',
    ],
  },
]

export const PAYMENT_METHODS = [
  {
    id: 'stripe',
    name: 'Credit/Debit Card',
    icon: '💳',
    type: 'online' as const,
    processingTime: 'Instant',
    fees: 'Included',
    description: 'Visa, MasterCard, American Express',
    recommended: true,
  },
  ...LOCAL_PAYMENT_METHODS.map(m => ({
    id: m.id,
    name: m.name,
    icon: m.icon,
    type: 'local' as const,
    processingTime: m.processingTime,
    fees: m.fees,
    description: `${m.title} - ${m.number}`,
    recommended: m.id === 'jazzcash',
  })),
]

