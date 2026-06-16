'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import { Settings, Loader2, Download, Sparkles, FileText } from 'lucide-react'

export default function PDFMetadataEditorPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [session, setSession] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [metadata, setMetadata] = useState({
    title: '',
    author: '',
    subject: '',
    keywords: '',
    creator: '',
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
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-slate-500" />
            <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
            <p className="text-muted-foreground mb-6">Upgrade to access Metadata Editor and edit PDF properties.</p>
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

  const handleUpdateMetadata = async () => {
    if (!uploadedFile || isProcessing) return

    setIsProcessing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)
      formData.append('featureType', 'metadata')
      formData.append('metadata', JSON.stringify(metadata))

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to update metadata')
      setResult({ success: true, message: 'PDF metadata updated successfully' })
    } catch (err) {
      setError('Failed to update metadata. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">PDF Metadata Editor</h1>
            <p className="text-muted-foreground">Edit PDF metadata including title, author, subject, and keywords</p>
          </div>

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

          {uploadedFile && !result && (
            <Card className="p-8 mb-8">
              <h3 className="text-lg font-semibold mb-6">Edit Metadata</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="PDF Title"
                  value={metadata.title}
                  onChange={(e) => setMetadata({...metadata, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={metadata.author}
                  onChange={(e) => setMetadata({...metadata, author: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={metadata.subject}
                  onChange={(e) => setMetadata({...metadata, subject: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Keywords"
                  value={metadata.keywords}
                  onChange={(e) => setMetadata({...metadata, keywords: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Creator"
                  value={metadata.creator}
                  onChange={(e) => setMetadata({...metadata, creator: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </Card>
          )}

          {uploadedFile && !result && (
            <Button
              onClick={handleUpdateMetadata}
              disabled={isProcessing}
              className="w-full mb-8 h-12"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating Metadata...
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4 mr-2" />
                  Update PDF Metadata
                </>
              )}
            </Button>
          )}

          {error && <Card className="p-4 bg-red-50 border-red-200 mb-8"><p className="text-red-800">{error}</p></Card>}

          {result && (
            <Card className="p-8">
              <div className="text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">{result.message}</h3>
                <Button
                  onClick={() => {
                    setUploadedFile(null)
                    setResult(null)
                    setMetadata({ title: '', author: '', subject: '', keywords: '', creator: '' })
                  }}
                  className="mt-4"
                >
                  Edit Another PDF
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
