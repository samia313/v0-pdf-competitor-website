'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog-data'

export default function AdminContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Content Management</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage blog posts and pages
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blog Posts */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Blog Posts</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Total: {blogPosts.length} posts published
            </p>
          </div>

          <div className="space-y-3">
            {blogPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {post.description}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="outline" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon" disabled title="Edit coming soon">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Content Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Blog Posts</p>
                <p className="text-3xl font-bold mt-2">{blogPosts.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-3xl font-bold mt-2">
                  {new Set(blogPosts.map(p => p.category)).size}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tags</p>
                <p className="text-3xl font-bold mt-2">
                  {new Set(blogPosts.flatMap(p => p.tags)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
