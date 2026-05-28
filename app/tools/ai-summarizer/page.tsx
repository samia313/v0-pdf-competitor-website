'use client'

import { useState, useCallback } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles, Loader2, Copy, Check, FileText } from 'lucide-react'

export default function AiSummarizerPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [summary, setSummary] = useState('')
  const [extractedText, setExtractedText] = useState('')
  const [copied, setCopied] = useState(false)

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles)
    setSummary('')
    setExtractedText('')
  }, [])

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setSummary('')
    setExtractedText('')
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

  const generateSummary = (text: string): string => {
    // Simple extractive summarization algorithm
    const sentences = text
      .replace(/\n+/g, ' ')
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20)

    if (sentences.length === 0) {
      return 'Could not extract meaningful text from the document.'
    }

    // Calculate word frequency
    const wordFreq: Record<string, number> = {}
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || []
    
    // Common stop words to ignore
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'also'])
    
    words.forEach(word => {
      if (!stopWords.has(word) && word.length > 3) {
        wordFreq[word] = (wordFreq[word] || 0) + 1
      }
    })

    // Score sentences based on word frequency
    const scoredSentences = sentences.map((sentence, index) => {
      const sentenceWords = sentence.toLowerCase().match(/\b[a-z]+\b/g) || []
      let score = 0
      sentenceWords.forEach(word => {
        score += wordFreq[word] || 0
      })
      // Normalize by sentence length and add position bonus (earlier sentences often important)
      score = score / Math.max(sentenceWords.length, 1)
      if (index < 3) score *= 1.2 // Boost first few sentences
      return { sentence, score, index }
    })

    // Sort by score and take top sentences
    const numSentences = Math.min(Math.max(3, Math.floor(sentences.length * 0.2)), 10)
    const topSentences = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, numSentences)
      .sort((a, b) => a.index - b.index) // Restore original order

    // Build summary
    const summaryParts = [
      '## Document Summary\n',
      topSentences.map(s => s.sentence + '.').join(' '),
      '\n\n### Key Statistics',
      `- **Total Pages:** ${Math.ceil(text.length / 3000)} (estimated)`,
      `- **Word Count:** ${words.length.toLocaleString()}`,
      `- **Sentence Count:** ${sentences.length}`,
      '\n\n### Main Topics',
    ]

    // Extract top keywords as topics
    const topKeywords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1))

    summaryParts.push(topKeywords.map(k => `- ${k}`).join('\n'))

    return summaryParts.join('\n')
  }

  const handleSummarize = async () => {
    if (files.length === 0) return

    setIsProcessing(true)
    setSummary('')

    try {
      const text = await extractTextFromPdf(files[0])
      setExtractedText(text)
      
      if (text.length < 100) {
        setSummary('The document does not contain enough text to summarize. It may be a scanned document - try using our OCR tool first.')
        return
      }

      const generatedSummary = generateSummary(text)
      setSummary(generatedSummary)
    } catch (error) {
      console.error('Error:', error)
      alert('Error processing PDF. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  AI PDF Summarizer
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Get an intelligent summary of your PDF documents instantly. Save time reading long documents.
                </p>
              </div>

              <AdBanner slot="ai-summarizer-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop PDF file here"
                  description="We will analyze and summarize your document"
                />

                {files.length > 0 && !summary && (
                  <div className="mt-6">
                    <Button
                      size="lg"
                      className="w-full text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      onClick={handleSummarize}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing Document...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Generate Summary
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {summary && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        AI Summary
                      </h3>
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
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-6 prose prose-sm prose-neutral dark:prose-invert max-w-none">
                      {summary.split('\n').map((line, i) => {
                        if (line.startsWith('## ')) {
                          return <h2 key={i} className="text-xl font-bold mt-0 mb-4">{line.replace('## ', '')}</h2>
                        }
                        if (line.startsWith('### ')) {
                          return <h3 key={i} className="text-lg font-semibold mt-6 mb-2">{line.replace('### ', '')}</h3>
                        }
                        if (line.startsWith('- ')) {
                          return <p key={i} className="my-1 ml-4">{line}</p>
                        }
                        if (line.trim()) {
                          return <p key={i} className="my-2">{line}</p>
                        }
                        return null
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setFiles([])
                        setSummary('')
                        setExtractedText('')
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Summarize Another Document
                    </Button>
                  </div>
                )}
              </div>

              <AdBanner slot="ai-summarizer-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>How AI PDF Summarizer Works</h2>
                <p>
                  Our AI-powered summarizer analyzes your PDF documents and extracts the most important 
                  information, giving you a concise summary that captures the essence of the document.
                </p>
                <h3>Features</h3>
                <ul>
                  <li><strong>Smart Extraction:</strong> Identifies key sentences and main topics</li>
                  <li><strong>Document Statistics:</strong> Word count, page estimates, and more</li>
                  <li><strong>Topic Detection:</strong> Automatically identifies main themes</li>
                  <li><strong>Privacy First:</strong> All processing happens in your browser</li>
                </ul>
              </div>
            </div>

            <AdSidebar slot="ai-summarizer-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
