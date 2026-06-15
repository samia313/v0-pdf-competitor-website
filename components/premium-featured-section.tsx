'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Sparkles, FileText, Globe, Database, Scale, BookMarked, Lightbulb } from 'lucide-react'

const aiFeatures = [
  {
    id: 'summarize',
    name: 'Summarize PDF',
    description: 'Get key points and concise summaries of your documents',
    icon: FileText,
    color: 'from-purple-500 to-blue-500',
  },
  {
    id: 'translate',
    name: 'Translate Documents',
    description: 'Translate your PDFs to multiple languages instantly',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'extract',
    name: 'Extract Data',
    description: 'Pull structured data from tables and forms automatically',
    icon: Database,
    color: 'from-cyan-500 to-teal-500',
  },
  {
    id: 'clauses',
    name: 'Find Key Clauses',
    description: 'Identify important sections in legal and contract documents',
    icon: Scale,
    color: 'from-teal-500 to-green-500',
  },
  {
    id: 'notes',
    name: 'Create Notes',
    description: 'Auto-generate comprehensive study notes from content',
    icon: BookMarked,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'flashcards',
    name: 'Generate Flashcards',
    description: 'Create Q&A pairs for effective learning and retention',
    icon: Lightbulb,
    color: 'from-emerald-500 to-purple-500',
  },
]

export function PremiumFeaturedSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/10 via-background to-background border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="border-purple-500/50 bg-purple-500/10 text-purple-400">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium Feature
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI-Powered PDF Analysis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six intelligent features to supercharge your document workflow
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature) => {
            const IconComponent = feature.icon
            return (
              <Link key={feature.id} href="/tools/ai-document-assistant">
                <Card className="h-full hover:shadow-lg hover:border-purple-500/50 transition-all cursor-pointer border-purple-500/20 bg-gradient-to-br from-slate-900/40 to-slate-900/20 hover:from-purple-900/30 hover:to-purple-900/10 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      {feature.id === 'summarize' && (
                        <Badge className="bg-purple-600/80 hover:bg-purple-700 text-xs">Premium</Badge>
                      )}
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
                  <Sparkles className="h-5 w-5 text-purple-400" />
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
                  <Sparkles className="h-5 w-5 text-purple-400" />
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
          <Link href="/tools/ai-document-assistant">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 gap-2">
              Try AI Assistant Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="gap-2 border-purple-500/50 hover:bg-purple-500/10">
              Upgrade to Premium
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
