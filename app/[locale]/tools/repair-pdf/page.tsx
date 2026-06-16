'use client'

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Wrench, Download, Loader2 } from 'lucide-react'

export default function RepairPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    if (newFiles.length > 0) setFiles([newFiles[0]])
  }, [])

  const handleRemoveFile = useCallback(() => setFiles([]), [])

  const handleRepair = async () => {
    if (files.length === 0) return
    setIsProcessing(true)

    try {
      const fileBuffer = await files[0].arrayBuffer()
      const pdf = await PDFDocument.load(fileBuffer, { ignoreEncryption: true })
      
      const repairedPdf = await PDFDocument.create()
      const pages = await repairedPdf.copyPages(pdf, pdf.getPageIndices())
      pages.forEach((page) => repairedPdf.addPage(page))
      
      const pdfBytes = await repairedPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, `repaired_${files[0].name}`)
    } catch (error) {
      console.error('Error repairing PDF:', error)
      alert('Error repairing PDF. The file may be too damaged.')
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 text-white mb-4">
                  <Wrench className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Repair PDF</h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Fix corrupted or damaged PDF files and recover your data
                </p>
              </div>

              <AdBanner slot="repair-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop a corrupted PDF here"
                  description="or click to browse"
                />

                {files.length > 0 && (
                  <Button
                    size="lg"
                    className="w-full mt-6"
                    onClick={handleRepair}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Repairing...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Repair & Download
                      </>
                    )}
                  </Button>
                )}
              </div>

              <AdBanner slot="repair-bottom" className="mt-12" />
            </div>

            <AdSidebar slot="repair-sidebar" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
