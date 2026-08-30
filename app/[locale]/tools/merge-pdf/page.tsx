'use client'

import { useState, useCallback } from 'react'
import type { Metadata } from 'next'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Merge, Download, Loader2, ArrowUp, ArrowDown, Trash2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Merge PDF Online | Combine PDF Files | PDFilio',
  description: 'Combine multiple PDF files into one document online. Arrange your files, merge them, and download the resulting PDF.',
  alternates: { canonical: 'https://www.pdfilio.com/tools/merge-pdf' },
  robots: { index: true, follow: true },
}

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null)

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleMoveFile = useCallback((index: number, direction: 'up' | 'down') => {
    setFiles((prev) => {
      const newFiles = [...prev]
      const newIndex = direction === 'up' ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= newFiles.length) return prev
      ;[newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]]
      return newFiles
    })
  }, [])

  const handleMerge = async () => {
    if (files.length < 2) return
    setIsProcessing(true)
    setProgress(0)
    try {
      const mergedPdf = await PDFDocument.create()
      for (let i = 0; i < files.length; i++) {
        const fileBuffer = await files[i].arrayBuffer()
        const pdf = await PDFDocument.load(fileBuffer)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        pages.forEach((page) => mergedPdf.addPage(page))
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }
      const mergedPdfBytes = await mergedPdf.save()
      const zip = new JSZip()
      zip.file('merged.pdf', mergedPdfBytes)
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      setMergedBlob(zipBlob)
    } catch (error) {
      console.error('[PDFilio] Error merging PDFs:', error)
      alert('Error merging PDFs. Please make sure all files are valid PDFs.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!mergedBlob) return
    saveAs(mergedBlob, 'merged-pdfs.zip')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500 text-white mb-4">
                  <Merge className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Merge PDF</h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Combine multiple PDF files into one document. Fast, free, and secure.
                </p>
              </div>
              <FileUploader onFilesSelected={handleFilesSelected} multiple accept="application/pdf" />
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  {files.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="truncate">{file.name}</span>
                      <div className="flex gap-2">
                        <Button onClick={() => handleMoveFile(index, 'up')} disabled={index === 0} size="sm" variant="outline"><ArrowUp className="h-4 w-4" /></Button>
                        <Button onClick={() => handleMoveFile(index, 'down')} disabled={index === files.length - 1} size="sm" variant="outline"><ArrowDown className="h-4 w-4" /></Button>
                        <Button onClick={() => handleRemoveFile(index)} size="sm" variant="outline"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                  <Button onClick={handleMerge} disabled={files.length < 2 || isProcessing} className="w-full">
                    {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing {progress}%</> : 'Merge PDFs'}
                  </Button>
                  {mergedBlob && (
                    <Button onClick={handleDownload} className="w-full"><Download className="mr-2 h-4 w-4" />Download your file</Button>
                  )}
                </div>
              )}
              <AdBanner slot="merge-pdf-bottom" className="mt-10" />
            </div>
            <AdSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}