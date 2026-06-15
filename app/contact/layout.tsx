import { Metadata } from 'next'
import { metaTitles, metaDescriptions } from '@/lib/meta-titles'

export const metadata: Metadata = {
  title: metaTitles.contact,
  description: metaDescriptions.contact,
  openGraph: {
    title: metaTitles.contact,
    description: metaDescriptions.contact,
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
