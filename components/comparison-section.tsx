'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export function ComparisonSection() {
  return (
    <>
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
                  ['Pro Plan Price', '$9.99/mo', '$12/mo', '$12/mo'],
                  ['PDF Tools', '27+', '30+', '20+'],
                  ['PDF Editor', 'Advanced', 'Basic', 'Basic'],
                  ['Redaction Tool', 'Advanced AI', 'No', 'No'],
                  ['AI Summarizer', 'Yes', 'No', 'No'],
                  ['AI Translator', '100+ Languages', 'No', 'No'],
                  ['PDF Comparison', 'Yes (Unique)', 'No', 'No'],
                  ['Batch Processing', 'Yes', 'No', 'No'],
                  ['E-Signatures', 'Certified', 'Basic', 'Basic'],
                  ['No Watermark', 'Pro+', 'Pro+', 'Pro+'],
                  ['Files/Day Pro', '100+', '100+', '100+'],
                  ['API Access', 'Business Tier', 'No', 'Yes']
                ].map((row, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-medium">{row[0]}</td>
                    <td className="text-center py-4 px-4 text-primary font-semibold">{row[1]}</td>
                    <td className="text-center py-4 px-4 text-muted-foreground">{row[2]}</td>
                    <td className="text-center py-4 px-4 text-muted-foreground">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              ✓ Included  |  🔄 Coming Soon  |  ✗ Not Available
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
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
