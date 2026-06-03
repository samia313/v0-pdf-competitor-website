import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'ClixPDF - Free Online PDF Tools',
  description: 'Free online PDF tools to merge, split, compress, convert PDF files. Edit PDF documents easily with our powerful and secure PDF editor.',
  keywords: 'PDF tools, merge PDF, split PDF, compress PDF, convert PDF, PDF to Word, Word to PDF, PDF editor, free PDF tools',
  authors: [{ name: 'ClixPDF' }],
  openGraph: {
    title: 'ClixPDF - Free Online PDF Tools',
    description: 'Free online PDF tools to merge, split, compress, convert PDF files.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClixPDF - Free Online PDF Tools',
    description: 'Free online PDF tools to merge, split, compress, convert PDF files.',
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
     <meta name="google-site-verification" content="amo41A_OPlpxZ8xPL8rUJl9lI72Zmi69k_ZlUNRdATQ" />
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
