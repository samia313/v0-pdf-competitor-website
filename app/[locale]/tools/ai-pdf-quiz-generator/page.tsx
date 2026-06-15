'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import { Brain, Loader2, Download, Sparkles } from 'lucide-react'

export default function AIPDFQuizGeneratorPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [session, setSession] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
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
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-pink-500" />
            <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
            <p className="text-muted-foreground mb-6">Upgrade to access Quiz Generator and create MCQs from PDF content.</p>
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
      setError('Please select a valid PDF file')
    }
  }

  const handleGenerate = async () => {
    if (!uploadedFile || isGenerating) return

    setIsGenerating(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)
      formData.append('featureType', 'quiz')

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to generate quiz')
      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      setError('Failed to generate quiz. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQuiz = () => {
    if (!result) return
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result))
    element.setAttribute('download', 'quiz.txt')
    element.click()
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI PDF Quiz Generator</h1>
            <p className="text-muted-foreground">Generate multiple choice quizzes from PDF content automatically</p>
          </div>

          <Card className="p-8 mb-8">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center cursor-pointer hover:border-primary transition"
            >
              <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Click to upload PDF</p>
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
              </div>
            )}
          </Card>

          {uploadedFile && !result && (
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mb-8 h-12"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Quiz
                </>
              )}
            </Button>
          )}

          {error && <Card className="p-4 bg-red-50 border-red-200 mb-8"><p className="text-red-800">{error}</p></Card>}

          {result && (
            <Card className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Generated Quiz</h3>
                <Button variant="outline" onClick={downloadQuiz}><Download className="w-4 h-4 mr-2" />Download</Button>
              </div>
              <div className="prose max-w-none"><p className="whitespace-pre-wrap text-sm">{result}</p></div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
