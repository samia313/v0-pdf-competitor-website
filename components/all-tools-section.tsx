'use client'

import { useState } from 'react'
import Link from 'next/link'
import { pdfTools } from '@/lib/tools-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ToolIcon } from './tool-icon'

const CATEGORIES = [
  { id: 'all', label: 'All', type: null },
  { id: 'organize', label: 'Organize PDF', type: 'organize' },
  { id: 'optimize', label: 'Optimize PDF', type: 'optimize' },
  { id: 'convert', label: 'Convert PDF', type: 'convert' },
  { id: 'edit', label: 'Edit PDF', type: 'edit' },
  { id: 'security', label: 'PDF Security', type: 'security' },
]

export function AllToolsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredTools =
    selectedCategory === 'all'
      ? pdfTools
      : pdfTools.filter((tool) => tool.category === selectedCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Powerful PDF Tools — Fast, Free & Easy to Use
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Handle any PDF task in seconds — merge files, compress documents, convert formats, add security and much more. No software to install. Works on any device, completely free.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 pt-8">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-border/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {filteredTools.map((tool) => (
              <Link key={tool.id} href={tool.href}>
                <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-200 cursor-pointer group border-border/50">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <ToolIcon icon={tool.icon} className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
