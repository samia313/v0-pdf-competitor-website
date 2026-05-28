'use client'

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Download, Loader2, GripVertical } from 'lucide-react'

export default function ReorderPagesPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [pageOrder, setPageOrder] = useState<number[]>([])
  const [totalPages, setTotalPages] = useState(0)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
      try {
        const buffer = await newFiles[0].arrayBuffer()
        const pdf = await PDFDocument.load(buffer)
        const count = pdf.getPageCount()
        setTotalPages(count)
        setPageOrder(Array.from({ length: count }, (_, i) => i))
      } catch {
        setTotalPages(0)
        setPageOrder([])
      }
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
    setTotalPages(0)
    setPageOrder([])
  }, [])

  const movePageUp = (index: number) => {
    if (index === 0) return
    const newOrder = [...pageOrder]
    ;[newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
    setPageOrder(newOrder)
  }

  const movePageDown = (index: number) => {
    if (index === pageOrder.length - 1) return
    const newOrder = [...pageOrder]
    ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
    setPageOrder(newOrder)
  }

  const handleReorder = async () => {
    if (files.length === 0) return

    setIsProcessing(true)

    try {
      const fileBuffer = await files[0].arrayBuffer()
      const sourcePdf = await PDFDocument.load(fileBuffer)
      const newPdf = await PDFDocument.create()

      const pages = await newPdf.copyPages(sourcePdf, pageOrder)
      pages.forEach((page) => newPdf.addPage(page))

      const pdfBytes = await newPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, `reordered_${files[0].name}`)
    } catch (error) {
      console.error('Error reordering pages:', error)
      alert('Error reordering pages.')
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500 text-white mb-4">
                  <ArrowUpDown className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Reorder Pages
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Rearrange PDF pages in any order you want.
                </p>
              </div>

              <AdBanner slot="reorder-top" className="mb-8" />

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
                      <p className="text-sm font-medium text-foreground">Drag to reorder or use arrows:</p>
                      <div className="max-h-[300px] overflow-y-auto space-y-2 p-2 bg-secondary/30 rounded-lg">
                        {pageOrder.map((originalPage, index) => (
                          <div
                            key={originalPage}
                            className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
                          >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary font-medium text-sm">
                              {originalPage + 1}
                            </span>
                            <span className="flex-1 text-sm">Page {originalPage + 1}</span>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => movePageUp(index)}
                                disabled={index === 0}
                              >
                                ↑
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => movePageDown(index)}
                                disabled={index === pageOrder.length - 1}
                              >
                                ↓
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full text-base"
                      onClick={handleReorder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" />
                          Reorder & Download
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <AdBanner slot="reorder-bottom" className="mt-12" />
            </div>

            <AdSidebar slot="reorder-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
