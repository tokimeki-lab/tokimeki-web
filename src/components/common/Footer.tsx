import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Urls } from '@/utils/urls'
import Link from 'next/link'

const Footer = async () => {
  const { common } = await getDictionary()
  const { credits: t } = await getDictionary()
  return (
    <footer className="grid gap-4 p-32 text-center">
      <div className="">
        <Link href="/" className="text-xs text-gray-500">
          {common.title}
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
      {!isDefaultLocale && (
        <div className="flex justify-center space-x-1 text-xs text-gray-500">
          <span>Translation Support:</span>
          {t.map((item) => (
            <Link key={item.name} href={item.url} target="_blank">
              {item.name}
            </Link>
          ))}
        </div>
      )}
      <Link href="https://manage.tokiken.com" className="text-xs text-gray-200">
        Admin
      </Link>
    </footer>
  )
}

export default Footer
