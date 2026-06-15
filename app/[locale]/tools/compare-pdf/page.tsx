'use client'

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { BarChart3, Download, Loader2 } from 'lucide-react'

export default function ComparePdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [comparisonResult, setComparisonResult] = useState<string>('')

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles].slice(0, 2))
  }, [])

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleCompare = async () => {
    if (files.length < 2) return
    setIsProcessing(true)

    try {
      const file1Buffer = await files[0].arrayBuffer()
      const file2Buffer = await files[1].arrayBuffer()
      
      const pdf1 = await PDFDocument.load(file1Buffer)
      const pdf2 = await PDFDocument.load(file2Buffer)
      
      const pages1 = pdf1.getPageCount()
      const pages2 = pdf2.getPageCount()
      
      const result = `Comparison Results:\n\nFile 1 (${files[0].name}):\n- Pages: ${pages1}\n\nFile 2 (${files[1].name}):\n- Pages: ${pages2}\n\nDifference: ${Math.abs(pages1 - pages2)} pages`
      
      setComparisonResult(result)
    } catch (error) {
      console.error('Error comparing PDFs:', error)
      alert('Error comparing PDFs. Make sure both files are valid PDFs.')
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500 text-white mb-4">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Compare PDF</h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Compare two PDF files side-by-side and spot the differences
                </p>
              </div>

              <AdBanner slot="compare-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={2}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop 2 PDF files to compare"
                  description="or click to browse"
                />

                {files.length === 2 && (
                  <>
                    <Button
                      size="lg"
                      className="w-full mt-6"
                      onClick={handleCompare}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Comparing...
                        </>
                      ) : (
                        <>
                          <BarChart3 className="mr-2 h-5 w-5" />
                          Compare
                        </>
                      )}
                    </Button>

                    {comparisonResult && (
                      <div className="mt-6 p-4 rounded-lg bg-secondary/50 whitespace-pre-wrap text-sm font-mono">
                        {comparisonResult}
                      </div>
                    )}
                  </>
                )}
              </div>

              <AdBanner slot="compare-bottom" className="mt-12" />
            </div>

            <AdSidebar slot="compare-sidebar" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
