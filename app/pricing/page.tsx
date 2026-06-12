import Link from 'next/link'
import { Check, X, Zap, Building2, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SUBSCRIPTION_PLANS, getMonthlyPrice } from '@/lib/subscription-plans'

export default async function PricingPage() {
  const freePlan = SUBSCRIPTION_PLANS.find(p => p.id === 'free')!
  const proPlan = SUBSCRIPTION_PLANS.find(p => p.id === 'pro')!
  const businessPlan = SUBSCRIPTION_PLANS.find(p => p.id === 'business')!

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
            Pricing Plans
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start for free and upgrade when you need more power. All plans include our core PDF tools.
          </p>
          
  
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="relative border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">{freePlan.name}</CardTitle>
              <CardDescription>{freePlan.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-muted-foreground">/forever</span>
              </div>
              <ul className="space-y-3 text-left">
                {freePlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/tools" className="w-full">
                <Button variant="outline" className="w-full" size="lg">
                  Get Started Free
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-2 border-primary shadow-xl scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-4 py-1">
                Most Popular
              </Badge>
            </div>
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">{proPlan.name}</CardTitle>
              <CardDescription>{proPlan.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <span className="text-5xl font-bold">
                  ${getMonthlyPrice(proPlan.priceInCents)}
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 text-left">
                {proPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/upgrade?plan=pro" className="w-full">
                <Button className="w-full" size="lg">
                  Upgrade to Pro
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Business Plan */}
          <Card className="relative border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">{businessPlan.name}</CardTitle>
              <CardDescription>{businessPlan.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <span className="text-5xl font-bold">
                  ${getMonthlyPrice(businessPlan.priceInCents)}
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 text-left">
                {businessPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/upgrade?plan=business" className="w-full">
                <Button variant="outline" className="w-full" size="lg">
                  Upgrade to Business
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Compare All Features</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold">Free</th>
                  <th className="text-center py-4 px-4 font-semibold text-primary">Premium</th>
                  <th className="text-center py-4 px-4 font-semibold">Business</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-4">Daily Tasks</td>
                  <td className="text-center py-4 px-4">5</td>
                  <td className="text-center py-4 px-4 bg-primary/5">Unlimited</td>
                  <td className="text-center py-4 px-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Max File Size</td>
                  <td className="text-center py-4 px-4">25MB</td>
                  <td className="text-center py-4 px-4 bg-primary/5">4GB</td>
                  <td className="text-center py-4 px-4">10GB</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Batch Processing</td>
                  <td className="text-center py-4 px-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-primary/5"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Priority Processing</td>
                  <td className="text-center py-4 px-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-primary/5"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">No Advertisements</td>
                  <td className="text-center py-4 px-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-primary/5"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">OCR & AI Tools</td>
                  <td className="text-center py-4 px-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-primary/5"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">API Access</td>
                  <td className="text-center py-4 px-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-primary/5"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Team Members</td>
                  <td className="text-center py-4 px-4">1</td>
                  <td className="text-center py-4 px-4 bg-primary/5">1</td>
                  <td className="text-center py-4 px-4">Up to 10</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Support</td>
                  <td className="text-center py-4 px-4">Community</td>
                  <td className="text-center py-4 px-4 bg-primary/5">Email</td>
                  <td className="text-center py-4 px-4">Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. You will continue to have access until the end of your billing period.</p>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and local payment methods through our secure payment processor Stripe.</p>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-muted-foreground">Yes, we offer a 7-day money-back guarantee. If you are not satisfied with our service, contact us within 7 days for a full refund.</p>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-muted-foreground">Yes, you can change your plan at any time. When upgrading, you will be charged the prorated difference. When downgrading, the new rate will apply at the next billing cycle.</p>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Are my files secure?</h3>
              <p className="text-muted-foreground">Absolutely. All files are processed securely and automatically deleted after processing. We use industry-standard encryption and never share your data with third parties.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-primary/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join millions of users who trust pdfilio for their PDF needs. Start with our free plan and upgrade when you need more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools">
              <Button size="lg" variant="outline">
                Try Free Tools
              </Button>
            </Link>
            <Link href="/dashboard/upgrade?plan=pro">
              <Button size="lg">
                Get Premium Now
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
