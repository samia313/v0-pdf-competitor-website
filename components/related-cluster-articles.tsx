import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { getRelatedClusters } from '@/lib/blog-clusters'

interface RelatedClusterArticlesProps {
  clusterId: string
  limit?: number
}

export function RelatedClusterArticles({ clusterId, limit = 3 }: RelatedClusterArticlesProps) {
  const relatedClusters = getRelatedClusters(clusterId, limit)

  if (relatedClusters.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Explore Other Topics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedClusters.map(cluster => (
          <Link key={cluster.id} href={cluster.hubPath}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{cluster.name}</CardTitle>
                <CardDescription>{cluster.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{cluster.articleCount} articles</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
