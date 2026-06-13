'use client'

import { useState, useCallback } from 'react'
import { PDFDocument, PDFPage, rgb } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Crop, Download, Loader2 } from 'lucide-react'

export default function CropPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [cropMargin, setCropMargin] = useState(20)

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    if (newFiles.length > 0) setFiles([newFiles[0]])
  }, [])

  const handleRemoveFile = useCallback(() => setFiles([]), [])

  const handleCrop = async () => {
    if (files.length === 0) return
    setIsProcessing(true)

    try {
      const fileBuffer = await files[0].arrayBuffer()
      const pdf = await PDFDocument.load(fileBuffer)
      
      const pages = pdf.getPages()
      pages.forEach((page) => {
        const { width, height } = page.getSize()
        page.drawRectangle({
          x: cropMargin,
          y: cropMargin,
          width: width - (cropMargin * 2),
          height: height - (cropMargin * 2),
          color: rgb(1, 1, 1),
        })
      })
      
      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, `cropped_${files[0].name}`)
    } catch (error) {
      console.error('Error cropping PDF:', error)
      alert('Error cropping PDF. Please check the file.')
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500 text-white mb-4">
                  <Crop className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Crop PDF</h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Remove margins and crop PDF pages to the exact size you need
                </p>
              </div>

              <AdBanner slot="crop-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop a PDF here"
                  description="or click to browse"
                />

                {files.length > 0 && (
                  <>
                    <div className="mt-6 space-y-4">
                      <label className="block">
                        <span className="text-sm font-medium">Crop Margin: {cropMargin}px</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={cropMargin}
                          onChange={(e) => setCropMargin(Number(e.target.value))}
                          className="w-full mt-2"
                        />
                      </label>
                    </div>

                    <Button
                      size="lg"
                      className="w-full mt-6"
                      onClick={handleCrop}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Cropping...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" />
                          Crop & Download
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>

              <AdBanner slot="crop-bottom" className="mt-12" />
            </div>

            <AdSidebar slot="crop-sidebar" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
