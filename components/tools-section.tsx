'use client'

import Link from 'next/link'
import { pdfTools } from '@/lib/tools-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ToolIcon } from './tool-icon'
import { ArrowRight } from 'lucide-react'

export function ToolsSection() {
  // Get top 8 popular tools
  const popularTools = pdfTools.filter(tool => tool.popular).slice(0, 8)
  
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Popular PDF Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Most-used tools to get started instantly
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTools.map((tool) => (
            <Link key={tool.id} href={tool.href}>
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <ToolIcon icon={tool.icon} className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* All Tools CTA */}
        <div className="text-center pt-8">
          <Link href="/tools">
            <Button size="lg" variant="outline" className="gap-2">
              View All 27+ Tools
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
