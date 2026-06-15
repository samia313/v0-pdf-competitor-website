import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact PDFilio | Get Support & Feedback',
  description: 'Get in touch with the PDFilio team. Send us your feedback, questions, or support requests and we\'ll get back to you soon.',
  openGraph: {
    title: 'Contact PDFilio | Get Support & Feedback',
    description: 'Get in touch with the PDFilio team. Send us your feedback, questions, or support requests and we\'ll get back to you soon.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
