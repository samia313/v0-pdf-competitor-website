'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { pdfTools } from '@/lib/tools-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ToolIcon } from './tool-icon'

const HEADING_TEXT = "Powerful PDF Tools — Fast, Free & Easy to Use"

function TypewriterHeading() {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (displayedText.length < HEADING_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(HEADING_TEXT.slice(0, displayedText.length + 1))
      }, 30)
      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [displayedText])

  return (
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight min-h-[1.2em]">
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </h1>
  )
}

export function AllToolsSection() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <TypewriterHeading />
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Handle any PDF task in seconds — merge files, compress documents, convert formats, add security and much more. No software to install. Works on any device, completely free.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {pdfTools.map((tool) => (
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

      {/* Trust Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            Trusted by Professionals Worldwide
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Your Complete PDF Solution
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            PDFilio is the comprehensive platform for all your PDF needs. Process documents with confidence using our advanced tools, secure infrastructure, and commitment to your privacy. Trusted by professionals and businesses globally for reliable, efficient document management.
          </p>
        </div>
      </section>
    </>
  )
}
