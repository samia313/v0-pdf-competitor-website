import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  Shield,
  Zap,
  Globe,
  Users,
  Heart,
  Award,
  FileText,
  Lock,
  Clock,
  Sparkles,
} from 'lucide-react'
import { metaTitles, metaDescriptions } from '@/lib/meta-titles'

export const metadata = {
  title: metaTitles.about,
  description: metaDescriptions.about,
}

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description:
      'We design our document workflows with privacy and secure processing in mind. Processing behavior depends on the specific tool and is described on the relevant page.',
  },
  {
    icon: Zap,
    title: 'Fast and Simple',
    description:
      'Our tools are designed to make common document tasks straightforward, with clear workflows and minimal setup.',
  },
  {
    icon: Globe,
    title: 'Accessible Everywhere',
    description:
      'Use PDFilio from supported modern web browsers across desktop and mobile devices without installing traditional desktop software.',
  },
  {
    icon: Heart,
    title: 'Useful Free Tools',
    description:
      'Many core PDF tools are available without an account, while selected advanced features and plans provide additional capabilities.',
  },
]

const features = [
  {
    icon: FileText,
    title: 'Comprehensive Tools',
    description:
      'From merging and splitting to conversion, OCR, editing, and AI-assisted document workflows, PDFilio brings common document tasks together.',
  },
  {
    icon: Lock,
    title: 'Privacy Focused',
    description:
      'We explain how document processing, data retention, cookies, analytics, and other services are handled in our Privacy Policy.',
  },
  {
    icon: Clock,
    title: 'Available Online',
    description:
      'Access supported PDF and document tools online whenever you need them, subject to service availability.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered',
    description:
      'AI features can help with tasks such as summarization, translation, extraction, and document analysis.',
  },
]

const team = [
  {
    name: 'Mission',
    role: 'Our Purpose',
    description:
      'To make practical PDF and document tools easier to access for individuals, students, professionals, and businesses.',
  },
  {
    name: 'Vision',
    role: 'Our Future',
    description:
      'To build a dependable document platform that combines useful PDF workflows, privacy-conscious processing, and practical AI features.',
  },
  {
    name: 'Values',
    role: 'Our Principles',
    description:
      'Transparency, user privacy, useful products, continuous improvement, and clear communication about how our services work.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About PDFilio
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                PDFilio provides online PDF and document tools designed to make common file tasks easier, more accessible, and easier to understand.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Our Story
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-4">
                  PDFilio was created around a simple idea: common PDF tasks should not require complicated software or a long setup process.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  The platform brings everyday PDF operations such as merging, splitting, compression, conversion, editing, OCR, and document organization into one web-based workspace.
                </p>
                <p className="text-lg leading-relaxed">
                  PDFilio is also expanding into AI-assisted document workflows, including summarization, translation, extraction, and document analysis. We aim to improve these tools while being transparent about processing, privacy, and service limitations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((item) => (
                <div key={item.name} className="text-center p-8 rounded-2xl bg-card border border-border">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{item.name}</h3>
                  <p className="text-sm text-primary mb-4">{item.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Why Choose PDFilio?</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              We combine practical PDF workflows with a clear, browser-based experience and growing AI capabilities.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <Users className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium text-primary">Explore PDFilio</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Simplify Your PDF Workflow?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Explore the available tools or contact us if you need help with a PDFilio feature.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/tools" className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  Explore All Tools
                </a>
                <a href="/contact" className="inline-flex items-center justify-center rounded-lg border border-border px-8 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
