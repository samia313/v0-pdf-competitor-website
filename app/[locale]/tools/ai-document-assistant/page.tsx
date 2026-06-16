'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import {
  FileText,
  Download,
  Copy,
  Loader2,
  Sparkles,
  BookOpen,
  Zap,
  BarChart3,
  MessageSquare,
  Clock,
  PlusCircle,
  AlertCircle,
} from 'lucide-react'

type FeatureType = 'summarize' | 'translate' | 'extract' | 'clauses' | 'notes' | 'flashcards'

interface Feature {
  id: FeatureType
  name: string
  description: string
  icon: React.ReactNode
  color: string
}

const FEATURES: Feature[] = [
  {
    id: 'summarize',
    name: 'Summarize',
    description: 'Get concise key points from your document',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'translate',
    name: 'Translate',
    description: 'Convert document to another language',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 'extract',
    name: 'Extract Data',
    description: 'Pull structured information from document',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'from-green-600 to-emerald-600',
  },
  {
    id: 'clauses',
    name: 'Find Clauses',
    description: 'Identify important terms & conditions',
    icon: <Zap className="w-5 h-5" />,
    color: 'from-yellow-600 to-orange-600',
  },
  {
    id: 'notes',
    name: 'Create Notes',
    description: 'Generate study notes automatically',
    icon: <FileText className="w-5 h-5" />,
    color: 'from-indigo-600 to-violet-600',
  },
  {
    id: 'flashcards',
    name: 'Flashcards',
    description: 'Build Q&A flashcards for studying',
    icon: <PlusCircle className="w-5 h-5" />,
    color: 'from-red-600 to-pink-600',
  },
]

export default function AIDocumentAssistantPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [session, setSession] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<FeatureType | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Check authentication and premium status
  useEffect(() => {
    async function checkAuth() {
      try {
        const { data } = await authClient.getSession()
        if (!data?.user) {
          router.push('/sign-in')
          return
        }
        setSession(data)
        
        // Check premium status
        try {
          const response = await fetch('/api/subscription')
          if (response.ok) {
            const subData = await response.json()
            setIsPremium(!!subData.subscription)
          }
        } catch (err) {
          console.error('[v0] Error checking premium:', err)
        }
        setLoading(false)
      } catch (err) {
        console.error('[v0] Auth error:', err)
        router.push('/sign-in')
      }
    }
    checkAuth()
  }, [router])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file')
      return
    }

    setUploadedFile(file)
    setError(null)
  }, [])

  const handleAnalyze = async (feature: Feature) => {
    if (!uploadedFile) {
      setError('Please upload a PDF first')
      return
    }

    if (!isPremium) {
      setError('Premium subscription required. Upgrade to use AI features.')
      return
    }

    setSelectedFeature(feature.id)
    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const base64 = event.target?.result as string
        const fileContent = base64.split(',')[1] || ''

        const response = await fetch('/api/ai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            documentId: 0,
            featureType: feature.id,
            fileContent,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Analysis failed')
        }

        // Handle streaming response
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let fullContent = ''

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const text = decoder.decode(value)
            fullContent += text
            setResult(fullContent)
          }
        }
      }
      reader.readAsDataURL(uploadedFile)
    } catch (error) {
      const err = error as Error
      setError(err.message || 'Error analyzing document')
      console.error('[v0] Error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      alert('Copied to clipboard!')
    }
  }

  const handleDownload = () => {
    if (result && selectedFeature) {
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result))
      element.setAttribute('download', `${selectedFeature}_result.txt`)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!session) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-950 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Premium Requirement Alert */}
        {!isPremium && (
          <div className="mb-6 p-4 rounded-lg bg-amber-900/20 border border-amber-700/50 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-200">Premium Feature</h3>
              <p className="text-sm text-amber-100 mt-1">
                Upgrade to Pro or Business plan to access AI Document Assistant.
              </p>
              <Button
                size="sm"
                className="mt-3 bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => router.push('/pricing')}
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-700/50 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-red-100">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
              ✕
            </button>
          </div>
        )}

        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Premium Feature</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI Document Assistant
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your PDF and analyze it with AI. Summarize, translate, extract data, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700">
              <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  uploadedFile
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-600 hover:border-primary hover:bg-slate-800/50'
                }`}
              >
                <FileText className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {uploadedFile ? (
                  <>
                    <p className="font-medium text-foreground">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-foreground mb-1">Click to upload</p>
                    <p className="text-sm text-muted-foreground">or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-2">PDF files only (max 100MB)</p>
                  </>
                )}
              </div>

              {uploadedFile && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => {
                    setUploadedFile(null)
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                >
                  Clear
                </Button>
              )}
            </Card>
          </div>

          {/* Features & Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {!result ? (
              <>
                <h3 className="text-lg font-semibold">Choose an AI Feature</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {FEATURES.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => handleAnalyze(feature)}
                      disabled={!uploadedFile || isAnalyzing || !isPremium}
                      className={`p-4 rounded-lg border-2 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg ${
                        selectedFeature === feature.id
                          ? 'border-primary bg-primary/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div
                        className={`inline-block p-2 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-2`}
                      >
                        {feature.icon}
                      </div>
                      <h4 className="font-semibold text-foreground">{feature.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {FEATURES.find((f) => f.id === selectedFeature)?.name} Result
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setResult(null)
                      setSelectedFeature(null)
                    }}
                  >
                    New Analysis
                  </Button>
                </div>

                <Card className="p-6 bg-slate-900/50 border-slate-700 min-h-96 max-h-96 overflow-y-auto">
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center h-full gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-muted-foreground">Analyzing your document...</span>
                    </div>
                  ) : (
                    <div className="text-foreground whitespace-pre-wrap text-sm">{result}</div>
                  )}
                </Card>

                {!isAnalyzing && result && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="flex-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
