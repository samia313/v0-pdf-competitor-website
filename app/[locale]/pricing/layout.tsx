import { Metadata } from 'next'
import { metaTitles, metaDescriptions } from '@/lib/meta-titles'

export const metadata: Metadata = {
  title: metaTitles.pricing,
  description: metaDescriptions.pricing,
  openGraph: {
    title: metaTitles.pricing,
    description: metaDescriptions.pricing,
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
