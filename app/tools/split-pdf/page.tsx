'use client'

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Scissors, Download, Loader2 } from 'lucide-react'

export default function SplitPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [splitMode, setSplitMode] = useState<'all' | 'range' | 'extract'>('all')
  const [pageRange, setPageRange] = useState('')
  const [totalPages, setTotalPages] = useState(0)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
      try {
        const buffer = await newFiles[0].arrayBuffer()
        const pdf = await PDFDocument.load(buffer)
        setTotalPages(pdf.getPageCount())
      } catch {
        setTotalPages(0)
      }
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
    setTotalPages(0)
  }, [])

  const handleSplit = async () => {
    if (files.length === 0) return

    setIsProcessing(true)

    try {
      const fileBuffer = await files[0].arrayBuffer()
      const pdf = await PDFDocument.load(fileBuffer)
      const pageCount = pdf.getPageCount()

      if (splitMode === 'all') {
        // Split into individual pages
        const zip = new JSZip()
        
        for (let i = 0; i < pageCount; i++) {
          const newPdf = await PDFDocument.create()
          const [page] = await newPdf.copyPages(pdf, [i])
          newPdf.addPage(page)
          const pdfBytes = await newPdf.save()
          zip.file(`page_${i + 1}.pdf`, pdfBytes)
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' })
        saveAs(zipBlob, 'split_pages.zip')
      } else if (splitMode === 'range' || splitMode === 'extract') {
        // Extract specific pages
        const ranges = parsePageRange(pageRange, pageCount)
        if (ranges.length === 0) {
          alert('Please enter a valid page range (e.g., 1-3, 5, 7-9)')
          setIsProcessing(false)
          return
        }

        const newPdf = await PDFDocument.create()
        const pagesToCopy = [...new Set(ranges)].sort((a, b) => a - b)
        const pages = await newPdf.copyPages(pdf, pagesToCopy)
        pages.forEach((page) => newPdf.addPage(page))
        
        const pdfBytes = await newPdf.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        saveAs(blob, 'extracted_pages.pdf')
      }
    } catch (error) {
      console.error('Error splitting PDF:', error)
      alert('Error splitting PDF. Please make sure the file is a valid PDF.')
    } finally {
      setIsProcessing(false)
    }
  }

  const parsePageRange = (range: string, maxPages: number): number[] => {
    const pages: number[] = []
    const parts = range.split(',')
    
    for (const part of parts) {
      const trimmed = part.trim()
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map((n) => parseInt(n.trim()))
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.max(1, start); i <= Math.min(end, maxPages); i++) {
            pages.push(i - 1) // Convert to 0-indexed
          }
        }
      } else {
        const pageNum = parseInt(trimmed)
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPages) {
          pages.push(pageNum - 1) // Convert to 0-indexed
        }
      }
    }
    
    return pages
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl mx-auto">
              {/* Tool Header */}
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white mb-4">
                  <Scissors className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Split PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Extract pages or split a PDF into multiple files. Free and easy to use.
                </p>
              </div>

              {/* Ad Banner */}
              <AdBanner slot="split-top" className="mb-8" />

              {/* Upload Area */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop a PDF file here"
                  description="or click to browse"
                />

                {files.length > 0 && totalPages > 0 && (
                  <div className="mt-6 space-y-6">
                    <div className="p-4 rounded-lg bg-secondary/50 text-center">
                      <span className="text-sm text-muted-foreground">Total pages: </span>
                      <span className="font-semibold text-foreground">{totalPages}</span>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Split Mode</Label>
                      <RadioGroup value={splitMode} onValueChange={(v) => setSplitMode(v as any)}>
                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-secondary/30 transition-colors">
                          <RadioGroupItem value="all" id="all" />
                          <Label htmlFor="all" className="flex-1 cursor-pointer">
                            <span className="font-medium">Split all pages</span>
                            <span className="block text-sm text-muted-foreground">
                              Extract each page as a separate PDF (downloaded as ZIP)
                            </span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-secondary/30 transition-colors">
                          <RadioGroupItem value="extract" id="extract" />
                          <Label htmlFor="extract" className="flex-1 cursor-pointer">
                            <span className="font-medium">Extract specific pages</span>
                            <span className="block text-sm text-muted-foreground">
                              Select pages to extract into a single PDF
                            </span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {(splitMode === 'range' || splitMode === 'extract') && (
                      <div className="space-y-2">
                        <Label htmlFor="pageRange">Page Range</Label>
                        <Input
                          id="pageRange"
                          placeholder="e.g., 1-3, 5, 7-9"
                          value={pageRange}
                          onChange={(e) => setPageRange(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter page numbers separated by commas, or ranges with dashes
                        </p>
                      </div>
                    )}

                    <Button
                      size="lg"
                      className="w-full text-base"
                      onClick={handleSplit}
                      disabled={isProcessing || (splitMode !== 'all' && !pageRange)}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" />
                          {splitMode === 'all' ? 'Split & Download ZIP' : 'Extract & Download PDF'}
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Ad Banner */}
              <AdBanner slot="split-bottom" className="mt-12" />

              {/* SEO Content */}
              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>How to Split PDF Files Online</h2>
                <p>
                  Use pdfilio to split your PDF documents into separate pages or extract specific pages.
                  Our tool works directly in your browser for maximum privacy and speed.
                </p>
                <h3>Split Options</h3>
                <ul>
                  <li><strong>Split All Pages:</strong> Create individual PDF files for each page</li>
                  <li><strong>Extract Pages:</strong> Select specific pages to extract into a new PDF</li>
                </ul>
              </div>
            </div>

            {/* Sidebar Ad */}
            <AdSidebar slot="split-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
