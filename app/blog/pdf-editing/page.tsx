import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Edit3 } from 'lucide-react'
import { getCluster, getAllClusters } from '@/lib/blog-clusters'

const topArticles = [
  { slug: 'how-to-merge-pdf-files-online-free', title: 'How to Merge PDF Files' },
  { slug: 'split-pdf-extract-specific-pages', title: 'How to Split and Extract PDF Pages' },
  { slug: 'compress-pdf-without-losing-quality', title: 'Compress PDF Without Quality Loss' },
  { slug: 'rotate-pdf-pages-guide', title: 'How to Rotate PDF Pages' },
  { slug: 'how-to-add-page-numbers-to-pdf', title: 'Add Page Numbers to PDF' },
  { slug: 'password-protect-pdf-guide', title: 'Password Protect Your PDF' },
]

export const metadata = {
  title: 'PDF Editing Guide | Merge, Split, Compress & Edit PDFs | PDFilio',
  description: 'Complete PDF editing guides. Learn how to merge, split, compress, rotate, and edit PDF documents. Step-by-step tutorials for all PDF editing tasks.',
  keywords: 'PDF editing, merge PDF, split PDF, compress PDF, edit PDF, PDF tools',
}

export default function PDFEditingHub() {
  const cluster = getCluster('pdf-editing')
  const relatedClusters = getAllClusters().filter(c => c.id !== 'pdf-editing')

  if (!cluster) return null

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">Content Hub</Badge>
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
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-purple-100">
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

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse All {cluster.articleCount} Articles</h2>
            <p className="text-slate-600 mb-6">
              Master PDF editing with our comprehensive tutorials covering every technique from basic to advanced.
            </p>
            <div className="bg-purple-50 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Combining & Splitting</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Merge multiple PDFs</li>
                    <li>• Split and extract pages</li>
                    <li>• Organize page order</li>
                    <li>• Remove unwanted pages</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Modifying & Protecting</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Add page numbers</li>
                    <li>• Add watermarks</li>
                    <li>• Password protect</li>
                    <li>• Compress for sharing</li>
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
