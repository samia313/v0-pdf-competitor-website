import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale } from '@/lib/i18n/config'

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (!locales.includes(locale as any)) {
    return {
      messages: (await import(`./messages/${defaultLocale}.json`)).default,
    }
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
