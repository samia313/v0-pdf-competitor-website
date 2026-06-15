import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileType, Zap } from 'lucide-react'
import { getCluster, getAllClusters } from '@/lib/blog-clusters'

const topArticles = [
  { slug: 'how-to-convert-pdf-to-word', title: 'How to Convert PDF to Word' },
  { slug: 'convert-word-to-pdf-without-losing-formatting', title: 'Convert Word to PDF (No Formatting Loss)' },
  { slug: 'best-pdf-converters-2024-comparison', title: 'Best PDF Converters 2024' },
  { slug: 'convert-pdf-to-excel-spreadsheet', title: 'Convert PDF to Excel' },
  { slug: 'convert-pdf-to-powerpoint-slides', title: 'Convert PDF to PowerPoint' },
  { slug: 'pdf-to-image-conversion-guide', title: 'PDF to Image Conversion' },
]

export const metadata = {
  title: 'PDF Conversion Guide | Convert PDF to Any Format | PDFilio',
  description: 'Complete PDF conversion guides. Learn how to convert PDF to Word, Excel, PowerPoint, images and more without losing quality or formatting.',
  keywords: 'PDF conversion, convert PDF, PDF to Word, Word to PDF, format conversion',
}

export default function PDFConversionHub() {
  const cluster = getCluster('pdf-conversion')
  const relatedClusters = getAllClusters().filter(c => c.id !== 'pdf-conversion')

  if (!cluster) return null

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Content Hub</Badge>
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

          {/* Top Articles */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topArticles.map(article => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
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

          {/* Browse by Topic */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse All {cluster.articleCount} Articles</h2>
            <p className="text-slate-600 mb-6">
              We've created comprehensive guides covering every aspect of PDF conversion. Use the categories below to find exactly what you need.
            </p>
            <div className="bg-blue-50 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">PDF to Other Formats</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• PDF to Word documents</li>
                    <li>• PDF to Excel spreadsheets</li>
                    <li>• PDF to PowerPoint slides</li>
                    <li>• PDF to images (PNG, JPG)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Other Formats to PDF</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Word to PDF conversion</li>
                    <li>• Excel to PDF conversion</li>
                    <li>• PowerPoint to PDF conversion</li>
                    <li>• Image to PDF conversion</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Related Clusters */}
          <section className="mb-16">
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
