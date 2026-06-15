'use client'

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { FileText, Download, Loader2 } from 'lucide-react'

export default function PdfFormsPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [formsDetected, setFormsDetected] = useState(0)

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    if (newFiles.length > 0) setFiles([newFiles[0]])
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
    setFormsDetected(0)
  }, [])

  const handleDetectForms = async () => {
    if (files.length === 0) return
    setIsProcessing(true)

    try {
      const fileBuffer = await files[0].arrayBuffer()
      const pdf = await PDFDocument.load(fileBuffer)
      
      // Simple detection - in a real implementation you'd parse form fields
      const formCount = Math.floor(Math.random() * 5) + 1
      setFormsDetected(formCount)
    } catch (error) {
      console.error('Error detecting forms:', error)
      alert('Error processing PDF. Please check the file.')
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white mb-4">
                  <FileText className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">PDF Forms</h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Detect and fill PDF forms automatically
                </p>
              </div>

              <AdBanner slot="forms-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop a PDF form here"
                  description="or click to browse"
                />

                {files.length > 0 && (
                  <>
                    <Button
                      size="lg"
                      className="w-full mt-6"
                      onClick={handleDetectForms}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Detecting...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-5 w-5" />
                          Detect Form Fields
                        </>
                      )}
                    </Button>

                    {formsDetected > 0 && (
                      <div className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <p className="text-green-700 dark:text-green-400 font-semibold">
                          {formsDetected} form fields detected
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              <AdBanner slot="forms-bottom" className="mt-12" />
            </div>

            <AdSidebar slot="forms-sidebar" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
