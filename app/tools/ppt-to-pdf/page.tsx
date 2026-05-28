'use client'

import { useState, useCallback } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { FileType, Download, Loader2 } from 'lucide-react'

export default function PptToPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
  }, [])

  const handleConvert = async () => {
    if (files.length === 0) return
    setIsProcessing(true)
    setProgress(10)

    try {
      const arrayBuffer = await files[0].arrayBuffer()
      setProgress(20)
      
      // Parse PPTX (it's a ZIP file)
      const zip = await JSZip.loadAsync(arrayBuffer)
      setProgress(30)
      
      // Get slide files
      const slideFiles: string[] = []
      zip.forEach((relativePath) => {
        if (relativePath.match(/ppt\/slides\/slide\d+\.xml$/)) {
          slideFiles.push(relativePath)
        }
      })
      
      // Sort slides by number
      slideFiles.sort((a, b) => {
        const numA = parseInt(a.match(/slide(\d+)/)?.[1] || '0')
        const numB = parseInt(b.match(/slide(\d+)/)?.[1] || '0')
        return numA - numB
      })
      
      setProgress(40)
      
      // Create PDF
      const pdfDoc = await PDFDocument.create()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      
      // Standard slide dimensions (16:9 aspect ratio)
      const slideWidth = 960
      const slideHeight = 540
      const margin = 40
      
      for (let i = 0; i < slideFiles.length; i++) {
        const slideContent = await zip.file(slideFiles[i])?.async('string')
        if (!slideContent) continue
        
        const page = pdfDoc.addPage([slideWidth, slideHeight])
        
        // Extract text from XML (simplified extraction)
        const textMatches = slideContent.match(/<a:t>([^<]*)<\/a:t>/g) || []
        const texts = textMatches.map(match => match.replace(/<\/?a:t>/g, '').trim()).filter(t => t)
        
        // Draw slide background
        page.drawRectangle({
          x: 0,
          y: 0,
          width: slideWidth,
          height: slideHeight,
          color: rgb(1, 1, 1),
        })
        
        // Draw slide number
        page.drawText(`Slide ${i + 1}`, {
          x: slideWidth - 80,
          y: 20,
          size: 10,
          font,
          color: rgb(0.5, 0.5, 0.5),
        })
        
        // Draw extracted text
        let y = slideHeight - margin - 30
        let isTitle = true
        
        for (const text of texts) {
          if (y < margin) break
          
          // Word wrap
          const words = text.split(' ')
          let line = ''
          const maxWidth = slideWidth - margin * 2
          const fontSize = isTitle ? 24 : 14
          const currentFont = isTitle ? boldFont : font
          
          for (const word of words) {
            const testLine = line + (line ? ' ' : '') + word
            const textWidth = currentFont.widthOfTextAtSize(testLine, fontSize)
            
            if (textWidth > maxWidth && line) {
              page.drawText(line, {
                x: margin,
                y,
                size: fontSize,
                font: currentFont,
                color: rgb(0, 0, 0),
              })
              y -= fontSize * 1.5
              line = word
            } else {
              line = testLine
            }
          }
          
          if (line) {
            page.drawText(line, {
              x: margin,
              y,
              size: fontSize,
              font: currentFont,
              color: rgb(0, 0, 0),
            })
            y -= fontSize * 2
          }
          
          isTitle = false
        }
        
        setProgress(40 + Math.round((i / slideFiles.length) * 50))
      }
      
      setProgress(95)
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const originalName = files[0].name.replace(/\.(pptx?|ppt)$/i, '')
      saveAs(blob, `${originalName}.pdf`)
      
      setProgress(100)
    } catch (error) {
      console.error('Error converting:', error)
      alert('Error converting PowerPoint. Please make sure it is a valid .pptx file.')
    } finally {
      setIsProcessing(false)
      setProgress(0)
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600 text-white mb-4">
                  <FileType className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  PowerPoint to PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Convert PowerPoint presentations to PDF format.
                </p>
              </div>

              <AdBanner slot="ppt-pdf-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
                  }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop a PowerPoint file here"
                  description=".pptx files supported"
                />

                {files.length > 0 && (
                  <div className="mt-6">
                    <Button
                      size="lg"
                      className="w-full text-base"
                      onClick={handleConvert}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Converting... {progress}%
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" />
                          Convert to PDF
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <AdBanner slot="ppt-pdf-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>Convert PowerPoint to PDF</h2>
                <p>
                  Transform your PowerPoint presentations into PDF format for easy sharing
                  and viewing on any device without PowerPoint software.
                </p>
                <h3>Benefits</h3>
                <ul>
                  <li>Universal viewing - no PowerPoint needed</li>
                  <li>Preserve your presentation layout</li>
                  <li>Easy to share and print</li>
                </ul>
              </div>
            </div>

            <AdSidebar slot="ppt-pdf-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
