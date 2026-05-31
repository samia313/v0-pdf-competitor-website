import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getPostsByCategory, blogCategories, blogPosts } from '@/lib/blog-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const categoryData = blogCategories.find(c => c.id === category)
  
  if (!categoryData) {
    return { title: 'Category Not Found' }
  }
  
  return {
    title: `${categoryData.name} - PDF Blog | OrbixDocs`,
    description: `${categoryData.description}. Browse all ${categoryData.name.toLowerCase()} articles about PDF tools and document management.`,
  }
}

export async function generateStaticParams() {
  return blogCategories.map((category) => ({
    category: category.id,
  }))
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const categoryData = blogCategories.find(c => c.id === category)
  
  if (!categoryData) {
    notFound()
  }
  
  const posts = getPostsByCategory(category)
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4">
                {posts.length} Article{posts.length !== 1 ? 's' : ''}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {categoryData.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {categoryData.description}
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              <Link href="/blog">
                <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  All Posts
                </Badge>
              </Link>
              {blogCategories.map((cat) => (
                <Link key={cat.id} href={`/blog/category/${cat.id}`}>
                  <Badge 
                    variant={cat.id === category ? "default" : "outline"} 
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {cat.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      {post.image && (
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {categoryData.name}
                          </Badge>
                          {post.featured && (
                            <Badge variant="secondary" className="text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-sm">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric'
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No articles found in this category.</p>
                <Link href="/blog">
                  <Badge variant="outline" className="px-4 py-2 cursor-pointer">
                    View All Posts
                  </Badge>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
