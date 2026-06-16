'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'
import { locales, localeNames, localeFlags } from '@/lib/i18n/config'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from pathname and add the new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, '')
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span>{localeFlags[locale as any]}</span>
          <span className="hidden sm:inline text-xs">
            {localeNames[locale as any].split('(')[0].trim()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => handleLanguageChange(l)}
            className={locale === l ? 'bg-accent' : ''}
          >
            <span className="mr-2">{localeFlags[l as any]}</span>
            <span>{localeNames[l as any]}</span>
            {locale === l && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
