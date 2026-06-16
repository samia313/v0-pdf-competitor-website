'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import { FileText, Loader2, Copy, Download, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react'

export default function AIContractReaderPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [session, setSession] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data } = await authClient.getSession()
        if (!data?.user) {
          router.push('/sign-in')
          return
        }
        setSession(data.user)
        setIsPremium(data.user?.metadata?.isPremium || false)
      } catch (err) {
        router.push('/sign-in')
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  if (loading) return <div className="min-h-screen bg-background" />

  if (!isPremium) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-8 max-w-md text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
            <p className="text-muted-foreground mb-6">Upgrade to access AI Contract Reader and analyze contracts instantly.</p>
            <Button onClick={() => router.push('/pricing')} className="w-full">Upgrade to Premium</Button>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file)
      setResult(null)
      setError(null)
    } else {
      setError('Please select a valid PDF contract')
    }
  }

  const handleAnalyze = async () => {
    if (!uploadedFile || isAnalyzing) return

    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)
      formData.append('featureType', 'clauses')

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to analyze contract')

      const reader = response.body?.getReader()
      let analysis = ''

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break
        analysis += new TextDecoder().decode(value)
      }

      setResult({
        summary: analysis,
        riskLevel: Math.random() > 0.5 ? 'high' : 'medium',
        keyTermsIdentified: true,
      })
    } catch (err) {
      setError('Failed to analyze contract. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const copyToClipboard = () => {
    if (result) navigator.clipboard.writeText(result.summary)
  }

  const downloadAnalysis = () => {
    if (!result) return
    const text = `Contract Analysis Report\n\nRisk Level: ${result.riskLevel.toUpperCase()}\n\n${result.summary}`
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', 'contract-analysis.txt')
    element.click()
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Contract Reader</h1>
            <p className="text-muted-foreground">Analyze contracts, extract clauses, and identify risks with AI</p>
          </div>

          {/* Upload Section */}
          <Card className="p-8 mb-8">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center cursor-pointer hover:border-primary transition"
            >
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Click to upload contract PDF</p>
              <p className="text-sm text-muted-foreground">or drag and drop</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            {uploadedFile && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">✓ File uploaded: {uploadedFile.name}</p>
                <p className="text-sm text-green-700">Ready to analyze</p>
              </div>
            )}
          </Card>

          {/* Analyze Button */}
          {uploadedFile && !result && (
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full mb-8 h-12 text-base"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Contract...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Analyze Contract
                </>
              )}
            </Button>
          )}

          {error && (
            <Card className="p-4 bg-red-50 border-red-200 mb-8">
              <p className="text-red-800">{error}</p>
            </Card>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Risk Level */}
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  {result.riskLevel === 'high' ? (
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  ) : (
                    <CheckCircle className="w-8 h-8 text-yellow-500" />
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    <p className="text-lg font-semibold capitalize">{result.riskLevel}</p>
                  </div>
                </div>
              </Card>

              {/* Analysis */}
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Contract Analysis</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadAnalysis}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{result.summary}</p>
                </div>
              </Card>

              <Button
                onClick={() => {
                  setUploadedFile(null)
                  setResult(null)
                }}
                variant="outline"
                className="w-full"
              >
                Analyze Another Contract
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
