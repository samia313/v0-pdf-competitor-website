import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase, CheckCircle, Award } from 'lucide-react'
import { getSilo } from '@/lib/topic-clusters'

const resumeTools = [
  { id: 'resume-analyzer', name: 'Resume Analyzer', desc: 'Get scored feedback on your resume' },
  { id: 'resume-builder', name: 'Resume Builder', desc: 'Create professional resumes' },
  { id: 'cover-letter-generator', name: 'Cover Letter Generator', desc: 'Write job application letters' },
]

export default function ResumeToolsHub() {
  const silo = getSilo('resume-tools')

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">Career Tools</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Resume & Career Tools
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              {silo?.description}
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {resumeTools.map(tool => (
              <Link key={tool.id} href={`/tools/${tool.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-green-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-green-600" />
                      {tool.name}
                    </CardTitle>
                    <CardDescription>{tool.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Land Your Dream Job</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">AI-Optimized</h3>
                <p className="text-slate-600">ATS-friendly resumes that pass screening systems.</p>
              </div>
              <div>
                <Award className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Professional Quality</h3>
                <p className="text-slate-600">Industry-standard templates and formats.</p>
              </div>
              <div>
                <Briefcase className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Career Growth</h3>
                <p className="text-slate-600">Stand out to recruiters and hiring managers.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
