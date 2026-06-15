'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import { FileText, Loader2, Download, Sparkles, Copy } from 'lucide-react'

export default function AICoverLetterGeneratorPage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    yourName: '',
    skills: '',
  })

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
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
            <p className="text-muted-foreground mb-6">Upgrade to access AI Cover Letter Generator and create personalized cover letters.</p>
            <Button onClick={() => router.push('/pricing')} className="w-full">Upgrade to Premium</Button>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const handleGenerate = async () => {
    if (!formData.jobTitle || !formData.companyName || !formData.yourName) {
      setError('Please fill in required fields')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          featureType: 'coverletter',
          fileContent: JSON.stringify(formData),
        }),
      })

      if (!response.ok) throw new Error('Failed to generate cover letter')
      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      setError('Failed to generate cover letter. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadCoverLetter = () => {
    if (!result) return
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result))
    element.setAttribute('download', 'cover-letter.txt')
    element.click()
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Cover Letter Generator</h1>
            <p className="text-muted-foreground">Generate personalized cover letters for job applications</p>
          </div>

          <Card className="p-8 mb-8">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Your Name"
                value={formData.yourName}
                onChange={(e) => setFormData({...formData, yourName: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Your Key Skills"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg h-24"
              />
            </div>
          </Card>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full mb-8 h-12"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Generate Cover Letter
              </>
            )}
          </Button>

          {error && <Card className="p-4 bg-red-50 border-red-200 mb-8"><p className="text-red-800">{error}</p></Card>}

          {result && (
            <Card className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Your Cover Letter</h3>
                <Button variant="outline" onClick={downloadCoverLetter}><Download className="w-4 h-4 mr-2" />Download</Button>
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
