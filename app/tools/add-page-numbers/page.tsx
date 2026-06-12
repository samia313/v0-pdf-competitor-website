'use client'

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Hash, Download, Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function AddPageNumbersPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [addpagenumbersPdfBlob, setAddPageNumbersPdfBlob] = useState<Blob | null>(null)
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right' | 'top-left'>('bottom-center')
  const [startNumber, setStartNumber] = useState(1)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
  }, [])

  const handleAddPageNumbers = async () => {
    if (files.length === 0) return

    setIsProcessing(true)

    try {
      const fileBuffer = await files[0].arrayBuffer()
      const pdf = await PDFDocument.load(fileBuffer)
      const pages = pdf.getPages()
      const { StandardFonts, rgb } = await import('pdf-lib')
      const font = await pdf.embedFont(StandardFonts.Helvetica)
      
      pages.forEach((page, index) => {
        const { width, height } = page.getSize()
        const pageNum = index + startNumber
        const text = `${pageNum}`
        const textWidth = font.widthOfTextAtSize(text, 12)
        
        let x: number
        let y: number

        switch (position) {
          case 'bottom-center':
            x = (width - textWidth) / 2
            y = 30
            break
          case 'bottom-right':
            x = width - textWidth - 40
            y = 30
            break
          case 'bottom-left':
            x = 40
            y = 30
            break
          case 'top-center':
            x = (width - textWidth) / 2
            y = height - 40
            break
          case 'top-right':
            x = width - textWidth - 40
            y = height - 40
            break
          case 'top-left':
            x = 40
            y = height - 40
            break
          default:
            x = (width - textWidth) / 2
            y = 30
        }

        page.drawText(text, {
          x,
          y,
          size: 12,
          font,
          color: rgb(0.3, 0.3, 0.3),
        })
      })

      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, `numbered_${files[0].name}`)
    } catch (error) {
      console.error('Error adding page numbers:', error)
      alert('Error adding page numbers. Please make sure the file is a valid PDF.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!addpagenumbersPdfBlob) return
    saveAs(addpagenumbersPdfBlob, 'addpagenumbers.pdf')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500 text-white mb-4">
                  <Hash className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Add Page Numbers
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Add page numbers to your PDF document automatically.
                </p>
              </div>

              <AdBanner slot="pagenumbers-top" className="mb-8" />

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
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Select value={position} onValueChange={(v) => setPosition(v as any)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bottom-center">Bottom Center</SelectItem>
                          <SelectItem value="bottom-right">Bottom Right</SelectItem>
                          <SelectItem value="bottom-left">Bottom Left</SelectItem>
                          <SelectItem value="top-center">Top Center</SelectItem>
                          <SelectItem value="top-right">Top Right</SelectItem>
                          <SelectItem value="top-left">Top Left</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      size="lg"
                      className="flex-1 text-base"
                      onClick={handleAddPageNumbers}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-5 w-5" />
                          Add Numbers & Download
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <AdBanner slot="pagenumbers-bottom" className="mt-12" />
            </div>

            <AdSidebar slot="pagenumbers-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
