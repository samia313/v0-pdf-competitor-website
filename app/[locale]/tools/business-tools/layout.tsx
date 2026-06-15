import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Tools | Invoice & Proposal Generator | PDFilio',
  description: 'Professional business document tools. Generate invoices, proposals, and business documents instantly. Save time on document creation.',
  keywords: 'business tools, invoice generator, proposal generator, business documents, invoicing',
}

export default function BusinessToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
