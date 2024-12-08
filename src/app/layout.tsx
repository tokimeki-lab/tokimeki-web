import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import { currentBaseUrl, currentLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { DictionaryProvider } from '@/i18n/hook'
import { ReactNode } from 'react'
import './globals.css'

export async function generateMetadata() {
  const { common } = await getDictionary()
  const { title, desc } = common

  return {
    title,
    description: desc,
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
    metadataBase: currentBaseUrl,
    openGraph: {
      title,
      description: desc,
      siteName: title,
      locale: currentLocale,
      type: 'website',
      images: [
        {
          url: `${currentBaseUrl}/300x300.png`,
          width: 300,
          height: 300,
        },
      ],
    },
    twitter: {
      title,
      description: desc,
      creator: '@kusabure',
      images: [`${currentBaseUrl}/300x300.png`],
      card: 'summary',
    },
  }
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const dictionary = await getDictionary(currentLocale)
  return (
    <html lang={currentLocale}>
      <body>
        <DictionaryProvider dictionary={dictionary}>
          <Header />
          <main>{children}</main>
          <Footer />
        </DictionaryProvider>
      </body>
    </html>
  )
}
