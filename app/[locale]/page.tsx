import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AllToolsSection } from '@/components/all-tools-section'
import { PremiumFeaturedSection } from '@/components/premium-featured-section'

// Revalidate homepage every 60 seconds for reliability
export const revalidate = 60

export const metadata: Metadata = {
  title: 'AI Document Workspace - Your Intelligent Document Platform | PDFilio',
  description: 'Transform your workflow with AI Document Workspace. 47+ tools to process, analyze, and optimize documents. Merge, convert, edit PDFs + AI-powered features. Free online, no installation needed.',
  keywords: 'document workspace, AI document processing, PDF tools, document AI, intelligent document management, PDF converter, document automation',
}

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-background">
      <Header />
      <AllToolsSection />
      <PremiumFeaturedSection />
      <Footer />
    </div>
  )
}

