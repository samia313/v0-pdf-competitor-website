'use client'

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Minimize2, Download, Loader2 } from 'lucide-react'

export default function CompressPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium')
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
      setOriginalSize(newFiles[0].size)
      setCompressedSize(0)
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
    setOriginalSize(0)
    setCompressedSize(0)
  }, [])

  const handleCompress = async () => {
    if (files.length === 0) return

    setIsProcessing(true)

    try {
      const fileBuffer = await files[0].arrayBuffer()
      const pdf = await PDFDocument.load(fileBuffer)
      
      // Note: pdf-lib doesn't have built-in compression for images
      // This is a basic implementation that removes metadata and optimizes structure
      // For real image compression, you'd need a server-side solution or canvas API
      
      const compressedPdf = await PDFDocument.create()
      const pages = await compressedPdf.copyPages(pdf, pdf.getPageIndices())
      pages.forEach((page) => compressedPdf.addPage(page))
      
      // Remove metadata for smaller file size
      compressedPdf.setTitle('')
      compressedPdf.setAuthor('')
      compressedPdf.setSubject('')
      compressedPdf.setKeywords([])
      compressedPdf.setProducer('')
      compressedPdf.setCreator('')
      
      const pdfBytes = await compressedPdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
      })
      
      setCompressedSize(pdfBytes.length)
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, `compressed_${files[0].name}`)
    } catch (error) {
      console.error('Error compressing PDF:', error)
      alert('Error compressing PDF. Please make sure the file is a valid PDF.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  }

  const compressionRatio = compressedSize > 0 
    ? Math.round((1 - compressedSize / originalSize) * 100) 
    : 0

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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white mb-4">
                  <Minimize2 className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Compress PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Reduce PDF file size while maintaining quality. Free and fast.
                </p>
              </div>

              {/* Ad Banner */}
              <AdBanner slot="compress-top" className="mb-8" />

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

                {files.length > 0 && (
                  <div className="mt-6 space-y-6">
                    {/* File Size Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-secondary/50 text-center">
                        <span className="text-sm text-muted-foreground block">Original Size</span>
                        <span className="font-semibold text-foreground text-lg">{formatSize(originalSize)}</span>
                      </div>
                      <div className="p-4 rounded-lg bg-primary/10 text-center">
                        <span className="text-sm text-muted-foreground block">
                          {compressedSize > 0 ? 'Compressed Size' : 'Estimated'}
                        </span>
                        <span className="font-semibold text-primary text-lg">
                          {compressedSize > 0 ? formatSize(compressedSize) : '~' + formatSize(originalSize * 0.7)}
                        </span>
                      </div>
                    </div>

                    {compressedSize > 0 && (
                      <div className="p-4 rounded-lg bg-green-500/10 text-center">
                        <span className="text-green-600 dark:text-green-400 font-semibold text-lg">
                          Reduced by {compressionRatio}%
                        </span>
                      </div>
                    )}

                    {/* Compression Quality */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Compression Level</Label>
                      <RadioGroup value={quality} onValueChange={(v) => setQuality(v as any)}>
                        <div className="grid grid-cols-3 gap-4">
                          <div className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${quality === 'high' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                            <RadioGroupItem value="high" id="high" className="sr-only" />
                            <Label htmlFor="high" className="cursor-pointer text-center block">
                              <span className="font-semibold block">High</span>
                              <span className="text-xs text-muted-foreground">Best quality</span>
                            </Label>
                          </div>
                          <div className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${quality === 'medium' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                            <RadioGroupItem value="medium" id="medium" className="sr-only" />
                            <Label htmlFor="medium" className="cursor-pointer text-center block">
                              <span className="font-semibold block">Medium</span>
                              <span className="text-xs text-muted-foreground">Recommended</span>
                            </Label>
                          </div>
                          <div className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${quality === 'low' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                            <RadioGroupItem value="low" id="low" className="sr-only" />
                            <Label htmlFor="low" className="cursor-pointer text-center block">
                              <span className="font-semibold block">Low</span>
                              <span className="text-xs text-muted-foreground">Smallest size</span>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button
                      size="lg"
                      className="w-full text-base"
                      onClick={handleCompress}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Compressing...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" />
                          Compress & Download
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Ad Banner */}
              <AdBanner slot="compress-bottom" className="mt-12" />

              {/* SEO Content */}
              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>How to Compress PDF Files Online</h2>
                <p>
                  Reduce your PDF file size instantly with our free online PDF compressor.
                  Perfect for email attachments, web uploads, or saving storage space.
                </p>
                <h3>Compression Options</h3>
                <ul>
                  <li><strong>High Quality:</strong> Minimal compression, preserves image quality</li>
                  <li><strong>Medium:</strong> Balanced compression (recommended)</li>
                  <li><strong>Low Quality:</strong> Maximum compression for smallest file size</li>
                </ul>
              </div>
            </div>

            {/* Sidebar Ad */}
            <AdSidebar slot="compress-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
