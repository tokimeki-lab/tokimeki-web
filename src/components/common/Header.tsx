import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'

const Header = () => {
  const t = useTranslations('common')
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-2 bg-secondary">
        <div className="grid grid-cols-3">
          <div />
          <div className="flex justify-center items-center">
            <Link href="/">
              <Image src="/logo.webp" alt={t('title')} width={204} height={33} priority={true} />
            </Link>
          </div>
          <div className="flex justify-end items-center mr-4">
            <LocaleSwitcher />
          </div>
        </div>
      </header>
      <div className="h-14 w-full" />
    </>
  )
}

export default Header
