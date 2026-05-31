'use client'

import { useState, useCallback } from 'react'
import { saveAs } from 'file-saver'
import pptxgen from 'pptxgenjs'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { FileType, Download, Loader2 } from 'lucide-react'

export default function PdfToPptPage() {
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
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
      
      const arrayBuffer = await files[0].arrayBuffer()
      setProgress(20)
      
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      setProgress(30)
      
      // Create PowerPoint presentation
      const pptx = new pptxgen()
      pptx.layout = 'LAYOUT_16x9'
      
      const totalPages = pdf.numPages
      
      // Process each page
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum)
          const textContent = await page.getTextContent()
          
          // Create slide with white background
          const slide = pptx.addSlide()
          
          // Add content from text
          if (textContent.items && textContent.items.length > 0) {
            const texts: string[] = []
            textContent.items.forEach((item: any) => {
              texts.push(item.str)
            })
            
            const fullText = texts.join(' ')
            const words = fullText.split(' ').filter(w => w.trim().length > 0)
            
            if (words.length > 0) {
              let currentY = 0.5
              let currentText = ''
              let wordCount = 0
              
              for (let i = 0; i < words.length; i++) {
                currentText += words[i] + ' '
                wordCount++
                
                // Add text box every 10-15 words or at the end
                if (wordCount >= 12 || i === words.length - 1) {
                  const textToAdd = currentText.trim()
                  if (textToAdd.length > 0) {
                    slide.addText(textToAdd, {
                      x: 0.5,
                      y: currentY,
                      w: 9,
                      h: 0.8,
                      fontSize: 11,
                      color: '333333',
                      wrap: true,
                      breakOnSpace: true,
                    })
                    currentY += 1
                    currentText = ''
                    wordCount = 0
                  }
                  if (currentY >= 5) break
                }
              }
            }
          }
          
          // Add page number
          slide.addText(`Slide ${pageNum} / ${totalPages}`, {
            x: 0.5,
            y: 5.2,
            w: 9,
            h: 0.3,
            fontSize: 8,
            color: '999999',
            align: 'right',
          })
          
          setProgress(30 + Math.round((pageNum / totalPages) * 60))
        } catch (pageError) {
          console.error(`Page ${pageNum} error:`, pageError)
          // Continue with next page even if one fails
        }
      }
      
      setProgress(95)
      
      // Write the PowerPoint file
      const pptxBytes = await pptx.write({ outputType: 'arraybuffer' }) as ArrayBuffer
      const blob = new Blob([pptxBytes], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' })
      
      const originalName = files[0].name.replace(/\.pdf$/i, '')
      const fileName = `${originalName}.pptx`
      
      setConvertedFile({ blob, name: fileName })
      setProgress(100)
    } catch (error) {
      console.error('Conversion error:', error)
      alert('Error converting PDF. Please make sure it is a valid PDF file.')
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
                  PDF to PowerPoint
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Convert PDF files to editable PowerPoint presentations.
                </p>
              </div>

              <AdBanner slot="pdf-ppt-top" className="mb-8" />

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
                          Download PowerPoint
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
                            Convert to PowerPoint
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <AdBanner slot="pdf-ppt-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>Convert PDF to PowerPoint</h2>
                <p>
                  Transform your PDF documents into editable PowerPoint presentations.
                  Each PDF page becomes a slide that you can edit and customize.
                </p>
                <h3>Use Cases</h3>
                <ul>
                  <li>Edit content from PDF presentations</li>
                  <li>Repurpose PDF content for new presentations</li>
                  <li>Add animations and transitions</li>
                </ul>
              </div>
            </div>

            <AdSidebar slot="pdf-ppt-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
