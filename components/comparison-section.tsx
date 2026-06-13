'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, X, TrendingUp, Award, Zap, Shield } from 'lucide-react'

export function ComparisonSection() {
  return (
    <>
      {/* Why PDFilio Wins Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Why PDFilio Wins vs iLovePDF
            </h2>
            <p className="text-lg text-muted-foreground">
              Same tools. Better price. Advanced features they don&apos;t have.
            </p>
          </div>

          {/* Key Advantages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: '10% Cheaper',
                description: '$9.99/mo vs $12/mo - Save 30% yearly',
              },
              {
                icon: Zap,
                title: 'AI-Powered Tools',
                description: 'Advanced redaction, summarization, translation',
              },
              {
                icon: Award,
                title: 'More Features',
                description: '27+ tools with advanced editing capabilities',
              },
              {
                icon: Shield,
                title: 'Better Security',
                description: 'GDPR compliant, 256-bit SSL, zero tracking',
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
                  <div className="relative bg-background border border-border rounded-lg p-6 space-y-3">
                    <Icon className="w-8 h-8 text-primary" />
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Feature Comparison
            </h2>
            <p className="text-lg text-muted-foreground">
              See why customers are switching to PDFilio
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-primary">PDFilio</th>
                  <th className="text-center py-4 px-4 font-semibold">iLovePDF</th>
                  <th className="text-center py-4 px-4 font-semibold">SmallPDF</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Pro Plan Price', pdfilio: '$9.99/mo', ilovepdf: '$12/mo', smallpdf: '$12/mo', highlight: true },
                  { feature: 'PDF Tools Available', pdfilio: '27+', ilovepdf: '30+', smallpdf: '20+', highlight: false },
                  { feature: 'Advanced PDF Editor', pdfilio: true, ilovepdf: false, smallpdf: false, highlight: false },
                  { feature: 'AI Redaction Tool', pdfilio: true, ilovepdf: false, smallpdf: false, highlight: true },
                  { feature: 'AI Summarizer', pdfilio: true, ilovepdf: false, smallpdf: false, highlight: true },
                  { feature: 'AI Translator (100+ Languages)', pdfilio: true, ilovepdf: false, smallpdf: false, highlight: true },
                  { feature: 'PDF Comparison', pdfilio: true, ilovepdf: false, smallpdf: false, highlight: true },
                  { feature: 'Batch Processing', pdfilio: true, ilovepdf: false, smallpdf: false, highlight: true },
                  { feature: 'Advanced E-Signatures', pdfilio: true, ilovepdf: true, smallpdf: true, highlight: false },
                  { feature: 'Remove Watermark', pdfilio: 'Pro Plan', ilovepdf: 'Pro Plan', smallpdf: 'Pro Plan', highlight: false },
                  { feature: 'Daily File Limit', pdfilio: 'Unlimited', ilovepdf: '100+', smallpdf: '100+', highlight: false },
                  { feature: 'API Access', pdfilio: 'Business Tier', ilovepdf: false, smallpdf: true, highlight: false },
                  { feature: 'No Ads', pdfilio: true, ilovepdf: true, smallpdf: true, highlight: false },
                  { feature: 'GDPR Compliant', pdfilio: true, ilovepdf: true, smallpdf: true, highlight: false },
                  { feature: 'Pakistan Local Payment', pdfilio: true, ilovepdf: false, smallpdf: false, highlight: true },
                ].map((row, index) => (
                  <tr key={index} className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${row.highlight ? 'bg-primary/5' : ''}`}>
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {typeof row.pdfilio === 'boolean' ? (
                        row.pdfilio ? (
                          <Check className="w-5 h-5 text-primary mx-auto font-bold" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="text-primary font-semibold">{row.pdfilio}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.ilovepdf === 'boolean' ? (
                        row.ilovepdf ? (
                          <Check className="w-5 h-5 text-muted-foreground mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="text-muted-foreground">{row.ilovepdf}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.smallpdf === 'boolean' ? (
                        row.smallpdf ? (
                          <Check className="w-5 h-5 text-muted-foreground mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="text-muted-foreground">{row.smallpdf}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              ✓ Included  |  ✗ Not Available
            </p>
            <p className="text-xs text-muted-foreground">
              Highlighted features are exclusive to PDFilio in the free tier
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 sm:p-12 border border-primary/20 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold">Ready to Switch?</h3>
              <p className="text-muted-foreground">
                Join 500K+ professionals who chose PDFilio over alternatives
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button size="lg" className="w-full sm:w-auto">
                  See Pro Plans ($9.99/mo)
                </Button>
              </Link>
              <Link href="/tools/merge-pdf">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Try Free - No Card Needed
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase font-semibold tracking-wide">
            Trusted by Professionals Worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              GDPR Compliant
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              256-bit SSL Secure
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              99.9% Uptime SLA
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              No Ads or Tracking
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
