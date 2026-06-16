# PDFilio Premium - Quick Start Guide

## For Developers: Getting Started

### 1. Environment Setup
```bash
# Copy example env
cp .env.example .env.development.local

# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Start dev server
npm run dev
```

### 2. Test Stripe Integration
```bash
# Use test card: 4242 4242 4242 4242
# Expiry: Any future date
# CVC: Any 3 digits

# Webhook testing:
stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

### 3. Key Files to Know
- `lib/subscription-plans.ts` - Pricing config
- `app/api/webhooks/stripe/route.ts` - Payment processing
- `components/pdf-editor.tsx` - Advanced editing
- `app/admin/dashboard/page.tsx` - Revenue tracking

---

## Subscription Plans

### Free ($0)
```javascript
{
  id: 'free',
  name: 'Free',
  filesPerDay: 5,
  features: [
    'Basic PDF tools (20+)',
    'Merge, Compress, Split',
    'Convert to Word/PowerPoint'
  ],
  aiTools: false,
  emailSupport: false,
  priceInCents: 0
}
```

### Pro ($999/month)
```javascript
{
  id: 'pro',
  name: 'Professional',
  filesPerDay: 100,
  features: [
    'All basic tools',
    'Advanced PDF editor',
    'Watermark Pro',
    'No watermark on output',
    'AI Summarizer & Translator',
    'Batch processing'
  ],
  aiTools: true,
  emailSupport: true,
  priceInCents: 999
}
```

### Business ($2999/month)
```javascript
{
  id: 'business',
  name: 'Enterprise',
  filesPerDay: -1, // unlimited
  features: [
    'All Pro features',
    'Digital Signatures',
    'Redaction tool',
    'PDF Comparison',
    'Custom branding',
    'API access',
    'Team management'
  ],
  aiTools: true,
  emailSupport: true,
  priceInCents: 2999
}
```

---

## API Quick Reference

### Get User Subscription
```javascript
const response = await fetch('/api/subscription')
const data = await response.json()
// Returns: {planId, status, filesUsed, filesLimit, features, ...}
```

### Create Checkout
```javascript
const response = await fetch('/api/subscribe', {
  method: 'POST',
  body: JSON.stringify({ planId: 'pro' })
})
const { url } = await response.json()
window.location.href = url // Redirect to Stripe
```

### Track Usage
```javascript
await fetch('/api/track-usage', {
  method: 'POST',
  body: JSON.stringify({
    toolName: 'merge-pdf',
    fileSize: 1024000
  })
})
```

---

## Feature Access Pattern

### Check Subscription in Components
```javascript
'use client'
import { useEffect, useState } from 'react'

export function MyTool() {
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    fetch('/api/subscription')
      .then(r => r.json())
      .then(setSubscription)
  }, [])

  if (subscription?.planId === 'free') {
    return <UpgradePrompt />
  }

  return <ToolComponent />
}
```

### Server-Side Access Control
```javascript
// In API route
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const session = await getSession()
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 })

  const subscription = await db.subscriptions.findFirst({
    where: { userId: session.user.id }
  })

  if (subscription?.planId === 'free') {
    return new Response('Free plan not allowed', { status: 403 })
  }

  // Process request
}
```

---

## Database Queries

### Get User Subscription
```javascript
const subscription = await db.subscriptions.findFirst({
  where: { userId: userId }
})
```

### Check Daily Usage
```javascript
const today = new Date()
today.setHours(0, 0, 0, 0)

