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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Image, Download, Loader2 } from 'lucide-react'

export default function JpgToPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [pageSize, setPageSize] = useState<'fit' | 'a4' | 'letter'>('a4')
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleConvert = async () => {
    if (files.length === 0) return

    setIsProcessing(true)

    try {
      const pdf = await PDFDocument.create()
      
      const pageSizes = {
        a4: { width: 595.28, height: 841.89 },
        letter: { width: 612, height: 792 },
        fit: { width: 0, height: 0 }
      }

      for (const file of files) {
        const imageBytes = await file.arrayBuffer()
        let image
        
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdf.embedJpg(imageBytes)
        } else if (file.type === 'image/png') {
          image = await pdf.embedPng(imageBytes)
        } else {
          continue
        }

        let pageWidth: number
        let pageHeight: number

        if (pageSize === 'fit') {
          pageWidth = image.width
          pageHeight = image.height
        } else {
          const size = pageSizes[pageSize]
          if (orientation === 'landscape') {
            pageWidth = size.height
            pageHeight = size.width
          } else {
            pageWidth = size.width
            pageHeight = size.height
          }
        }

        const page = pdf.addPage([pageWidth, pageHeight])
        
        // Calculate image dimensions to fit the page while maintaining aspect ratio
        const imgAspect = image.width / image.height
        const pageAspect = pageWidth / pageHeight
        
        let drawWidth: number
        let drawHeight: number

        if (pageSize === 'fit') {
          drawWidth = image.width
          drawHeight = image.height
        } else if (imgAspect > pageAspect) {
          drawWidth = pageWidth * 0.9
          drawHeight = drawWidth / imgAspect
        } else {
          drawHeight = pageHeight * 0.9
          drawWidth = drawHeight * imgAspect
        }

        const x = (pageWidth - drawWidth) / 2
        const y = (pageHeight - drawHeight) / 2

        page.drawImage(image, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        })
      }

      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'images.pdf')
    } catch (error) {
      console.error('Error converting images to PDF:', error)
      alert('Error converting images. Please make sure all files are valid JPG or PNG images.')
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
            {/* Main Content */}
            <div className="flex-1 max-w-4xl mx-auto">
              {/* Tool Header */}
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500 text-white mb-4">
                  <Image className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  JPG to PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Convert your images to PDF format. Supports JPG, JPEG, and PNG files.
                </p>
              </div>

              {/* Ad Banner */}
              <AdBanner slot="jpg-pdf-top" className="mb-8" />

              {/* Upload Area */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 
                    'image/jpeg': ['.jpg', '.jpeg'],
                    'image/png': ['.png']
                  }}
                  maxFiles={50}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop images here"
                  description="JPG, JPEG, PNG (max 50 files)"
                />

                {files.length > 0 && (
                  <div className="mt-6 space-y-6">
                    {/* Options */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Page Size</Label>
                        <Select value={pageSize} onValueChange={(v) => setPageSize(v as any)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a4">A4</SelectItem>
                            <SelectItem value="letter">Letter</SelectItem>
                            <SelectItem value="fit">Fit to Image</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Orientation</Label>
                        <Select value={orientation} onValueChange={(v) => setOrientation(v as any)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="portrait">Portrait</SelectItem>
                            <SelectItem value="landscape">Landscape</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full text-base"
                      onClick={handleConvert}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" />
                          Convert to PDF
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Ad Banner */}
              <AdBanner slot="jpg-pdf-bottom" className="mt-12" />

              {/* SEO Content */}
              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>How to Convert Images to PDF</h2>
                <p>
                  Easily convert your JPG, JPEG, or PNG images to a single PDF document.
                  Perfect for creating photo albums, combining scanned documents, or preparing files for printing.
                </p>
                <h3>Features</h3>
                <ul>
                  <li>Convert multiple images at once</li>
                  <li>Choose from A4, Letter, or custom page sizes</li>
                  <li>Support for portrait and landscape orientation</li>
                  <li>Images are automatically centered on each page</li>
                </ul>
              </div>
            </div>

            {/* Sidebar Ad */}
            <AdSidebar slot="jpg-pdf-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
