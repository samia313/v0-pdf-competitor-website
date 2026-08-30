import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AIDocumentHero } from '@/components/ai-document-hero'
import { PremiumFeaturedSection } from '@/components/premium-featured-section'

export const metadata: Metadata = {
  title: 'Free Online PDF Tools & AI Document Tools | PDFilio',
  description: 'Use PDFilio for free online PDF tools and AI document features. Merge, split, compress, convert, edit, OCR and analyze documents online with no installation required.',
  keywords: 'PDF tools, merge PDF, split PDF, compress PDF, convert PDF, PDF to Word, Word to PDF, PDF editor, free PDF tools, AI PDF tools, OCR PDF',
}

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-background">
      <Header />
      <AIDocumentHero />
      <PremiumFeaturedSection />
      <Footer />
    </div>
  )
}
