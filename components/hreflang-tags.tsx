import { getLocale, getPathname } from 'next-intl/server'
import { getAllLocales } from '@/lib/i18n/locale-utils'

interface HreflangProps {
  baseUrl?: string
}

export async function HreflangTags({ baseUrl = 'https://www.pdfilio.com' }: HreflangProps) {
  const locale = await getLocale()
  const pathname = getPathname() || '/'
  const allLocales = getAllLocales()

  // Remove locale prefix from pathname to get the path
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

  return (
    <>
      {allLocales.map((l) => (
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
