'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, X, Zap, Building2, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for occasional use',
    icon: Zap,
    color: 'border-border/60',
    btnClass: 'border border-primary text-primary hover:bg-primary/10',
    features: [
      { text: '5 files per task', included: true },
      { text: 'Up to 100MB file size', included: true },
      { text: 'Basic PDF tools (20+)', included: true },
      { text: 'With ads', included: true },
      { text: 'Priority processing', included: false },
      { text: 'No watermarks', included: false },
      { text: 'Batch processing', included: false },
      { text: 'API access', included: false },
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 9.99, yearly: 4.99 },
    description: 'For power users & professionals',
    icon: Crown,
    popular: true,
    color: 'border-primary shadow-2xl shadow-primary/20',
    btnClass: 'bg-primary hover:bg-primary/90 text-white',
    features: [
      { text: 'Unlimited files per task', included: true },
      { text: 'Up to 2GB file size', included: true },
      { text: 'All PDF tools + AI (27+)', included: true },
      { text: 'Ad-free experience', included: true },
      { text: 'Priority processing', included: true },
      { text: 'No watermarks', included: true },
      { text: 'Batch processing', included: true },
      { text: 'Email support', included: true },
    ],
  },
  {
    name: 'Business',
    price: { monthly: 19.99, yearly: 9.99 },
    description: 'For teams & enterprises',
    icon: Building2,
    color: 'border-border/60',
    btnClass: 'border border-foreground text-foreground hover:bg-secondary',
    features: [
      { text: 'Unlimited files', included: true },
      { text: 'Unlimited file size', included: true },
      { text: 'All PDF tools + AI (27+)', included: true },
      { text: 'Ad-free experience', included: true },
      { text: 'Priority processing', included: true },
      { text: 'No watermarks', included: true },
      { text: 'Batch processing', included: true },
      { text: '24/7 Priority support', included: true },
    ],
  },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
            Simple, <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Transparent Pricing</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">Choose the plan that works best for you.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-secondary rounded-full px-2 py-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                !yearly ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                yearly ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Yearly
              <span className="ml-1.5 text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">
                -50%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = yearly ? plan.price.yearly : plan.price.monthly
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 ${plan.color} bg-card p-8 flex flex-col transition-all hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div
                  className={`w-12 h-12 rounded-xl ${plan.popular ? 'bg-primary/20' : 'bg-secondary'} flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-foreground">${price.toFixed(2)}</span>
                  {price > 0 && <span className="text-muted-foreground text-sm ml-1">/ {yearly ? 'year' : 'month'}</span>}
                  {price === 0 && <span className="text-muted-foreground text-sm ml-1">Forever free</span>}
                </div>

                <Link href={price > 0 ? '/checkout' : '/tools'} className="w-full mb-8">
                  <Button
                    className={`w-full h-11 font-semibold ${plan.btnClass}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {price === 0 ? 'Get Started Free' : `Activate ${plan.name}`}
                  </Button>
                </Link>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5">
                      {f.included ? (
                        <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${f.included ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold">Free</th>
                  <th className="text-center py-4 px-4 font-semibold text-primary">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold">Business</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Files per task', free: '5', pro: 'Unlimited', business: 'Unlimited' },
                  { feature: 'Max file size', free: '100MB', pro: '2GB', business: 'Unlimited' },
                  { feature: 'PDF tools', free: '20+', pro: '27+ (all)', business: '27+ (all)' },
                  { feature: 'AI features', free: false, pro: true, business: true },
                  { feature: 'Priority processing', free: false, pro: true, business: true },
                  { feature: 'No watermarks', free: false, pro: true, business: true },
                  { feature: 'Batch processing', free: false, pro: true, business: true },
                  { feature: 'API access', free: false, pro: false, business: true },
                  { feature: 'Support', free: 'Community', pro: 'Email', business: '24/7 Priority' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                        )
                      ) : (
                        <span>{row.free}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4 bg-primary/5">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold">{row.pro}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.business === 'boolean' ? (
                        row.business ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                        )
                      ) : (
                        <span>{row.business}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can I cancel my subscription anytime?',
                a: 'Yes, cancel anytime without any penalty. Your access continues until the end of your billing period.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and local payment methods (EasyPaisa, Jazz Cash, Bank Transfer).',
              },
              {
                q: 'Do you offer refunds?',
                a: '7-day money-back guarantee. Contact support within 7 days for a full refund.',
              },
              {
                q: 'Can I upgrade or downgrade my plan?',
                a: 'Yes, anytime. Upgrades are prorated immediately. Downgrades apply at next billing cycle.',
              },
              {
                q: 'Are my files secure?',
                a: 'Absolutely. All files are encrypted, automatically deleted after 24 hours, and we never share data.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-card rounded-lg p-6 border border-border/50">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center bg-primary/5 rounded-2xl p-12 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start with our free plan and upgrade whenever you need more power.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools">
              <Button variant="outline" size="lg">
                Try Free Tools
              </Button>
            </Link>
            <Link href="/checkout">
              <Button size="lg">Get Premium Now</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