const usage = await db.usage_tracking.count({
  where: {
    userId: userId,
    createdAt: { gte: today }
  }
})
```

### Update Subscription After Stripe Event
```javascript
await db.subscriptions.upsert({
  where: { userId },
  update: {
    planId: newPlanId,
    status: 'active'
  },
  create: {
    userId,
    planId: newPlanId,
    status: 'active'
  }
})
```

---

## Stripe Webhook Events

### Handled Events
```
customer.subscription.created    - New subscription
customer.subscription.updated    - Plan changed
customer.subscription.deleted    - Cancelled
invoice.paid                     - Payment successful
invoice.payment_failed           - Payment failed
```

### Test Webhook Locally
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Listen for events
stripe listen --forward-to localhost:3001/api/webhooks/stripe

# Get webhook secret and add to .env
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Testing Checklist

### User Flow
- [ ] Sign up → Create account
- [ ] Verify email → Check inbox
- [ ] Sign in → Access dashboard
- [ ] View pricing → See three tiers
- [ ] Click upgrade → Redirect to Stripe
- [ ] Complete payment → Get Pro access
- [ ] Use Pro tool → Should work
- [ ] Check usage → Should track

### Admin Flow
- [ ] Go to /admin/dashboard
- [ ] See user metrics
- [ ] See revenue stats
- [ ] See plan breakdown
- [ ] System status shows healthy

---

## Common Issues & Fixes

### Stripe Not Processing
```
✓ Check webhook secret in .env
✓ Verify Stripe keys (test vs live)
✓ Check webhook URL in Stripe dashboard
✓ Run: stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

### Usage Not Tracking
```
✓ Verify session exists: getSession()
✓ Check API is being called
✓ Verify database connection
✓ Check user ID in database
```

### Features Not Accessible
```
✓ Verify subscription fetches correctly
✓ Check planId in response
✓ Test feature access logic
✓ Clear browser cache/localStorage
```

---

## Deployment Checklist

### Before Going Live
- [ ] Set STRIPE_SECRET_KEY (live)
- [ ] Set STRIPE_PUBLISHABLE_KEY (live)
- [ ] Set STRIPE_WEBHOOK_SECRET (production)
- [ ] Configure production database
- [ ] Run database migrations
- [ ] Set NEXT_PUBLIC_APP_URL to production domain
- [ ] Test full payment flow
- [ ] Configure Stripe webhook URL
- [ ] Set up email service
- [ ] Configure monitoring/alerts
- [ ] SSL certificate configured
- [ ] Backup system in place

---

## Monitoring & Analytics

### Key Metrics to Track
- Users signed up (daily, weekly, monthly)
- Subscription conversions (free → pro, pro → business)
- Monthly Recurring Revenue (MRR)
- Churn rate
- Tool usage by plan type
- API error rates
- Payment success rate

### Health Checks
- Database connectivity
- Stripe API availability
- Email delivery
- File storage
- API response times

---

## Revenue Tracking

### View in Admin Dashboard
```
/admin/dashboard
  ├─ Total Users
  ├─ Paid Subscribers
  ├─ Monthly Revenue
  ├─ Plan Breakdown
  └─ Churn Rate
```

### Calculate MRR
```
Pro Subscribers (142) × $9.99 = $1,419.58
Business Subscribers (43) × $29.99 = $1,289.57
Total MRR = $2,709.15
Annual = $32,509.80
```

---

## Next Steps

### For Phase 4 (Batch Processing)
- [ ] Multiple file upload
- [ ] Job queue system
- [ ] Bulk operation processing
- [ ] Progress tracking
- [ ] Scheduled jobs

### For Phase 5 (Premium Tools)
- [ ] PDF comparison
- [ ] Template system
- [ ] Cloud storage integration
- [ ] Advanced OCR

### For Phase 6 (Mobile)
- [ ] React Native setup
- [ ] iOS/Android builds
- [ ] Offline support
- [ ] Cloud sync

---

## Support Resources

- **Stripe Docs**: https://stripe.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Better Auth**: https://www.better-auth.com
- **PDF.js Docs**: https://mozilla.github.io/pdf.js/
- **PDF-lib Docs**: https://github.com/Caseraw/pdf-lib

---

## Team Contacts

- Tech Lead: [Your Name]
- Product Manager: [Your Name]
- DevOps: [Your Name]
- Support: support@pdfilio.com

---

**Version**: 1.0.0  
**Updated**: June 13, 2026  
**Status**: Production Ready
