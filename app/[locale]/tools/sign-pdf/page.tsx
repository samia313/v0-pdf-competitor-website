'use client'

import { useState, useCallback, useRef } from 'react'
import { PDFDocument, rgb } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { PenTool, Download, Loader2, Eraser } from 'lucide-react'

export default function SignPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [signPdfBlob, setSignPdfBlob] = useState<Blob | null>(null)
  const [signature, setSignature] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setIsDrawing(true)
    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      setSignature(canvas.toDataURL('image/png'))
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignature(null)
  }

  const initCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const handleSign = async () => {
    if (files.length === 0 || !signature) return

    setIsProcessing(true)

    try {
      const fileBuffer = await files[0].arrayBuffer()
      const pdf = await PDFDocument.load(fileBuffer)
      
      // Convert base64 to Uint8Array
      const signatureData = signature.split(',')[1]
      const signatureBytes = Uint8Array.from(atob(signatureData), c => c.charCodeAt(0))
      const signatureImage = await pdf.embedPng(signatureBytes)

      const pages = pdf.getPages()
      const lastPage = pages[pages.length - 1]
      const { width, height } = lastPage.getSize()

      // Add signature to bottom right of last page
      const sigWidth = 150
      const sigHeight = sigWidth * (signatureImage.height / signatureImage.width)

      lastPage.drawImage(signatureImage, {
        x: width - sigWidth - 50,
        y: 50,
        width: sigWidth,
        height: sigHeight,
      })

      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, `signed_${files[0].name}`)
    } catch (error) {
      console.error('Error signing PDF:', error)
      alert('Error signing PDF.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!signPdfBlob) return
    saveAs(signPdfBlob, 'sign.pdf')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-white mb-4">
                  <PenTool className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Sign PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Add your signature to PDF documents.
                </p>
              </div>

              <AdBanner slot="sign-top" className="mb-8" />

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

                {files.length > 0 && (
                  <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">Draw your signature:</p>
                        <Button variant="ghost" size="sm" onClick={clearSignature}>
                          <Eraser className="h-4 w-4 mr-1" />
                          Clear
                        </Button>
                      </div>
                      <div className="border-2 border-dashed border-border rounded-lg p-2 bg-white">
                        <canvas
                          ref={canvasRef}
                          width={400}
                          height={150}
                          className="w-full cursor-crosshair touch-none"
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                          onLoad={initCanvas}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Draw your signature above. It will be placed on the last page.
                      </p>
                    </div>

                    <Button
                      size="lg"
                      className="flex-1 text-base"
                      onClick={handleSign}
                      disabled={isProcessing || !signature}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <PenTool className="mr-2 h-5 w-5" />
                          Sign
                        </>
                      )}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1 text-base"
                      onClick={handleDownload}
                      disabled={!signPdfBlob}
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download
                    </Button>
                  </div>
                )}
              </div>

              <AdBanner slot="sign-bottom" className="mt-12" />
            </div>

            <AdSidebar slot="sign-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
