'use client'

import { Locale, localeLabels, locales } from '@/i18n/config'
import { setUserLocale } from '@/i18n/locale'
import { useLocale } from 'next-intl'
import { ChangeEvent, useTransition } from 'react'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const [, startTransition] = useTransition()

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }
  return (
    <select
      className="px-2 py-1 text-xs text-white text-right bg-secondary rounded-full focus:outline-none appearance-none"
      defaultValue={locale}
      onChange={onChange}>
      {locales.map((l, i) => (
        <option key={l} value={l} className="bg-none">
          {localeLabels[i].emoji} {localeLabels[i].label}
        </option>
      ))}
    </select>
  )
}
