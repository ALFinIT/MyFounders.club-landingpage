'use client'

import { useState } from 'react'
import { useRouter, usePathname } from '@/lib/i18n'
import { locales } from '@/lib/i18n'
import { useLocale } from 'next-intl'

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const switchLocale = (locale: string) => {
    router.push(pathname, { locale })
    setIsOpen(false)
  }

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white hover:bg-white/20 transition-colors whitespace-nowrap"
      >
        🌐 {currentLocale === 'en' ? 'EN' : 'عربي'}
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-black/95 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden min-w-[140px]">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`block w-full px-4 py-2 text-sm text-left transition-colors ${
                currentLocale === locale 
                  ? 'bg-orange-500 text-white' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {locale === 'en' ? '🇬🇧 English' : '🇸🇦 العربية'}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}