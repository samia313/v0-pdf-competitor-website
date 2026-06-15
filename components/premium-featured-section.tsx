'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ToolIcon } from './tool-icon'
import { ArrowRight, Sparkles, Lock } from 'lucide-react'

export function PremiumFeaturedSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/10 via-background to-background border-b border-purple-500/20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="border-purple-500/50 bg-purple-500/10 text-purple-400">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium Feature
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Document Assistant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your PDFs with artificial intelligence. Summarize, translate, extract data, find clauses, create notes, and generate flashcards — all powered by advanced AI.
          </p>
        </div>

        {/* Feature Card */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Feature Card */}
          <div className="lg:col-span-2">
            <Link href="/tools/ai-document-assistant">
              <Card className="h-full hover:shadow-xl hover:border-purple-500/50 transition-all cursor-pointer border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20 overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform" />
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sparkles className="h-7 w-7 text-white" />
                    </div>
                    <Badge className="bg-purple-600 hover:bg-purple-700">Premium</Badge>
                  </div>
                  <CardTitle className="text-2xl">AI-Powered PDF Analysis</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Six intelligent features to supercharge your document workflow
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      Summarize PDF
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      Translate Documents
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      Extract Data
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      Find Key Clauses
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      Create Notes
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      Generate Flashcards
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 gap-2">
                    Try AI Assistant Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Benefits Cards */}
          <div className="flex flex-col gap-6">
            {/* Speed Card */}
            <Card className="border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30 transition-colors">
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

            {/* Secure Card */}
            <Card className="border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-purple-500/30 flex items-center justify-center mb-3">
                  <Lock className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle className="text-base">Premium Only</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Exclusive to Pro and Business subscribers with rate limiting
                </p>
              </CardContent>
            </Card>

            {/* History Card */}
            <Card className="border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30 transition-colors">
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

        {/* CTA Button */}
        <div className="text-center pt-4">
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
