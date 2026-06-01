import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getBlogPost, getRelatedPosts, blogCategories, blogPosts } from '@/lib/blog-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, BookOpen, Tag } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return { title: 'Post Not Found' }
  }
  
  return {
    title: `${post.title} | ClixPDF Blog`,
    description: post.description,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    notFound()
  }
  
  const relatedPosts = getRelatedPosts(slug, 3)
  const category = blogCategories.find(c => c.id === post.category)
  
  // Convert markdown-like content to HTML
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">${line.slice(3)}</h2>`
        }
        if (line.startsWith('### ')) {
          return `<h3 class="text-xl font-semibold mt-6 mb-3 text-foreground">${line.slice(4)}</h3>`
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return `<p class="font-semibold mt-4 mb-2 text-foreground">${line.slice(2, -2)}</p>`
        }
        if (line.startsWith('- ')) {
          return `<li class="ml-6 mb-1 text-muted-foreground">${line.slice(2)}</li>`
        }
        if (line.startsWith('| ')) {
          return '' // Skip table lines for now
        }
        if (line.trim() === '') {
          return ''
        }
        if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ')) {
          return `<li class="ml-6 mb-1 text-muted-foreground list-decimal">${line.slice(3)}</li>`
        }
        return `<p class="mb-4 text-muted-foreground leading-relaxed">${line}</p>`
      })
      .join('')
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary">Blog</Link>
              <span>/</span>
              <Link href={`/blog/category/${post.category}`} className="hover:text-primary">
                {category?.name}
              </Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <article className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              
              {/* Article Meta */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="secondary">
                    {category?.name}
                  </Badge>
                  {post.featured && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
                  {post.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6 text-pretty">
                  {post.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-6 border-b">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Article
                  </span>
                </div>
              </div>

              {/* Featured Image */}
              {post.image && (
                <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              )}

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Found this helpful?</h3>
                    <p className="text-sm text-muted-foreground">Share it with others who might benefit.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Article
                    </Button>
                  </div>
                </div>
              </div>

              {/* CTA Box */}
              <div className="mt-12 p-8 bg-primary/5 border border-primary/20 rounded-xl text-center">
                <h3 className="text-xl font-bold mb-2">Ready to Try It Yourself?</h3>
                <p className="text-muted-foreground mb-6">
                  Use our free PDF tools to put this knowledge into practice.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/tools">
                    <Button>
                      Explore PDF Tools
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline">
                      View Premium Plans
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 lg:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <Card className="h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="pb-2">
                          <Badge variant="outline" className="w-fit text-xs mb-2">
                            {category?.name}
                          </Badge>
                          <CardTitle className="text-base line-clamp-2 hover:text-primary transition-colors">
                            {relatedPost.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {relatedPost.readTime}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* More Articles */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Explore More Articles</h2>
            <p className="text-muted-foreground mb-8">
              Discover more tips, tutorials, and guides to master PDF tools.
            </p>
            <Link href="/blog">
              <Button size="lg">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
