'use client'

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Camera, Download, Loader2 } from 'lucide-react'

export default function ScanToPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

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
      
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          const imageData = await file.arrayBuffer()
          const image = await pdf.embedPng(imageData)
          const page = pdf.addPage([image.width, image.height])
          page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height })
        }
      }
      
      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'scans.pdf')
    } catch (error) {
      console.error('Error converting scans:', error)
      alert('Error creating PDF from scans.')
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white mb-4">
                  <Camera className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Scan to PDF</h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Convert document scans and images into a PDF
                </p>
              </div>

              <AdBanner slot="scan-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'] }}
                  maxFiles={20}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop scan images here"
                  description="or click to browse (up to 20 images)"
                />

                {files.length > 0 && (
                  <Button
                    size="lg"
                    className="w-full mt-6"
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
                        Create PDF
                      </>
                    )}
                  </Button>
                )}
              </div>

              <AdBanner slot="scan-bottom" className="mt-12" />
            </div>

            <AdSidebar slot="scan-sidebar" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
