import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ToolCard } from '@/components/tool-card'
import { AdBanner } from '@/components/ad-units'
import { HeroSlider } from '@/components/hero-slider'
import { pdfTools, categories } from '@/lib/tools-data'
import { ToolIcon } from '@/components/tool-icon'
import { Check, Zap, Shield, Globe } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'

export const metadata = {
  title: 'pdfilio - Free Online PDF Tools | Merge, Split, Compress',
  description: 'Free online PDF tools to merge, split, compress, convert PDF files. Fast, secure, and easy to use. No registration required.',
  keywords: 'PDF tools, merge PDF, split PDF, compress PDF, convert PDF, PDF editor, free PDF tools online',
}

export default function HomePage() {
  const popularTools = pdfTools.filter((tool) => tool.popular)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Ad Banner */}
        <div className="container mx-auto px-4 -mt-4">
          <AdBanner slot="hero-banner" className="max-w-4xl mx-auto" />
        </div>

        {/* Popular Tools */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Most Popular PDF Tools
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Quick access to our most-used tools
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {popularTools.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </div>
          </div>
        </section>

        {/* All Tools by Category */}
        <section className="py-16 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                All PDF Tools
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Choose from 20+ free PDF tools
              </p>
            </div>

            {categories.map((category) => {
              const categoryTools = pdfTools.filter(
                (tool) => tool.category === category.id
              )
              if (categoryTools.length === 0) return null

              return (
                <div key={category.id} className="mb-12 last:mb-0">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <ToolIcon icon={category.icon} className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {category.name}
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoryTools.map((tool) => (
                      <ToolCard key={tool.id} {...tool} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Ad Banner */}
        <div className="container mx-auto px-4 py-8">
          <AdBanner slot="middle-banner" className="max-w-4xl mx-auto" />
        </div>

        {/* Features Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Choose pdfilio?
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Trusted by millions of users worldwide
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  description:
                    'Process your PDFs in seconds. Our optimized tools work quickly without compromising quality.',
                },
                {
                  icon: Shield,
                  title: 'Secure & Private',
                  description:
                    'Your files are encrypted and automatically deleted after processing. Your privacy is our priority.',
                },
                {
                  icon: Check,
                  title: '100% Free',
                  description:
                    'All our PDF tools are completely free to use. No hidden costs or subscriptions.',
                },
                {
                  icon: Globe,
                  title: 'Works Everywhere',
                  description:
                    'Access our tools from any device - desktop, tablet, or mobile. No installation needed.',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-card border border-border"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                How It Works
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Three simple steps to process your PDFs
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              {[
                {
                  step: '1',
                  title: 'Upload Your Files',
                  description: 'Drag and drop or click to select your PDF files',
                },
                {
                  step: '2',
                  title: 'Process',
                  description: 'Choose your tool and let us handle the rest',
                },
                {
                  step: '3',
                  title: 'Download',
                  description: 'Get your processed files instantly',
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-4 max-w-4xl mx-auto text-center">
              {[
                { value: '10M+', label: 'Files Processed' },
                { value: '20+', label: 'PDF Tools' },
                { value: '100%', label: 'Free Forever' },
                { value: '24/7', label: 'Available' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Ad */}
        <div className="container mx-auto px-4 pb-8">
          <AdBanner slot="bottom-banner" className="max-w-4xl mx-auto" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
