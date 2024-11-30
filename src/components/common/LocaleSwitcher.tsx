'use client'

import { Locale, locales } from '@/i18n/config'
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
    <select className="p-2" defaultValue={locale} onChange={onChange}>
      {locales.map((l) => (
        <option key={l} value={l} className="bg-none">
          {l}
        </option>
      ))}
    </select>
  )
}
