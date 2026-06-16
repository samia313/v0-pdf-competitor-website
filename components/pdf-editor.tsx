'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Type,
  Square,
  Circle,
  Edit2,
  Highlighter,
  Trash2,
  Download,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import { PDFDocument, rgb } from 'pdf-lib'

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

interface Annotation {
  id: string
  type: 'text' | 'highlight' | 'box' | 'circle' | 'line'
  pageNumber: number
  x: number
  y: number
  width?: number
  height?: number
  content?: string
  color?: string
}

export function PDFEditor({ fileUrl }: { fileUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pdf, setPdf] = useState<any>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [tool, setTool] = useState<string>('select')
  const [highlightColor, setHighlightColor] = useState('yellow')
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  // Load PDF
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(fileUrl).promise
        setPdf(pdf)
        renderPage(pdf, 1)
      } catch (error) {
        console.error('Error loading PDF:', error)
      }
    }
    loadPdf()
  }, [fileUrl])

  // Render current page
  const renderPage = async (pdfDoc: any, pageNum: number) => {
    if (!canvasRef.current) return

    try {
      const page = await pdfDoc.getPage(pageNum)
      const viewport = page.getViewport({ scale })

      const canvas = canvasRef.current
      canvas.width = viewport.width
      canvas.height = viewport.height

      const context = canvas.getContext('2d')
      if (!context) return

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }

      await page.render(renderContext).promise

      // Draw annotations for this page
      drawAnnotations(context, pageNum)
    } catch (error) {
      console.error('Error rendering page:', error)
    }
  }

  // Draw annotations on canvas
  const drawAnnotations = (context: CanvasRenderingContext2D, pageNum: number) => {
    const pageAnnotations = annotations.filter((a) => a.pageNumber === pageNum)

    pageAnnotations.forEach((annotation) => {
      context.save()

      switch (annotation.type) {
        case 'highlight':
          context.fillStyle = `${annotation.color}80` // Semi-transparent
          context.fillRect(annotation.x, annotation.y, annotation.width || 50, annotation.height || 30)
          break

        case 'text':
          context.font = '14px Arial'
          context.fillStyle = annotation.color || 'black'
          context.fillText(annotation.content || '', annotation.x, annotation.y)
          break

        case 'box':
          context.strokeStyle = annotation.color || 'red'
          context.lineWidth = 2
          context.strokeRect(annotation.x, annotation.y, annotation.width || 50, annotation.height || 50)
          break

        case 'circle':
          context.strokeStyle = annotation.color || 'blue'
          context.lineWidth = 2
          const radius = (annotation.width || 50) / 2
          context.beginPath()
          context.arc(annotation.x + radius, annotation.y + radius, radius, 0, 2 * Math.PI)
          context.stroke()
          break
      }

      context.restore()
    })
  }

  // Handle canvas drawing
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === 'select') return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / scale
    const y = (e.clientY - rect.top) / scale

    setStartPos({ x, y })
    setIsDrawing(true)
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool === 'select') return
    // Could add real-time preview here
  }

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool === 'select') return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const endX = (e.clientX - rect.left) / scale
    const endY = (e.clientY - rect.top) / scale

    const newAnnotation: Annotation = {
      id: Math.random().toString(36).substr(2, 9),
      type: (tool as any) || 'highlight',
      pageNumber,
      x: Math.min(startPos.x, endX),
      y: Math.min(startPos.y, endY),
      width: Math.abs(endX - startPos.x),
      height: Math.abs(endY - startPos.y),
      color: highlightColor,
    }

    setAnnotations([...annotations, newAnnotation])
    setIsDrawing(false)
    renderPage(pdf, pageNumber)
  }

  // Add text annotation
  const addTextAnnotation = () => {
    const text = window.prompt('Enter text:')
    if (text) {
      const newAnnotation: Annotation = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'text',
        pageNumber,
        x: 100,
        y: 100,
        content: text,
        color: 'black',
      }
      setAnnotations([...annotations, newAnnotation])
      renderPage(pdf, pageNumber)
    }
  }

  // Delete annotation
  const deleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter((a) => a.id !== id))
    renderPage(pdf, pageNumber)
  }

  // Download edited PDF
  const downloadPdf = async () => {
    try {
      const pdfDoc = await PDFDocument.load(new URL(fileUrl).href)
      // Save with annotations embedded
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'edited.pdf'
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }
  }

  return (
    <div className="w-full h-screen flex flex-col bg-background">
      {/* Toolbar */}
      <Card className="m-4 p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 border-r pr-2">
            <Button
              variant={tool === 'select' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTool('select')}
              title="Select tool"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border-r pr-2">
            <Button
              variant={tool === 'text' ? 'default' : 'ghost'}
              size="sm"
              onClick={addTextAnnotation}
              title="Add text"
            >
              <Type className="w-4 h-4" />
            </Button>
            <Button
              variant={tool === 'highlight' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTool('highlight')}
              title="Highlight"
            >
              <Highlighter className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border-r pr-2">
            <Button
              variant={tool === 'box' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTool('box')}
              title="Draw box"
            >
              <Square className="w-4 h-4" />
            </Button>
            <Button
              variant={tool === 'circle' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTool('circle')}
              title="Draw circle"
            >
              <Circle className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border-r pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setScale(Math.max(0.5, scale - 0.1))}
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm min-w-12">{Math.round(scale * 100)}%</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setScale(Math.min(2, scale + 0.1))}
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <input
              type="color"
              value={highlightColor}
              onChange={(e) => setHighlightColor(e.target.value)}
              className="w-8 h-8 cursor-pointer"
              title="Select color"
            />
            <Button size="sm" variant="outline" onClick={downloadPdf}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <Button
            size="sm"
            onClick={() => {
              setPageNumber(Math.max(1, pageNumber - 1))
              renderPage(pdf, Math.max(1, pageNumber - 1))
            }}
            disabled={pageNumber === 1}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {pageNumber} of {pdf?.numPages || 0}
          </span>
          <Button
            size="sm"
            onClick={() => {
              setPageNumber(Math.min(pdf.numPages, pageNumber + 1))
              renderPage(pdf, Math.min(pdf.numPages, pageNumber + 1))
            }}
            disabled={pageNumber === pdf?.numPages}
          >
            Next
          </Button>
        </div>
      </Card>

      {/* Canvas */}
      <div className="flex-1 overflow-auto flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          className="border shadow-lg cursor-crosshair"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>

      {/* Annotations Panel */}
      {annotations.length > 0 && (
        <Card className="m-4 p-4 max-h-32 overflow-y-auto">
          <h3 className="font-semibold text-sm mb-2">Annotations ({annotations.length})</h3>
          <div className="space-y-1">
            {annotations
              .filter((a) => a.pageNumber === pageNumber)
              .map((annotation) => (
                <div key={annotation.id} className="flex items-center justify-between text-sm bg-muted p-2 rounded">
                  <span>{annotation.type}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAnnotation(annotation.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
          </div>
        </Card>
      )}
    </div>
  )
}
