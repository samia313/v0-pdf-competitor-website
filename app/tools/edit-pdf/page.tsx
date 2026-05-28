'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Edit, Download, Loader2, Type, Square, Circle, Minus, Undo, Trash2 } from 'lucide-react'

interface Annotation {
  id: string
  type: 'text' | 'rectangle' | 'circle' | 'line'
  x: number
  y: number
  width?: number
  height?: number
  text?: string
  color: string
  fontSize?: number
  page: number
}

export default function EditPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [currentTool, setCurrentTool] = useState<'text' | 'rectangle' | 'circle' | 'line'>('text')
  const [currentColor, setCurrentColor] = useState('#ef4444')
  const [fontSize, setFontSize] = useState(16)
  const [textInput, setTextInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [pdfDimensions, setPdfDimensions] = useState({ width: 612, height: 792 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
      setAnnotations([])
      
      // Load PDF to get page count
      try {
        const pdfjsLib = await import('pdfjs-dist')
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
        
        const arrayBuffer = await newFiles[0].arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        setTotalPages(pdf.numPages)
        
        const page = await pdf.getPage(1)
        const viewport = page.getViewport({ scale: 1 })
        setPdfDimensions({ width: viewport.width, height: viewport.height })
        
        renderPage(pdf, 1)
      } catch (error) {
        console.error('Error loading PDF:', error)
      }
    }
  }, [])

  const renderPage = async (pdf: any, pageNum: number) => {
    const page = await pdf.getPage(pageNum)
    const canvas = canvasRef.current
    if (!canvas) return
    
    const context = canvas.getContext('2d')!
    const scale = Math.min(800 / page.getViewport({ scale: 1 }).width, 1.5)
    const viewport = page.getViewport({ scale })
    
    canvas.height = viewport.height
    canvas.width = viewport.width
    
    await page.render({ canvasContext: context, viewport }).promise
    
    // Draw existing annotations for this page
    drawAnnotations(context, pageNum)
  }

  const drawAnnotations = (context: CanvasRenderingContext2D, pageNum: number) => {
    const pageAnnotations = annotations.filter(a => a.page === pageNum)
    
    pageAnnotations.forEach(annotation => {
      context.fillStyle = annotation.color
      context.strokeStyle = annotation.color
      context.lineWidth = 2
      
      switch (annotation.type) {
        case 'text':
          context.font = `${annotation.fontSize || 16}px Arial`
          context.fillText(annotation.text || '', annotation.x, annotation.y)
          break
        case 'rectangle':
          context.strokeRect(annotation.x, annotation.y, annotation.width || 100, annotation.height || 50)
          break
        case 'circle':
          context.beginPath()
          context.arc(annotation.x, annotation.y, (annotation.width || 50) / 2, 0, Math.PI * 2)
          context.stroke()
          break
        case 'line':
          context.beginPath()
          context.moveTo(annotation.x, annotation.y)
          context.lineTo(annotation.x + (annotation.width || 100), annotation.y + (annotation.height || 0))
          context.stroke()
          break
      }
    })
  }

  const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      type: currentTool,
      x,
      y,
      color: currentColor,
      page: currentPage,
      fontSize: currentTool === 'text' ? fontSize : undefined,
      text: currentTool === 'text' ? textInput || 'Text' : undefined,
      width: currentTool !== 'text' ? 100 : undefined,
      height: currentTool !== 'text' ? 50 : undefined,
    }
    
    setAnnotations(prev => [...prev, newAnnotation])
    
    // Redraw canvas with new annotation
    if (files.length > 0) {
      const pdfjsLib = await import('pdfjs-dist')
      const arrayBuffer = await files[0].arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      await renderPage(pdf, currentPage)
    }
  }

  const handleRemoveFile = useCallback(() => {
    setFiles([])
    setAnnotations([])
    setTotalPages(0)
    setCurrentPage(1)
  }, [])

  const handleUndo = () => {
    setAnnotations(prev => prev.slice(0, -1))
  }

  const handleClearAll = () => {
    setAnnotations([])
  }

  const handleDownload = async () => {
    if (files.length === 0) return

    setIsProcessing(true)

    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const pages = pdfDoc.getPages()

      annotations.forEach(annotation => {
        if (annotation.page <= pages.length) {
          const page = pages[annotation.page - 1]
          const { height } = page.getSize()
          
          // Convert canvas coordinates to PDF coordinates
          const pdfX = annotation.x * (pdfDimensions.width / (canvasRef.current?.width || 1))
          const pdfY = height - (annotation.y * (pdfDimensions.height / (canvasRef.current?.height || 1)))
          
          // Parse color
          const colorMatch = annotation.color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
          const r = colorMatch ? parseInt(colorMatch[1], 16) / 255 : 0
          const g = colorMatch ? parseInt(colorMatch[2], 16) / 255 : 0
          const b = colorMatch ? parseInt(colorMatch[3], 16) / 255 : 0

          switch (annotation.type) {
            case 'text':
              page.drawText(annotation.text || '', {
                x: pdfX,
                y: pdfY,
                size: annotation.fontSize || 16,
                font,
                color: rgb(r, g, b),
              })
              break
            case 'rectangle':
              page.drawRectangle({
                x: pdfX,
                y: pdfY - (annotation.height || 50),
                width: annotation.width || 100,
                height: annotation.height || 50,
                borderColor: rgb(r, g, b),
                borderWidth: 2,
              })
              break
            case 'circle':
              page.drawEllipse({
                x: pdfX,
                y: pdfY,
                xScale: (annotation.width || 50) / 2,
                yScale: (annotation.width || 50) / 2,
                borderColor: rgb(r, g, b),
                borderWidth: 2,
              })
              break
            case 'line':
              page.drawLine({
                start: { x: pdfX, y: pdfY },
                end: { x: pdfX + (annotation.width || 100), y: pdfY - (annotation.height || 0) },
                color: rgb(r, g, b),
                thickness: 2,
              })
              break
          }
        }
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'edited.pdf')
    } catch (error) {
      console.error('Error saving PDF:', error)
      alert('Error saving PDF. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Re-render when annotations change
  useEffect(() => {
    const rerender = async () => {
      if (files.length > 0) {
        const pdfjsLib = await import('pdfjs-dist')
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
        const arrayBuffer = await files[0].arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        await renderPage(pdf, currentPage)
      }
    }
    rerender()
  }, [annotations, currentPage, files])

  const tools = [
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'line', icon: Minus, label: 'Line' },
  ] as const

  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#000000']

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1 max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500 text-white mb-4">
                  <Edit className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Edit PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Add text, shapes, and annotations to your PDF documents.
                </p>
              </div>

              <AdBanner slot="edit-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                {files.length === 0 ? (
                  <FileUploader
                    accept={{ 'application/pdf': ['.pdf'] }}
                    maxFiles={1}
                    onFilesSelected={handleFilesSelected}
                    files={files}
                    onRemoveFile={handleRemoveFile}
                    title="Drop a PDF file here"
                    description="or click to browse"
                  />
                ) : (
                  <div className="space-y-6">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Tool:</span>
                        {tools.map(tool => (
                          <Button
                            key={tool.id}
                            variant={currentTool === tool.id ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => setCurrentTool(tool.id)}
                            title={tool.label}
                          >
                            <tool.icon className="h-4 w-4" />
                          </Button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Color:</span>
                        {colors.map(color => (
                          <button
                            key={color}
                            className={`w-6 h-6 rounded-full border-2 ${currentColor === color ? 'border-foreground' : 'border-transparent'}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setCurrentColor(color)}
                          />
                        ))}
                      </div>

                      {currentTool === 'text' && (
                        <>
                          <Input
                            placeholder="Enter text..."
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            className="w-40"
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Size:</span>
                            <Slider
                              value={[fontSize]}
                              onValueChange={([v]) => setFontSize(v)}
                              min={8}
                              max={48}
                              step={1}
                              className="w-24"
                            />
                            <span className="text-sm w-8">{fontSize}</span>
                          </div>
                        </>
                      )}

                      <div className="flex items-center gap-2 ml-auto">
                        <Button variant="outline" size="icon" onClick={handleUndo} disabled={annotations.length === 0}>
                          <Undo className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleClearAll} disabled={annotations.length === 0}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* PDF Canvas */}
                    <div ref={containerRef} className="relative overflow-auto bg-muted rounded-lg p-4 flex justify-center">
                      <canvas
                        ref={canvasRef}
                        onClick={handleCanvasClick}
                        className="cursor-crosshair border border-border shadow-lg"
                      />
                    </div>

                    {/* Page Navigation */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          variant="outline"
                          disabled={currentPage === 1}
                          onClick={async () => {
                            const newPage = currentPage - 1
                            setCurrentPage(newPage)
                          }}
                        >
                          Previous
                        </Button>
                        <span className="text-sm">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          disabled={currentPage === totalPages}
                          onClick={async () => {
                            const newPage = currentPage + 1
                            setCurrentPage(newPage)
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handleRemoveFile} className="flex-1">
                        Upload Different File
                      </Button>
                      <Button
                        onClick={handleDownload}
                        disabled={isProcessing}
                        className="flex-1"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-5 w-5" />
                            Download Edited PDF
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <AdBanner slot="edit-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>How to Edit PDF Files</h2>
                <p>
                  Our free PDF editor lets you add text, shapes, and annotations to your documents.
                  Simply upload your PDF, select a tool, and click on the document to add elements.
                </p>
                <h3>Available Tools</h3>
                <ul>
                  <li><strong>Text:</strong> Add custom text with different sizes and colors</li>
                  <li><strong>Rectangle:</strong> Draw rectangular shapes</li>
                  <li><strong>Circle:</strong> Add circular highlights</li>
                  <li><strong>Line:</strong> Draw straight lines</li>
                </ul>
              </div>
            </div>

            <AdSidebar slot="edit-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
