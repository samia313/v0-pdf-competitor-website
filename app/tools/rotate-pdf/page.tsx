'use client'

import { useState, useCallback } from 'react'
import { PDFDocument, degrees } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RotateCw, Download, Loader2, RotateCcw } from 'lucide-react'

export default function RotatePdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [rotation, setRotation] = useState(90)
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

  const handleRotate = async () => {
    if (files.length === 0) return

    setIsProcessing(true)

    try {
      const fileBuffer = await files[0].arrayBuffer()
      const pdf = await PDFDocument.load(fileBuffer)
      
      const pages = pdf.getPages()
      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle
        page.setRotation(degrees(currentRotation + rotation))
      })

      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, `rotated_${files[0].name}`)
    } catch (error) {
      console.error('Error rotating PDF:', error)
      alert('Error rotating PDF. Please make sure the file is a valid PDF.')
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white mb-4">
                  <RotateCw className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Rotate PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Rotate all pages in your PDF to the correct orientation.
                </p>
              </div>

              {/* Ad Banner */}
              <AdBanner slot="rotate-top" className="mb-8" />

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

                    {/* Rotation Options */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Rotation Angle</Label>
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { value: 90, label: '90° CW', icon: RotateCw },
                          { value: 180, label: '180°', icon: RotateCw },
                          { value: 270, label: '90° CCW', icon: RotateCcw },
                          { value: -90, label: '90° CCW', icon: RotateCcw },
                        ].slice(0, 3).concat([{ value: -90, label: '270°', icon: RotateCw }]).slice(0,4).map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setRotation(option.value)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              rotation === option.value
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <option.icon className={`h-6 w-6 mx-auto mb-2 ${rotation === option.value ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span className={`text-sm font-medium block ${rotation === option.value ? 'text-primary' : 'text-foreground'}`}>
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full text-base"
                      onClick={handleRotate}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Rotating...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" />
                          Rotate & Download
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Ad Banner */}
              <AdBanner slot="rotate-bottom" className="mt-12" />

              {/* SEO Content */}
              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>How to Rotate PDF Pages</h2>
                <p>
                  Quickly rotate all pages in your PDF document. Perfect for fixing scanned documents
                  or documents that were saved in the wrong orientation.
                </p>
                <h3>Rotation Options</h3>
                <ul>
                  <li><strong>90° Clockwise:</strong> Rotate pages to the right</li>
                  <li><strong>180°:</strong> Turn pages upside down</li>
                  <li><strong>90° Counter-clockwise:</strong> Rotate pages to the left</li>
                </ul>
              </div>
            </div>

            {/* Sidebar Ad */}
            <AdSidebar slot="rotate-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
