import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { getRelatedTools, getToolSilo } from '@/lib/topic-clusters'
import { metaTitles } from '@/lib/meta-titles'

export function RelatedTools({ toolId }: { toolId: string }) {
  const relatedToolIds = getRelatedTools(toolId, 4)
  const silo = getToolSilo(toolId)

  if (relatedToolIds.length === 0) return null

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Related {silo?.name} Tools
          </h2>
          <p className="text-slate-600">
            Explore other tools in the {silo?.name.toLowerCase()} category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedToolIds.map(toolId => {
            const toolKey = toolId.toLowerCase() as keyof typeof metaTitles
            return (
              <Link key={toolId} href={`/tools/${toolId}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base line-clamp-2">
                      {metaTitles[toolKey]?.split(' |')[0] || toolId}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full">
                      Try Tool <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {silo && (
          <div className="mt-8 text-center">
            <Link href={silo.hubPath}>
              <Button size="lg" variant="outline">
                View All {silo.name} Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
