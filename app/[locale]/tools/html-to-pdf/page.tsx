'use client'

import { useState, useCallback } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Code, Download, Loader2 } from 'lucide-react'

export default function HtmlToPdfPage() {
  const [url, setUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleConvert = async () => {
    if (!url) return
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('HTML to PDF conversion requires server-side processing with headless browser.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 text-white mb-4">
                  <Code className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">HTML to PDF</h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Convert web pages to PDF documents.
                </p>
              </div>
              <AdBanner slot="html-pdf-top" className="mb-8" />
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="url">Website URL</Label>
                    <Input
                      id="url"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                    <p className="text-xs text-muted-foreground">Enter the full URL of the page you want to convert</p>
                  </div>
                  <Button size="lg" className="w-full text-base" onClick={handleConvert} disabled={isProcessing || !url}>
                    {isProcessing ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Converting...</>) : (<><Download className="mr-2 h-5 w-5" />Convert to PDF</>)}
                  </Button>
                </div>
              </div>
              <AdBanner slot="html-pdf-bottom" className="mt-12" />
              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>Convert Web Pages to PDF</h2>
                <p>
                  Capture any website as a PDF document. Perfect for saving articles, receipts, or web content for offline viewing.
                </p>
              </div>
            </div>
            <AdSidebar slot="html-pdf-sidebar" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
