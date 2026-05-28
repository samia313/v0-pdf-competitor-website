import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'PDFMaster - Free Online PDF Tools',
  description: 'Free online PDF tools to merge, split, compress, convert PDF files. Edit PDF documents easily with our powerful and secure PDF editor.',
  keywords: 'PDF tools, merge PDF, split PDF, compress PDF, convert PDF, PDF to Word, Word to PDF, PDF editor, free PDF tools',
  authors: [{ name: 'PDFMaster' }],
  openGraph: {
    title: 'PDFMaster - Free Online PDF Tools',
    description: 'Free online PDF tools to merge, split, compress, convert PDF files.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFMaster - Free Online PDF Tools',
    description: 'Free online PDF tools to merge, split, compress, convert PDF files.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
