import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from '@/lib/i18n/config'

export default createMiddleware({
  locales: locales as any,
  defaultLocale: defaultLocale,
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
