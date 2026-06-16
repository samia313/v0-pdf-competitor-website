'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Upload, Download, Loader2 } from 'lucide-react'
import { PDFDocument, rgb } from 'pdf-lib'

export default function WatermarkProPage() {
  const [file, setFile] = useState<File | null>(null)
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL')
  const [opacity, setOpacity] = useState(0.3)
  const [fontSize, setFontSize] = useState(60)
  const [color, setColor] = useState('#000000')
  const [angle, setAngle] = useState(-45)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      alert('Please select a valid PDF file')
    }
  }

  const handleWatermark = async () => {
    if (!file) return

    setIsProcessing(true)
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pages = pdfDoc.getPages()

      // Parse color
      const colorMatch = color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
      const r = colorMatch ? parseInt(colorMatch[1], 16) / 255 : 0
      const g = colorMatch ? parseInt(colorMatch[2], 16) / 255 : 0
      const b = colorMatch ? parseInt(colorMatch[3], 16) / 255 : 0

      pages.forEach((page) => {
        const { width, height } = page.getSize()

        page.drawText(watermarkText, {
          x: width / 2 - (watermarkText.length * fontSize) / 4,
          y: height / 2,
          size: fontSize,
          color: rgb(r, g, b),
          opacity: opacity,
          rotate: angle,
          align: 'center',
        })
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `watermarked-${file.name}`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error adding watermark:', error)
      alert('Error processing PDF')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Watermark Pro</CardTitle>
            <CardDescription>Add professional watermarks to protect your PDF documents</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* File Upload */}
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Drop your PDF here</h3>
                <Button variant="outline">Select PDF</Button>
              </div>
            ) : (
              <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button variant="outline" onClick={() => setFile(null)}>
                  Change File
                </Button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />

            {file && (
              <>
                {/* Watermark Settings */}
                <div className="space-y-4 border-t pt-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Watermark Text</label>
                    <Input
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      placeholder="Enter watermark text"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Font Size: {fontSize}px</label>
                    <Slider
                      value={[fontSize]}
                      onValueChange={([v]) => setFontSize(v)}
                      min={10}
                      max={150}
                      step={5}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Opacity: {Math.round(opacity * 100)}%</label>
                    <Slider
                      value={[opacity]}
                      onValueChange={([v]) => setOpacity(v)}
                      min={0}
                      max={1}
                      step={0.05}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Angle: {angle}°</label>
                    <Slider
                      value={[angle]}
                      onValueChange={([v]) => setAngle(v)}
                      min={-90}
                      max={90}
                      step={5}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Color</label>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full h-10 cursor-pointer rounded"
                    />
                  </div>

                  {/* Preview */}
                  <div className="p-8 bg-muted/50 rounded-lg text-center overflow-hidden h-48 flex items-center justify-center">
                    <div
                      style={{
                        fontSize: `${Math.min(fontSize / 2, 48)}px`,
                        opacity: opacity,
                        color: color,
                        transform: `rotate(${angle}deg)`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {watermarkText}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 border-t pt-6">
                  <Button variant="outline" onClick={() => setFile(null)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleWatermark} disabled={isProcessing} className="flex-1">
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download Watermarked PDF
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}

            {/* Features */}
            {!file && (
              <div className="grid md:grid-cols-2 gap-4 border-t pt-6">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Customizable Text</h4>
                  <p className="text-sm text-muted-foreground">Create custom watermarks with any text you want</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Full Control</h4>
                  <p className="text-sm text-muted-foreground">Adjust size, opacity, angle, and color</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Batch Processing</h4>
                  <p className="text-sm text-muted-foreground">Watermark multiple PDFs with one click</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Anti-Piracy</h4>
                  <p className="text-sm text-muted-foreground">Protect your documents from unauthorized use</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
