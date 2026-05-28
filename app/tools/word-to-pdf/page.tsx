'use client'

import { useState, useCallback } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { FileText, Download, Loader2 } from 'lucide-react'

export default function WordToPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
  }, [])

  const handleConvert = async () => {
    if (files.length === 0) return
    setIsProcessing(true)

    try {
      // Note: Converting Word to PDF requires server-side processing
      // This is a demo showing the UI
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Word to PDF conversion requires server-side processing. This demo shows the tool workflow.')
    } catch (error) {
      console.error('Error:', error)
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white mb-4">
                  <FileText className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Word to PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Convert your Word documents to PDF format.
                </p>
              </div>

              <AdBanner slot="word-pdf-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                    'application/msword': ['.doc']
                  }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop a Word document here"
                  description=".doc, .docx files supported"
                />

                {files.length > 0 && (
                  <div className="mt-6">
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

              <AdBanner slot="word-pdf-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>Convert Word to PDF</h2>
                <p>
                  Transform your Microsoft Word documents into PDF format while preserving
                  formatting, fonts, and layout.
                </p>
              </div>
            </div>

            <AdSidebar slot="word-pdf-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
