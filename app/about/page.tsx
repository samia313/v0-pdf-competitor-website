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
  Sparkles
} from 'lucide-react'

export const metadata = {
  title: 'About Us - OrbixDocs | Free Online PDF Tools',
  description: 'Learn about OrbixDocs - your trusted destination for free, secure, and easy-to-use PDF tools. Our mission is to make PDF editing accessible to everyone.',
}

const stats = [
  { label: 'Monthly Users', value: '1M+' },
  { label: 'Files Processed', value: '50M+' },
  { label: 'Tools Available', value: '22+' },
  { label: 'Countries Served', value: '190+' },
]

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Your files are processed locally in your browser. We never store your documents on our servers.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Our tools are optimized for speed. Process your PDFs in seconds, not minutes.',
  },
  {
    icon: Globe,
    title: 'Accessible Everywhere',
    description: 'Works on any device with a web browser. No downloads or installations required.',
  },
  {
    icon: Heart,
    title: 'Free Forever',
    description: 'Core PDF tools are and will always be free. We believe in making tools accessible to everyone.',
  },
]

const features = [
  {
    icon: FileText,
    title: 'Comprehensive Tools',
    description: 'From merging and splitting to OCR and AI-powered features, we have everything you need.',
  },
  {
    icon: Lock,
    title: 'Privacy Protected',
    description: 'GDPR compliant. Your data stays private and is never shared with third parties.',
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description: 'Our tools are available around the clock, whenever you need them.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered',
    description: 'Advanced AI tools for summarization, translation, and intelligent document processing.',
  },
]

const team = [
  {
    name: 'Mission',
    role: 'Our Purpose',
    description: 'To democratize PDF tools and make document management accessible to individuals and businesses worldwide, regardless of their technical expertise or budget.',
  },
  {
    name: 'Vision',
    role: 'Our Future',
    description: 'To become the world\'s most trusted and comprehensive platform for PDF solutions, setting the standard for ease of use, security, and innovation.',
  },
  {
    name: 'Values',
    role: 'Our Principles',
    description: 'Transparency, user privacy, continuous improvement, and unwavering commitment to providing free, high-quality tools that respect our users.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About OrbixDocs
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We are on a mission to make PDF tools accessible, secure, and free for everyone. 
                Our platform empowers millions of users worldwide to manage their documents with ease.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Our Story
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-4">
                  OrbixDocs was born from a simple frustration: why should basic PDF operations 
                  require expensive software or complex installations? We believed there had to 
                  be a better way.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  In 2024, we set out to create a platform that would handle PDF tasks directly 
                  in the browser, ensuring your documents never leave your device. What started 
                  as a simple PDF merger has grown into a comprehensive suite of 22+ tools.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, OrbixDocs serves over a million users monthly from 190+ countries. 
                  We continue to innovate, adding AI-powered features like document summarization 
                  and translation, while staying true to our core promise: powerful PDF tools 
                  that are free, secure, and easy to use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((item) => (
                <div
                  key={item.name}
                  className="text-center p-8 rounded-2xl bg-card border border-border"
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-primary mb-4">{item.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Why Choose OrbixDocs?
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              We combine cutting-edge technology with user-friendly design to deliver 
              the best PDF experience.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors"
                >
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <Users className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium text-primary">Join Our Community</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Transform Your PDF Workflow?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join millions of users who trust OrbixDocs for their document needs. 
                No registration required - start using our tools right away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/tools"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Explore All Tools
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-border px-8 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
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
