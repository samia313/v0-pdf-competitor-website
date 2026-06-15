import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { getAllClusters } from '@/lib/blog-clusters'

export function ClusterNavigation() {
  const clusters = getAllClusters()

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {clusters.map(cluster => (
        <Link key={cluster.id} href={cluster.hubPath}>
          <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
            {cluster.name}
          </Badge>
        </Link>
      ))}
    </div>
  )
}
