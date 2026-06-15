import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AllToolsSection } from '@/components/all-tools-section'
import { PremiumFeaturedSection } from '@/components/premium-featured-section'

export const metadata: Metadata = {
  title: 'PDFilio - Best PDF Tool (Better Than iLovePDF)',
  description: '27+ PDF tools. 10% cheaper than iLovePDF ($9.99/mo). Advanced redaction, AI summarizer, batch processing. Free online PDF tools.',
  keywords: 'best PDF tool, PDF merger, PDF converter, PDF editor, alternative to iLovePDF, free PDF tools',
}

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-background">
      <Header />
      <PremiumFeaturedSection />
      <AllToolsSection />
      <Footer />
    </div>
  )
}

