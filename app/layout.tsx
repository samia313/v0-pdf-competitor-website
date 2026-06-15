import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Free PDF Tools Online | Merge, Convert, Edit & More | PDFilio',
  description: 'Free online PDF tools for merging, converting, editing, and more. No registration required. Fast, secure, and easy to use.',
  keywords: 'PDF tools, merge PDF, split PDF, compress PDF, convert PDF, PDF to Word, Word to PDF, PDF editor, free PDF tools, AI PDF',
  authors: [{ name: 'PDFilio' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Free PDF Tools Online | Merge, Convert, Edit & More | PDFilio',
    description: 'Free online PDF tools for merging, converting, editing, and more. No registration required. Fast, secure, and easy to use.',
    type: 'website',
    url: 'https://www.pdfilio.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Tools Online | Merge, Convert, Edit & More | PDFilio',
    description: 'Free online PDF tools for merging, converting, editing, and more. No registration required. Fast, secure, and easy to use.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
        {/* Google AdSense */}
        <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID} />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
