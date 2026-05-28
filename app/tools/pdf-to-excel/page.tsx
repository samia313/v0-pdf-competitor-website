'use client'

import { useState, useCallback } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { FileType, Download, Loader2 } from 'lucide-react'

export default function PdfToExcelPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) setFiles([newFiles[0]])
  }, [])

  const handleRemoveFile = useCallback(() => setFiles([]), [])

  const handleConvert = async () => {
    if (files.length === 0) return
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('PDF to Excel conversion requires server-side processing.')
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white mb-4">
                  <FileType className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">PDF to Excel</h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Extract data from PDF to Excel spreadsheets.
                </p>
              </div>
              <AdBanner slot="pdf-excel-top" className="mb-8" />
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
                  <div className="mt-6">
                    <Button size="lg" className="w-full text-base" onClick={handleConvert} disabled={isProcessing}>
                      {isProcessing ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Converting...</>) : (<><Download className="mr-2 h-5 w-5" />Convert to Excel</>)}
                    </Button>
                  </div>
                )}
              </div>
              <AdBanner slot="pdf-excel-bottom" className="mt-12" />
            </div>
            <AdSidebar slot="pdf-excel-sidebar" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
