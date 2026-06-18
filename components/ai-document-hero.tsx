'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2, FileText, MessageSquare, BookOpen, Zap, BarChart3, Globe } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  label: string
  href: string
}

const features: Feature[] = [
  {
    icon: <FileText className="w-5 h-5" />,
    label: 'Chat With PDF',
    href: '/tools/chat-with-pdf'
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: 'AI Notes',
    href: '/tools/ai-document-assistant'
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: 'Flashcards',
    href: '/tools/ai-pdf-quiz'
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    label: 'Data Extraction',
    href: '/tools/ocr-text-extraction'
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: 'Contract Analysis',
    href: '/tools/ai-contract-reader'
  },
  {
    icon: <Globe className="w-5 h-5" />,
    label: 'Translation',
    href: '/tools/translate-pdf'
  }
]

const trustPoints = [
  'No Credit Card Required',
  'Secure File Processing',
  'Auto File Deletion',
  'AI-Powered Analysis'
]

const mockupInsights = [
  '12 Key Insights',
  '5 Main Findings',
  '20 Flashcards Generated'
]

export function AIDocumentHero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="w-full bg-gradient-to-b from-background via-background to-primary/5">
      {/* Top Badge */}
      <div className="flex justify-center pt-8 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
          <span className="text-sm font-medium text-primary">✨ AI-Powered</span>
          <span className="text-xs text-muted-foreground">PDF & Document Intelligence Platform</span>
        </div>
      </div>

      {/* Main Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
                AI-Powered Document Workspace
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary/80">
                For Summaries, Notes, Flashcards & Analysis
              </h2>
            </div>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Upload PDFs, generate summaries,
              <br />
              create notes, build flashcards,
              <br />
              analyze contracts, extract data,
              <br />
              and chat with documents —
              <br />
              all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8">
                  Start Free
                </Button>
              </Link>
              <Link href="/tools/ai-document-assistant">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto text-lg h-12 px-8"
                >
                  Try AI Assistant
                </Button>
              </Link>
            </div>

            {/* Trust Points */}
            <div className="space-y-3 pt-4">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Interactive Mockup */}
          <div className="relative">
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-3xl opacity-50" />
            
            {/* Mockup Card */}
            <div 
              className="relative bg-card border border-border/50 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-primary/50 backdrop-blur-sm"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/30">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">📄 Research Paper.pdf</div>
                  <div className="text-xs text-muted-foreground">Processed with AI</div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  AI Summary Generated
                </div>
                
                {/* Insights Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {mockupInsights.map((insight) => (
                    <div 
                      key={insight}
                      className={`bg-primary/5 border border-primary/20 rounded-lg p-3 text-center transition-all duration-300 ${
                        isHovered ? 'bg-primary/10 border-primary/40' : ''
                      }`}
                    >
                      <div className="text-xs font-medium text-primary">{insight}</div>
                    </div>
                  ))}
                </div>

                {/* Export Button */}
                <button className="w-full mt-6 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors border border-primary/20 flex items-center justify-center gap-2">
                  <span>📥</span>
                  <span>Export Notes</span>
                </button>
              </div>

              {/* Animated Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="relative w-2 h-2 bg-green-500 rounded-full">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
                <span className="text-xs text-muted-foreground">Live Processing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="mt-16 sm:mt-20 pt-16 sm:pt-20 border-t border-border/30">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Core Features</p>
            <h3 className="text-2xl sm:text-3xl font-bold">Powerful AI-Powered Tools</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <Link key={feature.label} href={feature.href}>
                <button className="w-full flex items-center gap-3 px-6 py-4 rounded-xl border border-border/50 hover:border-primary/50 bg-card/50 hover:bg-card transition-all duration-200 group">
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {feature.label}
                  </span>
                  <span className="ml-auto text-muted-foreground group-hover:text-primary transition-colors">
                    →
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 sm:mt-20 pt-16 sm:pt-20 border-t border-border/30 text-center">
          <p className="text-lg sm:text-xl font-semibold mb-4">
            Trusted by Students, Researchers, Professionals and Businesses Worldwide
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>10,000+ Documents Processed</span>
            </div>
            <div className="h-4 w-px bg-border/30 hidden sm:block" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>AI-Powered Analysis</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
/* Cache invalidation: 1781797730 */
