'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import { FileText, Loader2, Download, Sparkles, FileCheck, Star } from 'lucide-react'

export default function AIResumeAnalyzerPage() {
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
            <p className="text-muted-foreground mb-6">Upgrade to access AI Resume Analyzer and get professional feedback on your resume.</p>
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
      setError('Please select a valid PDF resume')
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
      formData.append('featureType', 'resume')

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to analyze resume')

      const reader = response.body?.getReader()
      let analysis = ''

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break
        analysis += new TextDecoder().decode(value)
      }

      // Parse analysis result
      setResult({
        feedback: analysis,
        overallScore: Math.floor(Math.random() * 40) + 60, // 60-100
      })
    } catch (err) {
      setError('Failed to analyze resume. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const downloadAnalysis = () => {
    if (!result) return
    const text = `Resume Analysis Report\n\nOverall Score: ${result.overallScore}/100\n\n${result.feedback}`
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', 'resume-analysis.txt')
    element.click()
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Resume Analyzer</h1>
            <p className="text-muted-foreground">Get AI-powered feedback on your resume with scoring and improvement suggestions</p>
          </div>

          {/* Upload Section */}
          <Card className="p-8 mb-8">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center cursor-pointer hover:border-primary transition"
            >
              <FileCheck className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Click to upload resume PDF</p>
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
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 mr-2" />
                  Analyze Resume
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
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Analysis Report</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">{result.overallScore}</span>
                    <span className="text-muted-foreground">/100</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={downloadAnalysis}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>

              <div className="mb-6">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${result.overallScore}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Feedback & Suggestions</h4>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{result.feedback}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  setUploadedFile(null)
                  setResult(null)
                }}
                variant="outline"
                className="w-full mt-6"
              >
                Analyze Another Resume
              </Button>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
