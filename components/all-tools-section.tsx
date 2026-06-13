'use client'

import Link from 'next/link'
import { pdfTools, categories } from '@/lib/tools-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ToolIcon } from './tool-icon'
import { ArrowRight } from 'lucide-react'

export function AllToolsSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            All 27+ PDF Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to work with PDFs. Completely free to get started.
          </p>
        </div>

        {/* Tools by Category */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryTools = pdfTools.filter((tool) => tool.category === category.id)
            if (categoryTools.length === 0) return null

            return (
              <div key={category.id}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <ToolIcon icon={category.icon} className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                  <span className="text-sm font-medium text-muted-foreground ml-auto">
                    {categoryTools.length} tools
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryTools.map((tool) => (
                    <Link key={tool.id} href={tool.href}>
                      <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-200 cursor-pointer group">
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                            <ToolIcon icon={tool.icon} className="h-6 w-6 text-white" />
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {tool.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {tool.description}
                          </p>
                        </CardContent>
                        <div className="px-6 pb-4">
                          <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                            Try Now <ArrowRight className="w-4 h-4 ml-2" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <p className="text-muted-foreground mb-6">
            All tools are free to try. Upgrade to Pro for unlimited files and batch processing.
          </p>
          <Link href="/pricing">
            <Button size="lg">
              Upgrade to Pro Plan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
