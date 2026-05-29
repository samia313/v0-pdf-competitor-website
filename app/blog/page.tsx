import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { blogPosts, blogCategories, getFeaturedPosts } from '@/lib/blog-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Clock, User, ArrowRight, Search, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'PDF Blog - Tips, Tutorials & Guides | PDFMaster',
  description: 'Learn everything about PDF tools, document management, and productivity tips. Free tutorials, guides, and expert advice.',
  keywords: 'pdf blog, pdf tutorials, pdf tips, document management, pdf guides',
}

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts()
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                <TrendingUp className="w-3 h-3 mr-1" />
                PDF Knowledge Hub
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                PDF Tips, Tutorials & Expert Guides
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Master PDF tools with our comprehensive guides. Learn document management, 
                productivity tips, and best practices from experts.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/blog">
                <Badge variant="default" className="px-4 py-2 text-sm cursor-pointer">
                  All Posts
                </Badge>
              </Link>
              {blogCategories.map((category) => (
                <Link key={category.id} href={`/blog/category/${category.id}`}>
                  <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    {category.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Articles</h2>
              <Badge variant="secondary">Editor&apos;s Pick</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {blogCategories.find(c => c.id === post.category)?.name}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Latest Articles</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {blogCategories.find(c => c.id === post.category)?.name}
                        </Badge>
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Try Our PDF Tools?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Put your new knowledge into practice. Use our free PDF tools to merge, 
              split, compress, and convert your documents.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tools">
                <Button size="lg" variant="secondary">
                  Explore All Tools
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  View Premium Plans
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
