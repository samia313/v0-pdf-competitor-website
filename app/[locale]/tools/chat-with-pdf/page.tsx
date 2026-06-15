'use client'

export const dynamic = 'force-dynamic'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import { FileText, Loader2, Copy, Download, Send, Sparkles } from 'lucide-react'

export default function ChatWithPDFPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [session, setSession] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
            <p className="text-muted-foreground mb-6">Upgrade to access Chat With PDF and unlock AI-powered document conversations.</p>
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
      setMessages([])
      setError(null)
    } else {
      setError('Please select a valid PDF file')
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || !uploadedFile || isLoading) return

    const newMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, newMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)
      formData.append('question', input)
      formData.append('featureType', 'chat')

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to process')

      const reader = response.body?.getReader()
      let result = ''

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break
        result += new TextDecoder().decode(value)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: result }])
    } catch (err) {
      setError('Failed to process message. Try again.')
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Upload PDF</h3>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition"
              >
                <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload PDF</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              {uploadedFile && (
                <div className="mt-4 p-2 bg-green-50 rounded text-sm">
                  <p className="text-green-800 font-medium">✓ {uploadedFile.name}</p>
                </div>
              )}
            </Card>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 flex flex-col h-[600px]">
              <h3 className="font-semibold mb-4">Chat with your PDF</h3>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.length === 0 && !uploadedFile && (
                  <p className="text-muted-foreground text-center py-8">Upload a PDF and start chatting</p>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.role === 'user' ? 'bg-primary text-white' : 'bg-muted'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted px-4 py-2 rounded-lg">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-800 text-sm rounded">
                  {error}
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about your PDF..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={!uploadedFile || isLoading}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!uploadedFile || !input.trim() || isLoading}
                  size="icon"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
