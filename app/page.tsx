import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LandingHero } from '@/components/landing-hero'
import { ComparisonSection } from '@/components/comparison-section'

export const metadata: Metadata = {
  title: 'PDFilio - Best PDF Tool (Better Than iLovePDF)',
  description: '27+ PDF tools. 10% cheaper than iLovePDF ($9.99/mo). Advanced redaction, AI summarizer, batch processing. 500K+ users trust PDFilio.',
  keywords: 'best PDF tool, PDF merger, PDF converter, PDF editor, alternative to iLovePDF, free PDF tools',
}

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-background">
      <Header />
      <LandingHero />
      <ComparisonSection />
      <Footer />
    </div>
  )
}

