'use client'

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Trash2, Download, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RemovePagesPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [removedBlob, setRemovedBlob] = useState<Blob | null>(null)
  const [pagesToRemove, setPagesToRemove] = useState('')
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

  const parsePages = (input: string, maxPages: number): number[] => {
    const pages: number[] = []
    const parts = input.split(',')
    
    for (const part of parts) {
      const trimmed = part.trim()
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map((n) => parseInt(n.trim()))
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.max(1, start); i <= Math.min(end, maxPages); i++) {
            pages.push(i - 1)
          }
        }
      } else {
        const pageNum = parseInt(trimmed)
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPages) {
          pages.push(pageNum - 1)
        }
      }
    }
    
    return [...new Set(pages)].sort((a, b) => b - a)
  }

  const handleRemovePages = async () => {
    if (files.length === 0) return

    setIsProcessing(true)

    try {
      const fileBuffer = await files[0].arrayBuffer()
      const pdf = await PDFDocument.load(fileBuffer)
      const pagesToDelete = parsePages(pagesToRemove, totalPages)
      
      if (pagesToDelete.length === 0) {
        alert('Please enter valid page numbers to remove')
        setIsProcessing(false)
        return
      }

      if (pagesToDelete.length >= totalPages) {
        alert('Cannot remove all pages from the PDF')
        setIsProcessing(false)
        return
      }

      // Remove pages from highest to lowest index to avoid index shifting
      for (const pageIndex of pagesToDelete) {
        pdf.removePage(pageIndex)
      }

      const pdfBytes = await pdf.save()
      
      // Create ZIP file containing the modified PDF
      const zip = new JSZip()
      zip.file('removed-pages.pdf', pdfBytes)
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      
      // Store the ZIP blob for download, don't download automatically
      setRemovedBlob(zipBlob)
      console.log('[v0] Pages removed successfully - stored in ZIP for download')
    } catch (error) {
      console.error('[v0] Error removing pages:', error)
      alert('Error removing pages. Please make sure the file is a valid PDF.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!removedBlob) return
    saveAs(removedBlob, 'removed-pages.zip')
    console.log('[v0] ZIP file downloaded')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white mb-4">
                  <Trash2 className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Remove Pages
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Delete unwanted pages from your PDF document.
                </p>
              </div>

              <AdBanner slot="remove-top" className="mb-8" />

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

                    <div className="space-y-2">
                      <Label htmlFor="pagesToRemove">Pages to Remove</Label>
                      <Input
                        id="pagesToRemove"
                        value={pagesToRemove}
                        onChange={(e) => setPagesToRemove(e.target.value)}
                        placeholder="e.g., 1, 3, 5-7"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter page numbers separated by commas, or ranges with dashes
                      </p>
                    </div>

                    {/* Remove Button Section */}
                    <div className="mt-6 bg-gradient-to-r from-red-900/40 to-red-800/20 border border-red-700/50 rounded-2xl p-6 md:p-8">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Remove?</h3>
                        <p className="text-sm text-muted-foreground mb-6">Click the button below to start removing pages</p>
                      </div>
                      <Button
                        size="lg"
                        className="w-full text-base bg-red-600 hover:bg-red-700 text-white"
                        onClick={handleRemovePages}
                        disabled={isProcessing || !pagesToRemove.trim()}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Trash2 className="mr-2 h-5 w-5" />
                            Start Remove Process
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Download Section - Only shows after processing */}
                    {!isProcessing && removedBlob && (
                      <div className="mt-6 bg-gradient-to-r from-green-900/40 to-green-800/20 border border-green-700/50 rounded-2xl p-6 md:p-8">
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-semibold text-green-400 mb-2">✓ Removal Complete!</h3>
                          <p className="text-sm text-muted-foreground mb-6">Your PDF with removed pages is ready to download as ZIP</p>
                        </div>
                        <Button
                          size="lg"
                          className="w-full text-base bg-green-600 hover:bg-green-700 text-white"
                          onClick={handleDownload}
                        >
                          <Download className="mr-2 h-5 w-5" />
                          Download Removed Pages (ZIP)
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <AdBanner slot="remove-bottom" className="mt-12" />
            </div>

            <AdSidebar slot="remove-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
