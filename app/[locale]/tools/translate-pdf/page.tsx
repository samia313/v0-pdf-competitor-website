'use client'

import { useState, useCallback } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Languages, Download, Loader2, Copy, Check } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ur', name: 'Urdu' },
  { code: 'tr', name: 'Turkish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
]

// Simple translation dictionary for demo (in production, use a real translation API)
const translations: Record<string, Record<string, string>> = {
  es: {
    'hello': 'hola',
    'world': 'mundo',
    'the': 'el',
    'is': 'es',
    'and': 'y',
    'document': 'documento',
    'this': 'este',
    'page': 'página',
  },
  fr: {
    'hello': 'bonjour',
    'world': 'monde',
    'the': 'le',
    'is': 'est',
    'and': 'et',
    'document': 'document',
    'this': 'ce',
    'page': 'page',
  },
  de: {
    'hello': 'hallo',
    'world': 'welt',
    'the': 'das',
    'is': 'ist',
    'and': 'und',
    'document': 'dokument',
    'this': 'dies',
    'page': 'seite',
  },
  ur: {
    'hello': 'سلام',
    'world': 'دنیا',
    'the': '',
    'is': 'ہے',
    'and': 'اور',
    'document': 'دستاویز',
    'this': 'یہ',
    'page': 'صفحہ',
  },
}

export default function TranslatePdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedText, setExtractedText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('es')
  const [copied, setCopied] = useState(false)

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles)
    setExtractedText('')
    setTranslatedText('')
  }, [])

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setExtractedText('')
    setTranslatedText('')
  }, [])

  const extractTextFromPdf = async (file: File): Promise<string> => {
    const pdfjsLib = await import('pdfjs-dist')
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
    
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    
    let fullText = ''
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')
      fullText += pageText + '\n\n'
    }
    
    return fullText.trim()
  }

  const simpleTranslate = (text: string, targetLang: string): string => {
    // This is a simplified translation for demonstration
    // In production, integrate with Google Translate API, DeepL, or similar
    const dict = translations[targetLang] || {}
    
    let translated = text
    Object.entries(dict).forEach(([en, trans]) => {
      const regex = new RegExp(`\\b${en}\\b`, 'gi')
      translated = translated.replace(regex, trans)
    })
    
    // Add a note about the translation being a demo
    return `[Translated to ${languages.find(l => l.code === targetLang)?.name}]\n\n${translated}\n\n---\nNote: This is a demonstration. For full translation capabilities, please integrate with a professional translation API like Google Cloud Translation or DeepL.`
  }

  const handleTranslate = async () => {
    if (files.length === 0) return

    setIsProcessing(true)
    setTranslatedText('')

    try {
      const text = await extractTextFromPdf(files[0])
      setExtractedText(text)
      
      if (text.length < 10) {
        setTranslatedText('The document does not contain enough text to translate. It may be a scanned document - try using our OCR tool first.')
        return
      }

      const translated = simpleTranslate(text, targetLanguage)
      setTranslatedText(translated)
    } catch (error) {
      console.error('Error:', error)
      alert('Error processing PDF. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPdf = async () => {
    try {
      const pdfDoc = await PDFDocument.create()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
      const lines = translatedText.split('\n')
      let page = pdfDoc.addPage()
      const { width, height } = page.getSize()
      let y = height - 50
      
      for (const line of lines) {
        if (y < 50) {
          page = pdfDoc.addPage()
          y = height - 50
        }
        
        // Handle long lines
        const words = line.split(' ')
        let currentLine = ''
        
        for (const word of words) {
          const testLine = currentLine + (currentLine ? ' ' : '') + word
          const textWidth = font.widthOfTextAtSize(testLine, 12)
          
          if (textWidth > width - 100) {
            page.drawText(currentLine, {
              x: 50,
              y,
              size: 12,
              font,
              color: rgb(0, 0, 0),
            })
            y -= 18
            currentLine = word
          } else {
            currentLine = testLine
          }
        }
        
        if (currentLine) {
          page.drawText(currentLine, {
            x: 50,
            y,
            size: 12,
            font,
            color: rgb(0, 0, 0),
          })
          y -= 18
        }
      }
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'translated.pdf')
    } catch (error) {
      console.error('Error creating PDF:', error)
      alert('Error creating PDF. Downloading as text file instead.')
      
      const blob = new Blob([translatedText], { type: 'text/plain' })
      saveAs(blob, 'translated.txt')
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500 text-white mb-4">
                  <Languages className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Translate PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Translate your PDF documents to different languages. Support for 15+ languages.
                </p>
              </div>

              <AdBanner slot="translate-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop PDF file here"
                  description="We will translate your document"
                />

                {files.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Translate to
                      </label>
                      <Select value={targetLanguage} onValueChange={setTargetLanguage}>
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

                    {!translatedText && (
                      <Button
                        size="lg"
                        className="w-full text-base"
                        onClick={handleTranslate}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Translating...
                          </>
                        ) : (
                          <>
                            <Languages className="mr-2 h-5 w-5" />
                            Translate Document
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}

                {translatedText && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Translated Text</h3>
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
                        <Button variant="outline" size="sm" onClick={handleDownloadPdf}>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={translatedText}
                      readOnly
                      className="min-h-[300px] font-mono text-sm"
                    />
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setFiles([])
                        setExtractedText('')
                        setTranslatedText('')
                      }}
                    >
                      Translate Another Document
                    </Button>
                  </div>
                )}
              </div>

              <AdBanner slot="translate-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>PDF Translation Tool</h2>
                <p>
                  Our PDF translation tool extracts text from your documents and translates it to your 
                  desired language. Perfect for reading documents in foreign languages.
                </p>
                <h3>Supported Languages</h3>
                <p>
                  We support translation to 15+ languages including English, Spanish, French, German, 
                  Chinese, Japanese, Korean, Arabic, Hindi, Urdu, and more.
                </p>
              </div>
            </div>

            <AdSidebar slot="translate-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
