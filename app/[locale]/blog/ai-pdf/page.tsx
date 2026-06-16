import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { getCluster, getAllClusters } from '@/lib/blog-clusters'

const topArticles = [
  { slug: 'chat-with-pdf-ai-guide', title: 'Chat with PDF: AI Guide' },
  { slug: 'how-to-summarize-pdf-with-ai', title: 'How to Summarize PDF with AI' },
  { slug: 'pdf-ocr-extract-text-from-images', title: 'Extract Text from Scanned PDFs (OCR)' },
  { slug: 'ai-powered-contract-analysis', title: 'AI Contract Analysis Guide' },
  { slug: 'pdf-translation-multiple-languages', title: 'Translate PDFs to Any Language' },
  { slug: 'best-ai-pdf-tools-comparison', title: 'Best AI PDF Tools 2024' },
]

export const metadata = {
  title: 'AI PDF Tools Guide | Chat, Summarize & Analyze PDFs with AI | PDFilio',
  description: 'Learn to use AI for PDF analysis, summarization, translation, and intelligent document processing. Complete guides on cutting-edge AI PDF tools.',
  keywords: 'AI PDF, PDF AI, AI summarizer, PDF analysis, OCR, document extraction, AI tools',
}

export default function AIPDFHub() {
  const cluster = getCluster('ai-pdf')
  const relatedClusters = getAllClusters().filter(c => c.id !== 'ai-pdf')

  if (!cluster) return null

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800">Content Hub</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {cluster.name}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mb-4">
              {cluster.longDescription}
            </p>
            <div className="flex gap-2">
              {cluster.keywords.slice(0, 3).map(keyword => (
                <Badge key={keyword} variant="outline">{keyword}</Badge>
              ))}
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topArticles.map(article => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-emerald-100">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-emerald-600" />
                        {article.title}
                      </CardTitle>
                      <CardDescription>Read article</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" className="w-full">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse All {cluster.articleCount} Articles</h2>
            <p className="text-slate-600 mb-6">
              Explore the power of artificial intelligence applied to PDF documents. From text analysis to content summarization.
            </p>
            <div className="bg-emerald-50 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Analysis & Processing</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Chat with PDF documents</li>
                    <li>• Automatic summarization</li>
                    <li>• Contract analysis</li>
                    <li>• Information extraction</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Conversion & OCR</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Scanned PDF text extraction</li>
                    <li>• Multi-language translation</li>
                    <li>• Quiz generation</li>
                    <li>• Note generation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore Other Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedClusters.map(c => (
                <Link key={c.id} href={c.hubPath}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{c.name}</CardTitle>
                      <CardDescription>{c.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">{c.articleCount} articles</span>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
