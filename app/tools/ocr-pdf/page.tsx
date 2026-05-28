'use client'

import { useState, useCallback, useRef } from 'react'
import Tesseract from 'tesseract.js'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ScanText, Download, Loader2, Copy, Check } from 'lucide-react'

const languages = [
  { code: 'eng', name: 'English' },
  { code: 'spa', name: 'Spanish' },
  { code: 'fra', name: 'French' },
  { code: 'deu', name: 'German' },
  { code: 'ita', name: 'Italian' },
  { code: 'por', name: 'Portuguese' },
  { code: 'rus', name: 'Russian' },
  { code: 'ara', name: 'Arabic' },
  { code: 'chi_sim', name: 'Chinese (Simplified)' },
  { code: 'jpn', name: 'Japanese' },
  { code: 'kor', name: 'Korean' },
  { code: 'hin', name: 'Hindi' },
  { code: 'urd', name: 'Urdu' },
]

export default function OcrPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [extractedText, setExtractedText] = useState('')
  const [language, setLanguage] = useState('eng')
  const [copied, setCopied] = useState(false)

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles)
    setExtractedText('')
  }, [])

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setExtractedText('')
  }, [])

  const handleOcr = async () => {
    if (files.length === 0) return

    setIsProcessing(true)
    setProgress(0)
    setExtractedText('')

    try {
      const file = files[0]
      
      // Convert PDF to images or use image directly
      let imageUrl: string
      
      if (file.type === 'application/pdf') {
        // For PDFs, we need to convert to image first
        // Using canvas to render PDF page
        const pdfjsLib = await import('pdfjs-dist')
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
        
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        
        let fullText = ''
        const totalPages = pdf.numPages
        
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
          const page = await pdf.getPage(pageNum)
          const scale = 2
          const viewport = page.getViewport({ scale })
          
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')!
          canvas.height = viewport.height
          canvas.width = viewport.width
          
          await page.render({ canvasContext: context, viewport }).promise
          
          imageUrl = canvas.toDataURL('image/png')
          
          const result = await Tesseract.recognize(imageUrl, language, {
            logger: (m) => {
              if (m.status === 'recognizing text') {
                const pageProgress = ((pageNum - 1) / totalPages) * 100 + (m.progress * 100) / totalPages
                setProgress(Math.round(pageProgress))
              }
            },
          })
          
          fullText += `--- Page ${pageNum} ---\n${result.data.text}\n\n`
        }
        
        setExtractedText(fullText.trim())
      } else {
        // For images
        imageUrl = URL.createObjectURL(file)
        
        const result = await Tesseract.recognize(imageUrl, language, {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setProgress(Math.round(m.progress * 100))
            }
          },
        })
        
        setExtractedText(result.data.text)
        URL.revokeObjectURL(imageUrl)
      }
    } catch (error) {
      console.error('OCR Error:', error)
      alert('Error processing file. Please try again with a clearer image.')
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(extractedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'extracted-text.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500 text-white mb-4">
                  <ScanText className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  OCR PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Extract text from scanned PDFs and images using advanced OCR technology.
                </p>
              </div>

              <AdBanner slot="ocr-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 
                    'application/pdf': ['.pdf'],
                    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
                  }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop PDF or image here"
                  description="Supports PDF, PNG, JPG, and other image formats"
                />

                {files.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Document Language
                        </label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {languages.map((lang) => (
                              <SelectItem key={lang.code} value={lang.code}>
                                {lang.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full text-base"
                      onClick={handleOcr}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Extracting Text... {progress}%
                        </>
                      ) : (
                        <>
                          <ScanText className="mr-2 h-5 w-5" />
                          Extract Text (OCR)
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {extractedText && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Extracted Text</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                          {copied ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownload}>
                          <Download className="mr-2 h-4 w-4" />
                          Download TXT
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={extractedText}
                      readOnly
                      className="min-h-[300px] font-mono text-sm"
                    />
                  </div>
                )}
              </div>

              <AdBanner slot="ocr-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>What is OCR?</h2>
                <p>
                  OCR (Optical Character Recognition) is a technology that converts images of text into 
                  machine-readable text. Our free online OCR tool can extract text from scanned PDFs, 
                  photographs, and other images.
                </p>
                <h3>Supported Languages</h3>
                <p>
                  Our OCR supports multiple languages including English, Spanish, French, German, 
                  Chinese, Japanese, Arabic, Hindi, Urdu, and many more.
                </p>
              </div>
            </div>

            <AdSidebar slot="ocr-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
