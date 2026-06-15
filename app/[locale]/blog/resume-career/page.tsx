import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase } from 'lucide-react'
import { getCluster, getAllClusters } from '@/lib/blog-clusters'

const topArticles = [
  { slug: 'ats-resume-optimization-guide', title: 'Complete ATS Resume Guide' },
  { slug: 'how-to-optimize-resume-ats', title: 'Optimize Resume for ATS Systems' },
  { slug: 'best-resume-format-for-ats', title: 'Best Resume Format for ATS' },
  { slug: 'resume-builder-guide', title: 'How to Use Resume Builder' },
  { slug: 'cover-letter-generator-tips', title: 'Cover Letter Writing Tips' },
  { slug: 'resume-keywords-ats-2024', title: 'Essential Resume Keywords' },
]

export const metadata = {
  title: 'Resume & Career Guide | ATS Optimization, Resume Builder & Cover Letters | PDFilio',
  description: 'Complete resume guides for job success. Learn ATS optimization, resume building, cover letter writing, and career strategies to land your dream job.',
  keywords: 'ATS resume, resume optimization, resume builder, cover letter, job application, career',
}

export default function ResumeCareerHub() {
  const cluster = getCluster('resume-career')
  const relatedClusters = getAllClusters().filter(c => c.id !== 'resume-career')

  if (!cluster) return null

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Content Hub</Badge>
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
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-amber-100">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-amber-600" />
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
              Everything you need to know about resumes, career advancement, and landing your dream job.
            </p>
            <div className="bg-amber-50 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Resume Optimization</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• ATS system explained</li>
                    <li>• Resume formatting guide</li>
                    <li>• Keyword optimization</li>
                    <li>• Score improvement tips</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Career & Applications</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Resume building tools</li>
                    <li>• Cover letter writing</li>
                    <li>• Job search strategy</li>
                    <li>• Application best practices</li>
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
