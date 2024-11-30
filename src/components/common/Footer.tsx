import { Urls } from '@/utils/urls'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const Footer = () => {
  const t = useTranslations('common')
  const isoDate = new Date().toISOString()
  return (
    <footer className="grid gap-4 p-32 text-center">
      <div className="">
        <Link href="/" className="text-xs text-gray-500">
          {t('title')}
        </Link>
      </div>
      <div className="flex justify-center space-x-4">
        <Link href={Urls.inqiuryForm} target="_blank" className="text-xs text-gray-500">
          Contact
        </Link>
        <Link href="/privacy" className="text-xs text-gray-500">
          Privacy Policy
        </Link>
        <Link href="https://twitter.com/kusabure" target="_blank" className="text-xs text-gray-500">
          Twitter
        </Link>
      </div>
      <div className="text-xs text-gray-200">generated at {isoDate}</div>
    </footer>
  )
}

export default Footer
