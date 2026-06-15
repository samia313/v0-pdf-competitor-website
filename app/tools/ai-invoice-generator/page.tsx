'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import { Receipt, Loader2, Download, Sparkles, FileText } from 'lucide-react'

export default function AIInvoiceGeneratorPage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    amount: '',
    items: '',
    dueDate: '',
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
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-amber-500" />
            <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
            <p className="text-muted-foreground mb-6">Upgrade to access AI Invoice Generator and create professional invoices instantly.</p>
            <Button onClick={() => router.push('/pricing')} className="w-full">Upgrade to Premium</Button>
          </Card>
        </div>
        <Header />
      </div>
    )
  }

  const handleGenerateInvoice = async () => {
    if (!formData.clientName || !formData.amount) {
      setError('Please fill in all required fields')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          featureType: 'invoice',
          fileContent: JSON.stringify(formData),
        }),
      })

      if (!response.ok) throw new Error('Failed to generate invoice')
      const invoice = await response.json()
      setResult(invoice.result)
    } catch (err) {
      setError('Failed to generate invoice. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadInvoice = () => {
    if (!result) return
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(result))
    element.setAttribute('download', 'invoice.html')
    element.click()
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Invoice Generator</h1>
            <p className="text-muted-foreground">Create professional invoices in seconds with AI assistance</p>
          </div>

          <Card className="p-8 mb-8">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Client Name"
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Client Email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Invoice Amount"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Invoice Items"
                value={formData.items}
                onChange={(e) => setFormData({...formData, items: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg h-24"
              />
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </Card>

          <Button
            onClick={handleGenerateInvoice}
            disabled={isGenerating}
            className="w-full mb-8 h-12"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Invoice...
              </>
            ) : (
              <>
                <Receipt className="w-4 h-4 mr-2" />
                Generate Invoice
              </>
            )}
          </Button>

          {error && <Card className="p-4 bg-red-50 border-red-200 mb-8"><p className="text-red-800">{error}</p></Card>}

          {result && (
            <Card className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Generated Invoice</h3>
                <Button variant="outline" onClick={downloadInvoice}><Download className="w-4 h-4 mr-2" />Download</Button>
              </div>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: result }} />
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
