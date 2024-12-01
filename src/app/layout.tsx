import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { ReactNode } from 'react'
import './globals.css'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations('common')
  return {
    title: t('title'),
    description: t('desc'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: './300x300.png',
    },
    metadataBase: new URL('https://tokiken.com'),
    openGraph: {
      title: t('title'),
      description: t('desc'),
      siteName: t('title'),
      locale: locale,
      type: 'website',
      images: [
        {
          url: 'https://tokiken.com/300x300.png',
          width: 300,
          height: 300,
        },
      ],
    },
    twitter: {
      title: t('title'),
      description: t('desc'),
      creator: '@kusabure',
      images: ['https://tokiken.com/300x300.png'],
      card: 'summary',
    },
  }
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const lang = await getLocale()
  const messages = await getMessages()
  return (
    <html lang={lang}>
      <NextIntlClientProvider messages={messages}>
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
