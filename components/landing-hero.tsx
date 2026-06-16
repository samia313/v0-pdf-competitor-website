'use client'

import Link from 'next/link'
import { ArrowRight, Check, FileText, Zap, Crown, Users, TrendingUp, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function LandingHero() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl opacity-30 rounded-full" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 border px-4 py-1.5 text-sm">
              <Zap className="w-3.5 h-3.5 mr-1" />
              500K+ Users | 4.8★ Rating | 2M+ Files Processed
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
              The PDF Tool That Actually Works
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              27 powerful PDF tools. One simple platform. Process unlimited files with Pro—10% cheaper than competitors. Trusted by professionals worldwide.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/tools/merge-pdf">
              <Button size="lg" className="w-full sm:w-auto h-12 text-base">
                Start Free - No Card Needed
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 text-base">
                See Pro Plans ($9.99/mo)
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-12 border-t border-border/50">
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl font-bold">500K+</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl font-bold">2M+</p>
              <p className="text-sm text-muted-foreground">Files/Month</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl font-bold">4.8★</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why PDFilio Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Why PDFilio Wins vs iLovePDF
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Same tools. Better price. Advanced features they don&apos;t have.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: '10% Cheaper',
                description: 'Pro at $9.99/month vs iLovePDF at $12+. Save $24-36/year.'
              },
              {
                icon: Zap,
                title: '27+ PDF Tools',
                description: 'Complete suite: merge, compress, convert, edit, sign, watermark & more.'
              },
              {
                icon: Lock,
                title: 'Advanced Redaction',
                description: 'Auto-detect & hide sensitive data (emails, SSN, phone). GDPR compliant.'
              },
              {
                icon: Crown,
                title: 'AI-Powered Tools',
                description: 'Summarize PDFs instantly. Translate to 100+ languages with AI.'
              },
              {
                icon: Users,
                title: 'Batch Processing',
                description: 'Process 10 PDFs at once. Save hours weekly with automation.'
              },
              {
                icon: FileText,
                title: 'PDF Comparison',
                description: 'Unique: Compare PDFs side-by-side & highlight all differences.'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="relative border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Loved by 500K+ Users Worldwide
            </h2>
            <p className="text-lg text-muted-foreground">Real feedback from real users</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: '"Switched from iLovePDF and saved $30/year. The redaction tool is way better!"',
                author: 'Ahmed Hassan',
                role: 'Lawyer, Pakistan',
                emoji: '⚖️'
              },
              {
                text: '"AI summarizer saved me 3 hours on document review. Game-changing feature."',
                author: 'Sarah Khan',
                role: 'Business Analyst',
                emoji: '💼'
              },
              {
                text: '"Processing 50 files daily is now instant. Batch processing is revolutionary."',
                author: 'Muhammad Ali',
                role: 'Freelancer, UAE',
                emoji: '🚀'
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary">★</span>
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">{testimonial.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{testimonial.emoji}</div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Ready to Switch? Join 500K+ Happy Users
            </h2>
            <p className="text-lg text-muted-foreground">
              Save money. Get better features. Keep your data secure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/merge-pdf">
              <Button size="lg" className="w-full sm:w-auto h-12 text-base">
                Start Processing for Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 text-base">
                View Pro Plans
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            ✓ No credit card required  |  ✓ Get 5 free files today  |  ✓ Cancel anytime
          </p>
        </div>
      </section>
    </>
  )
}
