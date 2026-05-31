'use client'

import { useState, useCallback } from 'react'
import { saveAs } from 'file-saver'
import * as docxLib from 'docx'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { FileText, Download, Loader2 } from 'lucide-react'

export default function PdfToWordPage() {
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
      
      // Extract text from all pages
      const paragraphs: any[] = []
      const totalPages = pdf.numPages
      
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const textContent = await page.getTextContent()
        
        // Group text items by Y position to form lines
        const lines: Map<number, string[]> = new Map()
        
        textContent.items.forEach((item: any) => {
          const y = Math.round(item.transform[5])
          if (!lines.has(y)) {
            lines.set(y, [])
          }
          lines.get(y)!.push(item.str)
        })
        
        // Sort lines by Y position (descending - top to bottom)
        const sortedYPositions = Array.from(lines.keys()).sort((a, b) => b - a)
        
        // Add page separator
        if (pageNum > 1) {
          paragraphs.push(new docxLib.Paragraph({ children: [] }))
        }
        
        // Convert lines to paragraphs
        for (const y of sortedYPositions) {
          const lineText = lines.get(y)!.join(' ').trim()
          if (lineText) {
            paragraphs.push(
              new docxLib.Paragraph({
                children: [
                  new docxLib.TextRun({
                    text: lineText,
                    size: 24, // 12pt
                  }),
                ],
              })
            )
          }
        }
        
        setProgress(30 + Math.round((pageNum / totalPages) * 50))
      }
      
      // Create Word document
      const doc = new docxLib.Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      })
      
      setProgress(90)
      
      // Generate filename but don't auto download
      const blob = await docxLib.Packer.toBlob(doc)
      const originalName = files[0].name.replace(/\.pdf$/i, '')
      const fileName = `${originalName}.docx`
      
      // Store for manual download
      setConvertedFile({ blob, name: fileName })
      setProgress(100)
    } catch (error) {
      console.error('Error converting:', error)
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white mb-4">
                  <FileText className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  PDF to Word
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Convert PDF files to editable Word documents (.docx) instantly.
                </p>
              </div>

              <AdBanner slot="pdf-word-top" className="mb-8" />

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
                          Download Word Document
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
                            Convert to Word
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
                    title: 'Upload PDF',
                    description: 'Select your PDF document',
                  },
                  {
                    title: 'Convert',
                    description: 'We extract text and convert to Word',
                  },
                  {
                    title: 'Download',
                    description: 'Get your editable .docx file',
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

              <AdBanner slot="pdf-word-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>Convert PDF to Word Online</h2>
                <p>
                  Transform your PDF documents into editable Microsoft Word files.
                  Perfect for editing text, changing formatting, or repurposing content.
                </p>
                <h3>Why Convert PDF to Word?</h3>
                <ul>
                  <li><strong>Edit Content:</strong> Make changes to text and formatting</li>
                  <li><strong>Copy Text:</strong> Easily copy and paste content</li>
                  <li><strong>Reuse Content:</strong> Repurpose document content</li>
                  <li><strong>No Software Needed:</strong> Works in your browser</li>
                </ul>
              </div>
            </div>

            <AdSidebar slot="pdf-word-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
