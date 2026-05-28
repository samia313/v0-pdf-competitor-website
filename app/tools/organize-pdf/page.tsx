'use client'

import { useState, useCallback, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Download, Loader2, RotateCw, Trash2, GripVertical } from 'lucide-react'

interface PageInfo {
  pageIndex: number
  rotation: number
  selected: boolean
}

export default function OrganizePdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [pages, setPages] = useState<PageInfo[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length === 0) return
    setFiles(newFiles)
    setIsLoading(true)

    try {
      const file = newFiles[0]
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const pageCount = pdf.getPageCount()
      
      const newPages: PageInfo[] = []
      for (let i = 0; i < pageCount; i++) {
        newPages.push({
          pageIndex: i,
          rotation: 0,
          selected: true,
        })
      }
      setPages(newPages)
    } catch (error) {
      console.error('Error loading PDF:', error)
      alert('Error loading PDF. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
    setPages([])
  }, [])

  const handleRotatePage = (index: number) => {
    setPages((prev) =>
      prev.map((page, i) =>
        i === index ? { ...page, rotation: (page.rotation + 90) % 360 } : page
      )
    )
  }

  const handleTogglePage = (index: number) => {
    setPages((prev) =>
      prev.map((page, i) =>
        i === index ? { ...page, selected: !page.selected } : page
      )
    )
  }

  const handleDragStart = (index: number) => {
    dragItem.current = index
  }

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index
  }

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newPages = [...pages]
      const draggedItem = newPages[dragItem.current]
      newPages.splice(dragItem.current, 1)
      newPages.splice(dragOverItem.current, 0, draggedItem)
      setPages(newPages)
    }
    dragItem.current = null
    dragOverItem.current = null
  }

  const handleProcess = async () => {
    if (files.length === 0 || pages.length === 0) return

    setIsProcessing(true)

    try {
      const fileBuffer = await files[0].arrayBuffer()
      const sourcePdf = await PDFDocument.load(fileBuffer)
      const newPdf = await PDFDocument.create()

      const selectedPages = pages.filter((p) => p.selected)
      
      for (const pageInfo of selectedPages) {
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageInfo.pageIndex])
        
        if (pageInfo.rotation !== 0) {
          const currentRotation = copiedPage.getRotation().angle
          copiedPage.setRotation({ type: 'degrees', angle: currentRotation + pageInfo.rotation } as any)
        }
        
        newPdf.addPage(copiedPage)
      }

      const pdfBytes = await newPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'organized.pdf')
    } catch (error) {
      console.error('Error processing PDF:', error)
      alert('Error processing PDF. Please try again.')
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
                  Organize PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Rearrange, delete and rotate PDF pages with ease. Drag and drop to reorder.
                </p>
              </div>

              <AdBanner slot="organize-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                {files.length === 0 ? (
                  <FileUploader
                    accept={{ 'application/pdf': ['.pdf'] }}
                    maxFiles={1}
                    onFilesSelected={handleFilesSelected}
                    files={files}
                    onRemoveFile={handleRemoveFile}
                    title="Drop PDF file here"
                    description="or click to browse"
                  />
                ) : isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-3 text-muted-foreground">Loading PDF pages...</span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">
                        {pages.length} Pages - Drag to reorder
                      </h3>
                      <Button variant="outline" onClick={handleRemoveFile}>
                        Upload Different File
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {pages.map((page, index) => (
                        <div
                          key={index}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragEnter={() => handleDragEnter(index)}
                          onDragEnd={handleDragEnd}
                          onDragOver={(e) => e.preventDefault()}
                          className={`relative group rounded-lg border-2 p-3 cursor-move transition-all ${
                            page.selected
                              ? 'border-primary bg-primary/5'
                              : 'border-border bg-secondary/30 opacity-50'
                          }`}
                        >
                          <div className="absolute top-2 left-2 cursor-grab">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                          </div>
                          
                          <div 
                            className="aspect-[3/4] bg-muted rounded flex items-center justify-center text-2xl font-bold text-muted-foreground"
                            style={{ transform: `rotate(${page.rotation}deg)` }}
                          >
                            {page.pageIndex + 1}
                          </div>
                          
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs font-medium">Page {page.pageIndex + 1}</span>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleRotatePage(index)}
                              >
                                <RotateCw className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleTogglePage(index)}
                              >
                                <Trash2 className={`h-3 w-3 ${!page.selected ? 'text-destructive' : ''}`} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button
                        size="lg"
                        className="w-full text-base"
                        onClick={handleProcess}
                        disabled={isProcessing || pages.filter((p) => p.selected).length === 0}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-5 w-5" />
                            Download Organized PDF ({pages.filter((p) => p.selected).length} pages)
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <AdBanner slot="organize-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>How to Organize PDF Pages</h2>
                <p>
                  Our PDF organizer lets you easily rearrange, rotate, and delete pages from your PDF documents.
                  Simply drag and drop pages to reorder them, rotate individual pages, or remove unwanted pages.
                </p>
                <h3>Features</h3>
                <ul>
                  <li><strong>Drag & Drop:</strong> Easily reorder pages by dragging them</li>
                  <li><strong>Rotate Pages:</strong> Rotate individual pages 90 degrees at a time</li>
                  <li><strong>Delete Pages:</strong> Remove unwanted pages from your PDF</li>
                  <li><strong>Fast Processing:</strong> All operations happen in your browser</li>
                </ul>
              </div>
            </div>

            <AdSidebar slot="organize-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
