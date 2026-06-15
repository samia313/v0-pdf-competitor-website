import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI PDF Tools | AI-Powered PDF Analysis & Processing | PDFilio',
  description: 'AI-powered PDF tools for smart analysis. Chat with PDFs, auto-summarize, translate, OCR, generate quizzes, and more with artificial intelligence.',
  keywords: 'ai pdf, pdf ai, pdf summarizer, pdf chat, pdf analysis, ai document, ocr pdf',
}

export default function AIToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
