'use client'

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Merge, Download, Loader2, ArrowUp, ArrowDown, Trash2 } from 'lucide-react'

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null)

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleMoveFile = useCallback((index: number, direction: 'up' | 'down') => {
    setFiles((prev) => {
      const newFiles = [...prev]
      const newIndex = direction === 'up' ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= newFiles.length) return prev
      ;[newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]]
      return newFiles
    })
  }, [])

  const handleMerge = async () => {
    if (files.length < 2) return

    setIsProcessing(true)
    setProgress(0)

    try {
      const mergedPdf = await PDFDocument.create()
      
      for (let i = 0; i < files.length; i++) {
        const fileBuffer = await files[i].arrayBuffer()
        const pdf = await PDFDocument.load(fileBuffer)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        pages.forEach((page) => mergedPdf.addPage(page))
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' })
      
      // Store the blob for download, don't download automatically
      setMergedBlob(blob)
      console.log('[v0] Files merged successfully - stored for download')
    } catch (error) {
      console.error('[v0] Error merging PDFs:', error)
      alert('Error merging PDFs. Please make sure all files are valid PDFs.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!mergedBlob) return
    saveAs(mergedBlob, 'merged.pdf')
    console.log('[v0] PDF downloaded')
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500 text-white mb-4">
                  <Merge className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Merge PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Combine multiple PDF files into one document. Fast, free, and secure.
                </p>
              </div>

              {/* Ad Banner */}
              <AdBanner slot="merge-top" className="mb-8" />

              {/* Upload Area */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={20}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop PDF files here"
                  description="or click to browse (max 20 files)"
                />

                {files.length > 1 && (
                  <div className="mt-6 space-y-4">
                    <h3 className="font-semibold text-foreground">Reorder files (drag or use arrows)</h3>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary font-medium text-sm">
                            {index + 1}
                          </span>
                          <span className="flex-1 truncate text-sm font-medium">{file.name}</span>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleMoveFile(index, 'up')}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleMoveFile(index, 'down')}
                              disabled={index === files.length - 1}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleRemoveFile(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Merge Button Section */}
              {files.length >= 2 && (
                <div className="mt-6 bg-gradient-to-r from-blue-900/40 to-blue-800/20 border border-blue-700/50 rounded-2xl p-6 md:p-8">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Merge?</h3>
                    <p className="text-sm text-muted-foreground mb-6">Click the button below to start merging your PDFs</p>
                  </div>
                  <Button
                    size="lg"
                    className="w-full text-base bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleMerge}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Merging... {progress}%
                      </>
                    ) : (
                      <>
                        <Merge className="mr-2 h-5 w-5" />
                        Start Merge Process
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Download Section - Only shows after processing */}
              {isProcessing === false && mergedBlob && (
                <div className="mt-6 bg-gradient-to-r from-green-900/40 to-green-800/20 border border-green-700/50 rounded-2xl p-6 md:p-8">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-green-400 mb-2">✓ Merge Complete!</h3>
                    <p className="text-sm text-muted-foreground mb-6">Your merged PDF is ready to download</p>
                  </div>
                  <Button
                    size="lg"
                    className="w-full text-base bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleDownload}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Merged PDF
                  </Button>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: 'Upload PDFs',
                    description: 'Select or drag and drop the PDF files you want to merge.',
                  },
                  {
                    title: 'Arrange Order',
                    description: 'Reorder files by dragging or using the arrow buttons.',
                  },
                  {
                    title: 'Download',
                    description: 'Click merge and download your combined PDF file.',
                  },
                ].map((step, index) => (
                  <div key={index} className="text-center p-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-3">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>

              {/* Ad Banner */}
              <AdBanner slot="merge-bottom" className="mt-12" />

              {/* SEO Content */}
              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>How to Merge PDF Files Online</h2>
                <p>
                  pdfilio makes it easy to combine multiple PDF files into a single document. 
                  Our free online PDF merger works directly in your browser - no software installation needed.
                </p>
                <h3>Why Use Our PDF Merger?</h3>
                <ul>
                  <li><strong>Free & Unlimited:</strong> Merge as many PDFs as you need, completely free</li>
                  <li><strong>Secure:</strong> Files are processed locally in your browser and never uploaded to servers</li>
                  <li><strong>Fast:</strong> Advanced technology ensures quick processing</li>
                  <li><strong>Easy to Use:</strong> Simple drag-and-drop interface</li>
                </ul>
              </div>
            </div>

            {/* Sidebar Ad */}
            <AdSidebar slot="merge-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
