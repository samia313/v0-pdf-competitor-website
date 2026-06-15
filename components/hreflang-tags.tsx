'use client'

import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { locales } from '@/lib/i18n/config'

interface HreflangProps {
  baseUrl?: string
}

export function HreflangTags({ baseUrl = 'https://www.pdfilio.com' }: HreflangProps) {
  const locale = useLocale()
  const pathname = usePathname()

  // Remove locale prefix from pathname to get the path
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

  return (
    <>
      {locales.map((l) => (
        <link
          key={`hreflang-${l}`}
          rel="alternate"
          hrefLang={l}
          href={`${baseUrl}/${l}${pathWithoutLocale}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}/en${pathWithoutLocale}`}
      />
    </>
  )
}
