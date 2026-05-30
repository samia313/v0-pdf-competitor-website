'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, FileText, Merge, Split, FileDown, Image, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const slides = [
  {
    id: 1,
    title: 'All-in-One PDF Solution',
    subtitle: 'Every Tool You Need',
    description: 'Merge, split, compress, convert and edit PDF files. Free online tools that make PDF work simple.',
    buttonText: 'Explore All Tools',
    buttonLink: '/tools',
    icon: FileText,
    gradient: 'from-primary/20 via-primary/10 to-background',
    accentColor: 'bg-primary',
  },
  {
    id: 2,
    title: 'Merge PDF Files',
    subtitle: 'Combine Multiple PDFs',
    description: 'Join multiple PDF documents into one file in seconds. Drag, drop, and merge - it is that easy!',
    buttonText: 'Merge PDF Now',
    buttonLink: '/tools/merge-pdf',
    icon: Merge,
    gradient: 'from-blue-500/20 via-blue-500/10 to-background',
    accentColor: 'bg-blue-500',
  },
  {
    id: 3,
    title: 'Split PDF Pages',
    subtitle: 'Extract What You Need',
    description: 'Extract specific pages or split your PDF into multiple files. Full control over your documents.',
    buttonText: 'Split PDF Now',
    buttonLink: '/tools/split-pdf',
    icon: Split,
    gradient: 'from-green-500/20 via-green-500/10 to-background',
    accentColor: 'bg-green-500',
  },
  {
    id: 4,
    title: 'Compress PDF',
    subtitle: 'Reduce File Size',
    description: 'Reduce PDF file size without losing quality. Perfect for email attachments and web uploads.',
    buttonText: 'Compress PDF Now',
    buttonLink: '/tools/compress-pdf',
    icon: FileDown,
    gradient: 'from-orange-500/20 via-orange-500/10 to-background',
    accentColor: 'bg-orange-500',
  },
  {
    id: 5,
    title: 'Convert to PDF',
    subtitle: 'Word, Excel, Images & More',
    description: 'Convert Word, Excel, PowerPoint, and images to PDF format. Professional quality conversion.',
    buttonText: 'Convert Now',
    buttonLink: '/tools/jpg-to-pdf',
    icon: Image,
    gradient: 'from-purple-500/20 via-purple-500/10 to-background',
    accentColor: 'bg-purple-500',
  },
  {
    id: 6,
    title: 'Secure & Private',
    subtitle: 'Your Privacy Matters',
    description: 'All files are encrypted and automatically deleted. We never access or store your documents.',
    buttonText: 'Get Premium',
    buttonLink: '/pricing',
    icon: Shield,
    gradient: 'from-red-500/20 via-red-500/10 to-background',
    accentColor: 'bg-red-500',
  },
]

export const HeroSlider = memo(function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-b transition-all duration-700',
          slide.gradient
        )}
      />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          'absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 blur-3xl transition-colors duration-700',
          slide.accentColor
        )} />
        <div className={cn(
          'absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-20 blur-3xl transition-colors duration-700',
          slide.accentColor
        )} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="py-16 lg:py-24">
          {/* Slide Content */}
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className={cn(
                'flex h-20 w-20 items-center justify-center rounded-2xl transition-colors duration-500',
                slide.accentColor
              )}>
                <Icon className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-sm md:text-base font-medium text-primary uppercase tracking-wider mb-3 transition-all duration-500">
              {slide.subtitle}
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 transition-all duration-500 text-balance">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 transition-all duration-500 text-pretty">
              {slide.description}
            </p>

            {/* CTA Button */}
            <Link href={slide.buttonLink}>
              <Button size="lg" className="text-base px-8 h-12">
                {slide.buttonText}
              </Button>
            </Link>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => { prevSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => { nextSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  currentSlide === index
                    ? 'w-8 bg-primary'
                    : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute bottom-4 right-4 text-sm text-muted-foreground font-medium">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>
    </section>
  )
})
