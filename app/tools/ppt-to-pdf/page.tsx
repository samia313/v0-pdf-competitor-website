'use client'

import { useState, useCallback } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { FileType, Download, Loader2 } from 'lucide-react'

export default function PptToPdfPage() {
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
      alert('PowerPoint to PDF conversion requires server-side processing.')
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600 text-white mb-4">
                  <FileType className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">PowerPoint to PDF</h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Convert PowerPoint presentations to PDF format.
                </p>
              </div>
              <AdBanner slot="ppt-pdf-top" className="mb-8" />
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'], 'application/vnd.ms-powerpoint': ['.ppt'] }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop a PowerPoint file here"
                  description=".ppt, .pptx files supported"
                />
                {files.length > 0 && (
                  <div className="mt-6">
                    <Button size="lg" className="w-full text-base" onClick={handleConvert} disabled={isProcessing}>
                      {isProcessing ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Converting...</>) : (<><Download className="mr-2 h-5 w-5" />Convert to PDF</>)}
                    </Button>
                  </div>
                )}
              </div>
              <AdBanner slot="ppt-pdf-bottom" className="mt-12" />
            </div>
            <AdSidebar slot="ppt-pdf-sidebar" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
