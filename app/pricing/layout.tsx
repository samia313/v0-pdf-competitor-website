import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simple & Affordable PDF Tools Pricing | PDFilio Plans',
  description: 'Check out PDFilio\'s simple and transparent pricing plans. Free for basic use, affordable Pro and Business plans with premium features.',
  openGraph: {
    title: 'Simple & Affordable PDF Tools Pricing | PDFilio Plans',
    description: 'Check out PDFilio\'s simple and transparent pricing plans. Free for basic use, affordable Pro and Business plans with premium features.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
