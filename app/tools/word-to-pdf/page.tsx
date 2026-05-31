'use client'

import { useState, useCallback } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import mammoth from 'mammoth'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { FileText, Download, Loader2 } from 'lucide-react'

export default function WordToPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [convertedFile, setConvertedFile] = useState<{ blob: Blob; name: string } | null>(null)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
      setConvertedFile(null)
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
    setConvertedFile(null)
  }, [])

  const handleDownload = useCallback(() => {
    if (convertedFile) {
      saveAs(convertedFile.blob, convertedFile.name)
      setConvertedFile(null)
      setFiles([])
    }
  }, [convertedFile])

  const handleConvert = async () => {
    if (files.length === 0) return
    setIsProcessing(true)
    setProgress(10)

    try {
      const arrayBuffer = await files[0].arrayBuffer()
      setProgress(30)
      
      // Extract text from Word document using mammoth
      const result = await mammoth.extractRawText({ arrayBuffer })
      const text = result.value
      setProgress(50)
      
      // Create PDF
      const pdfDoc = await PDFDocument.create()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      setProgress(60)
      
      const pageWidth = 612 // Letter size
      const pageHeight = 792
      const margin = 50
      const fontSize = 12
      const lineHeight = fontSize * 1.5
      const maxWidth = pageWidth - (margin * 2)
      
      // Split text into lines
      const paragraphs = text.split('\n').filter(p => p.trim())
      let page = pdfDoc.addPage([pageWidth, pageHeight])
      let y = pageHeight - margin
      
      for (const paragraph of paragraphs) {
        // Word wrap
        const words = paragraph.split(' ')
        let line = ''
        
        for (const word of words) {
          const testLine = line + (line ? ' ' : '') + word
          const textWidth = font.widthOfTextAtSize(testLine, fontSize)
          
          if (textWidth > maxWidth) {
            // Draw current line
            if (y < margin + lineHeight) {
              page = pdfDoc.addPage([pageWidth, pageHeight])
              y = pageHeight - margin
            }
            
            page.drawText(line, {
              x: margin,
              y,
              size: fontSize,
              font,
              color: rgb(0, 0, 0),
            })
            y -= lineHeight
            line = word
          } else {
            line = testLine
          }
        }
        
        // Draw remaining text
        if (line) {
          if (y < margin + lineHeight) {
            page = pdfDoc.addPage([pageWidth, pageHeight])
            y = pageHeight - margin
          }
          
          page.drawText(line, {
            x: margin,
            y,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
          })
          y -= lineHeight * 1.5 // Extra space between paragraphs
        }
      }
      
      setProgress(90)
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      
      // Generate filename
      const originalName = files[0].name.replace(/\.(docx?|doc)$/i, '')
      const fileName = `${originalName}.pdf`
      
      // Store for manual download
      setConvertedFile({ blob, name: fileName })
      setProgress(100)
    } catch (error) {
      console.error('Error converting:', error)
      alert('Error converting document. Please make sure it is a valid Word file (.docx)')
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white mb-4">
                  <FileText className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Word to PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Convert your Word documents (.docx) to PDF format instantly.
                </p>
              </div>

              <AdBanner slot="word-pdf-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                  }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop a Word document here"
                  description=".docx files supported"
                />

                {files.length > 0 && (
                  <div className="mt-6">
                    {convertedFile ? (
                      <div className="space-y-3">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <p className="text-green-800 font-semibold mb-2">Conversion Complete!</p>
                          <p className="text-sm text-green-700">{convertedFile.name}</p>
                        </div>
                        <Button
                          size="lg"
                          className="w-full text-base bg-green-600 hover:bg-green-700"
                          onClick={handleDownload}
                        >
                          <Download className="mr-2 h-5 w-5" />
                          Download PDF File
                        </Button>
                      </div>
                    ) : (
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
                    )}
                  </div>
                )}
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: 'Upload Document',
                    description: 'Select your Word document (.docx file)',
                  },
                  {
                    title: 'Convert',
                    description: 'Click convert and we process it instantly',
                  },
                  {
                    title: 'Download PDF',
                    description: 'Get your PDF file ready to share',
                  },
                ].map((step, index) => (
                  <div key={index} className="text-center p-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-3">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>

              <AdBanner slot="word-pdf-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>Convert Word to PDF Online</h2>
                <p>
                  Transform your Microsoft Word documents into PDF format while preserving
                  your text content. Our converter works directly in your browser - no upload to servers required.
                </p>
                <h3>Why Convert Word to PDF?</h3>
                <ul>
                  <li><strong>Universal Format:</strong> PDFs can be viewed on any device</li>
                  <li><strong>Preserve Layout:</strong> Maintain document appearance</li>
                  <li><strong>Secure Sharing:</strong> PDFs are harder to edit accidentally</li>
                  <li><strong>Smaller Size:</strong> Often results in smaller file sizes</li>
                </ul>
              </div>
            </div>

            <AdSidebar slot="word-pdf-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
