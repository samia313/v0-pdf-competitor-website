'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import { FileText, Loader2, Download, Sparkles, Globe } from 'lucide-react'

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'ru', name: 'Russian' },
  { code: 'ko', name: 'Korean' },
]

export default function PDFTranslationPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [session, setSession] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [targetLanguage, setTargetLanguage] = useState('es')
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
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
            <p className="text-muted-foreground mb-6">Upgrade to access PDF Translation and translate documents to 10+ languages.</p>
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

  const handleTranslate = async () => {
    if (!uploadedFile || isTranslating) return

    setIsTranslating(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)
      formData.append('featureType', 'translate')
      formData.append('targetLanguage', targetLanguage)

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to translate')

      const reader = response.body?.getReader()
      let translated = ''

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break
        translated += new TextDecoder().decode(value)
      }

      setResult(translated)
    } catch (err) {
      setError('Failed to translate. Please try again.')
    } finally {
      setIsTranslating(false)
    }
  }

  const downloadTranslation = () => {
    if (!result) return
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result))
    element.setAttribute('download', `translation-${targetLanguage}.txt`)
    element.click()
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">PDF Translation</h1>
            <p className="text-muted-foreground">Translate your PDF documents to 10+ languages instantly</p>
          </div>

          {/* Upload Section */}
          <Card className="p-8 mb-8">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center cursor-pointer hover:border-primary transition"
            >
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
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

          {/* Language Selection */}
          {uploadedFile && !result && (
            <Card className="p-6 mb-8">
              <label className="block mb-4">
                <span className="block text-sm font-medium mb-2">Target Language</span>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </label>
              <Button
                onClick={handleTranslate}
                disabled={isTranslating}
                className="w-full h-12 text-base"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Translating...
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4 mr-2" />
                    Translate to {LANGUAGES.find(l => l.code === targetLanguage)?.name}
                  </>
                )}
              </Button>
            </Card>
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
                <h3 className="text-xl font-semibold">Translation ({LANGUAGES.find(l => l.code === targetLanguage)?.name})</h3>
                <Button variant="outline" size="sm" onClick={downloadTranslation}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="prose prose-sm max-w-none mb-6">
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{result}</p>
              </div>
              <Button
                onClick={() => {
                  setUploadedFile(null)
                  setResult(null)
                }}
                variant="outline"
                className="w-full"
              >
                Translate Another PDF
              </Button>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
