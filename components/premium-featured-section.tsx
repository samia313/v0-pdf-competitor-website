'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Sparkles, FileText, Globe, Database, Scale, BookMarked, Lightbulb, MessageSquare, BookOpen, Scan, FileCheck, Shield, Receipt, DollarSign, Brain, Settings } from 'lucide-react'

const aiFeatures = [
  // New Premium Features (6)
  {
    id: 'chat',
    name: 'Chat With PDF',
    description: 'Ask questions about your documents with AI',
    icon: MessageSquare,
    color: 'from-indigo-500 to-blue-500',
    href: '/tools/chat-with-pdf',
    isNew: true,
  },
  {
    id: 'summary',
    name: 'PDF Summary',
    description: 'Generate comprehensive document summaries',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    href: '/tools/pdf-summary',
    isNew: true,
  },
  {
    id: 'translate-ai',
    name: 'PDF Translation',
    description: 'Translate to 10+ languages instantly',
    icon: Globe,
    color: 'from-cyan-500 to-teal-500',
    href: '/tools/pdf-translation',
    isNew: true,
  },
  {
    id: 'ocr',
    name: 'OCR Text Extraction',
    description: 'Extract text from scanned PDFs',
    icon: Scan,
    color: 'from-teal-500 to-green-500',
    href: '/tools/ocr-text-extraction',
    isNew: true,
  },
  {
    id: 'resume',
    name: 'AI Resume Analyzer',
    description: 'Professional resume scoring & feedback',
    icon: FileCheck,
    color: 'from-green-500 to-emerald-500',
    href: '/tools/ai-resume-analyzer',
    isNew: true,
  },
  {
    id: 'contract',
    name: 'AI Contract Reader',
    description: 'Analyze clauses and identify risks',
    icon: Shield,
    color: 'from-emerald-500 to-purple-500',
    href: '/tools/ai-contract-reader',
    isNew: true,
  },
  // 5 Newest Premium Features
  {
    id: 'invoice',
    name: 'AI Invoice Generator',
    description: 'Create professional invoices instantly',
    icon: Receipt,
    color: 'from-amber-500 to-orange-500',
    href: '/tools/ai-invoice-generator',
    isNew: true,
  },
  {
    id: 'coverletter',
    name: 'AI Cover Letter Generator',
    description: 'Generate personalized cover letters',
    icon: FileText,
    color: 'from-blue-500 to-purple-500',
    href: '/tools/ai-cover-letter-generator',
    isNew: true,
  },
  {
    id: 'studynotes',
    name: 'AI Study Notes Generator',
    description: 'Convert PDFs into study notes',
    icon: BookOpen,
    color: 'from-orange-500 to-yellow-500',
    href: '/tools/ai-study-notes-generator',
    isNew: true,
  },
  {
    id: 'quiz',
    name: 'AI PDF Quiz Generator',
    description: 'Create MCQs from PDFs automatically',
    icon: Brain,
    color: 'from-red-500 to-pink-500',
    href: '/tools/ai-pdf-quiz-generator',
    isNew: true,
  },
  {
    id: 'metadata',
    name: 'PDF Metadata Editor',
    description: 'Edit PDF title, author, and keywords',
    icon: Settings,
    color: 'from-slate-500 to-gray-500',
    href: '/tools/pdf-metadata-editor',
    isNew: true,
  },
  // Original AI Features (6)
  {
    id: 'summarize',
    name: 'AI Summarizer',
    description: 'Get key points and concise summaries',
    icon: FileText,
    color: 'from-purple-500 to-pink-500',
    href: '/tools/ai-summarizer',
  },
  {
    id: 'translate',
    name: 'Translate PDF',
    description: 'Translate documents to multiple languages',
    icon: Globe,
    color: 'from-pink-500 to-red-500',
    href: '/tools/translate-pdf',
  },
  {
    id: 'extract',
    name: 'Extract Data',
    description: 'Pull structured data automatically',
    icon: Database,
    color: 'from-red-500 to-orange-500',
    href: '/tools/ai-document-assistant',
  },
  {
    id: 'clauses',
    name: 'Find Key Clauses',
    description: 'Identify important contract sections',
    icon: Scale,
    color: 'from-orange-500 to-yellow-500',
    href: '/tools/ai-document-assistant',
  },
  {
    id: 'notes',
    name: 'Create Notes',
    description: 'Auto-generate study notes',
    icon: BookMarked,
    color: 'from-yellow-500 to-green-500',
    href: '/tools/ai-document-assistant',
  },
  {
    id: 'flashcards',
    name: 'Generate Flashcards',
    description: 'Create Q&A pairs for learning',
    icon: Lightbulb,
    color: 'from-green-500 to-emerald-500',
    href: '/tools/ai-document-assistant',
  },
]

export function PremiumFeaturedSection() {
  const router = useRouter()

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/10 via-background to-background border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="border-purple-500/50 bg-purple-500/10 text-purple-400">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium Features
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            17 AI-Powered Document Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Eleven cutting-edge AI features plus six original premium tools to supercharge your document workflow
          </p>
        </div>

        {/* NEW FEATURES SECTION */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-purple-500/30">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full">
              NEW
            </span>
            <h3 className="text-xl font-bold text-purple-400">Latest Premium Features</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.slice(0, 11).map((feature) => {
              const IconComponent = feature.icon
              return (
                <Link key={feature.id} href={feature.href || '#'}>
                  <Card className="h-full hover:shadow-lg hover:border-purple-500/50 transition-all cursor-pointer border-purple-500/30 bg-gradient-to-br from-slate-900/40 to-slate-900/20 hover:from-purple-900/30 hover:to-purple-900/10 group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs">New</Badge>
                      </div>
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* ORIGINAL FEATURES SECTION */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-purple-500/30">
            <h3 className="text-xl font-bold text-muted-foreground">Original AI Features</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.slice(11).map((feature) => {
              const IconComponent = feature.icon
              return (
                <Link key={feature.id} href={feature.href || '#'}>
                  <Card className="h-full hover:shadow-lg hover:border-purple-500/40 transition-all cursor-pointer border-purple-500/20 bg-gradient-to-br from-slate-900/30 to-slate-900/10 hover:from-purple-900/20 hover:to-purple-900/5 group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 pt-12 border-t border-purple-500/20">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Instant Analysis */}
            <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-purple-900/5 hover:bg-purple-900/30 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-purple-500/30 flex items-center justify-center mb-3">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle className="text-base">Instant Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get results in seconds with real-time streaming AI responses
                </p>
              </CardContent>
            </Card>

            {/* Premium Only */}
            <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-purple-900/5 hover:bg-purple-900/30 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-purple-500/30 flex items-center justify-center mb-3">
                  <Shield className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle className="text-base">Premium Only</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Exclusive to Pro and Business subscribers with rate limiting
                </p>
              </CardContent>
            </Card>

            {/* Keep History */}
            <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-purple-900/5 hover:bg-purple-900/30 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-purple-500/30 flex items-center justify-center mb-3">
                  <FileText className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle className="text-base">Keep History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access all your past analyses and results anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button onClick={() => router.push('/tools/chat-with-pdf')} size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 gap-2">
            Try New AI Features
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button onClick={() => router.push('/pricing')} size="lg" variant="outline" className="gap-2 border-purple-500/50 hover:bg-purple-500/10">
            Upgrade to Premium
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
