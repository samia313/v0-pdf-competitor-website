import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Brain, Zap } from 'lucide-react'
import { getSilo } from '@/lib/topic-clusters'

const aiTools = [
  { id: 'chat-with-pdf', name: 'Chat with PDF', desc: 'Ask questions about your PDFs' },
  { id: 'pdf-summarizer', name: 'PDF Summarizer', desc: 'Get instant AI summaries' },
  { id: 'pdf-quiz-generator', name: 'PDF Quiz Generator', desc: 'Create MCQ tests' },
  { id: 'pdf-notes-generator', name: 'PDF Notes Generator', desc: 'Convert to study notes' },
  { id: 'ai-contract-reader', name: 'AI Contract Reader', desc: 'Analyze legal documents' },
  { id: 'pdf-translation', name: 'PDF Translation', desc: 'Multi-language translation' },
  { id: 'ai-summarizer', name: 'AI Summarizer', desc: 'Advanced AI summaries' },
  { id: 'ocr-text-extraction', name: 'OCR Text Extraction', desc: 'Extract scanned text' },
]

export default function AIPDFToolsHub() {
  const silo = getSilo('ai-pdf-tools')

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">AI Powered</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              AI PDF Tools
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              {silo?.description}
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {aiTools.map(tool => (
              <Link key={tool.id} href={`/tools/${tool.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      {tool.name}
                    </CardTitle>
                    <CardDescription>{tool.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full">
                      Try Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">AI-Powered Advantage</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <Brain className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Smart Analysis</h3>
                <p className="text-slate-600">AI understands context and meaning in your documents.</p>
              </div>
              <div>
                <Zap className="h-8 w-8 text-yellow-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Lightning Fast</h3>
                <p className="text-slate-600">Get results instantly with powerful AI processing.</p>
              </div>
              <div>
                <Sparkles className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Accurate Results</h3>
                <p className="text-slate-600">State-of-the-art AI models for best accuracy.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
