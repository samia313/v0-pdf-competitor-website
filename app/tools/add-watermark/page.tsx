'use client'

import { useState, useCallback } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Droplets, Download, Loader2 } from 'lucide-react'

export default function AddWatermarkPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [addwatermarkPdfBlob, setAddWatermarkPdfBlob] = useState<Blob | null>(null)
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL')
  const [fontSize, setFontSize] = useState(48)
  const [opacity, setOpacity] = useState(30)
  const [position, setPosition] = useState<'center' | 'diagonal' | 'tiled'>('diagonal')
  const [color, setColor] = useState<'gray' | 'red' | 'blue'>('gray')

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
  }, [])

  const handleAddWatermark = async () => {
    if (files.length === 0 || !watermarkText.trim()) return

    setIsProcessing(true)

    try {
      const fileBuffer = await files[0].arrayBuffer()
      const pdf = await PDFDocument.load(fileBuffer)
      const font = await pdf.embedFont(StandardFonts.HelveticaBold)
      
      const colors = {
        gray: rgb(0.5, 0.5, 0.5),
        red: rgb(0.8, 0.2, 0.2),
        blue: rgb(0.2, 0.2, 0.8),
      }
      
      const pages = pdf.getPages()
      
      for (const page of pages) {
        const { width, height } = page.getSize()
        const textWidth = font.widthOfTextAtSize(watermarkText, fontSize)
        
        if (position === 'center') {
          page.drawText(watermarkText, {
            x: (width - textWidth) / 2,
            y: height / 2,
            size: fontSize,
            font,
            color: colors[color],
            opacity: opacity / 100,
          })
        } else if (position === 'diagonal') {
          // Draw diagonal watermark
          const angle = Math.atan(height / width)
          page.drawText(watermarkText, {
            x: width / 4,
            y: height / 2,
            size: fontSize,
            font,
            color: colors[color],
            opacity: opacity / 100,
            rotate: { type: 'radians' as const, angle },
          })
        } else if (position === 'tiled') {
          // Draw tiled watermarks
          const spacing = Math.max(textWidth + 50, 200)
          for (let y = 50; y < height; y += spacing / 2) {
            for (let x = -textWidth; x < width + textWidth; x += spacing) {
              const offsetX = (Math.floor(y / (spacing / 2)) % 2) * (spacing / 2)
              page.drawText(watermarkText, {
                x: x + offsetX,
                y,
                size: fontSize * 0.6,
                font,
                color: colors[color],
                opacity: (opacity / 100) * 0.5,
                rotate: { type: 'degrees' as const, angle: -45 },
              })
            }
          }
        }
      }

      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, `watermarked_${files[0].name}`)
    } catch (error) {
      console.error('Error adding watermark:', error)
      alert('Error adding watermark. Please make sure the file is a valid PDF.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!addwatermarkPdfBlob) return
    saveAs(addwatermarkPdfBlob, 'addwatermark.pdf')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl mx-auto">
              {/* Tool Header */}
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500 text-white mb-4">
                  <Droplets className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Add Watermark
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Add a text watermark to protect your PDF documents.
                </p>
              </div>

              {/* Ad Banner */}
              <AdBanner slot="watermark-top" className="mb-8" />

              {/* Upload Area */}
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
                    {/* Watermark Text */}
                    <div className="space-y-2">
                      <Label htmlFor="watermarkText">Watermark Text</Label>
                      <Input
                        id="watermarkText"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        placeholder="Enter watermark text"
                        maxLength={50}
                      />
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Position</Label>
                        <Select value={position} onValueChange={(v) => setPosition(v as any)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="diagonal">Diagonal</SelectItem>
                            <SelectItem value="tiled">Tiled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Color</Label>
                        <Select value={color} onValueChange={(v) => setColor(v as any)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gray">Gray</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Sliders */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Font Size</Label>
                          <span className="text-sm text-muted-foreground">{fontSize}px</span>
                        </div>
                        <Slider
                          value={[fontSize]}
                          onValueChange={(v) => setFontSize(v[0])}
                          min={12}
                          max={120}
                          step={1}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Opacity</Label>
                          <span className="text-sm text-muted-foreground">{opacity}%</span>
                        </div>
                        <Slider
                          value={[opacity]}
                          onValueChange={(v) => setOpacity(v[0])}
                          min={5}
                          max={100}
                          step={1}
                        />
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="flex-1 text-base"
                      onClick={handleAddWatermark}
                      disabled={isProcessing || !watermarkText.trim()}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Stamp className="mr-2 h-5 w-5" />
                          Add Watermark & Download
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Ad Banner */}
              <AdBanner slot="watermark-bottom" className="mt-12" />

              {/* SEO Content */}
              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>How to Add Watermark to PDF</h2>
                <p>
                  Protect your PDF documents by adding a custom text watermark. Perfect for
                  marking documents as confidential, draft, or adding your company name.
                </p>
                <h3>Watermark Options</h3>
                <ul>
                  <li><strong>Position:</strong> Center, diagonal, or tiled pattern</li>
                  <li><strong>Color:</strong> Gray, red, or blue</li>
                  <li><strong>Size & Opacity:</strong> Fully customizable</li>
                </ul>
              </div>
            </div>

            {/* Sidebar Ad */}
            <AdSidebar slot="watermark-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
