// Cache locale layouts for 1 hour, revalidate on demand
export const revalidate = 3600

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, isRTL } from '@/lib/i18n/config'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const BASE_URL = 'https://www.pdfilio.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Free PDF Tools Online | Merge, Convert, Edit & More | PDFilio',
  description: 'Free online PDF tools for merging, converting, editing, and more. Fast, secure, and easy to use.',
  authors: [{ name: 'PDFilio' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Free PDF Tools Online | Merge, Convert, Edit & More | PDFilio',
    description: 'Free online PDF tools for merging, converting, editing, and more. Fast, secure, and easy to use.',
    type: 'website',
    siteName: 'PDFilio',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Tools Online | Merge, Convert, Edit & More | PDFilio',
    description: 'Free online PDF tools for merging, converting, editing, and more. Fast, secure, and easy to use.',
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params

  if (!locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()
  const isRtl = isRTL(locale as any)

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className="bg-background">
      <head>
        {/* Google AdSense account verification. The ad script itself should only be enabled after AdSense approval. */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <meta
            name="google-adsense-account"
            content={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
          />
        )}

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
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}