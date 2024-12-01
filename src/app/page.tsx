import Container from '@/components/common/Container'
import MenuSection from '@/components/home/MenuSection'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('home')
  return (
    <Container className="max-w-screen-sm text-center px-8 md:px-2">
      <div className="py-16 text-xs text-gray-500">{t('subtitle')}</div>
      <div className="px-0 sm:px-8">
        <MenuSection
          title={t('dbtitle')}
          description={t('dbdesc')}
          items={[
            { icon: '🎼', name: t('songs'), href: '/songs' },
            { icon: '💿', name: t('records'), href: '/records' },
            { icon: '🎤', name: t('artists'), href: '/artists' },
            { icon: '🎬', name: t('youtube'), href: '/youtube' },
            { icon: '👗', name: t('costumes'), href: '/costumes' },
            { icon: '🗓️', name: t('events'), href: '/calendar' },
            { icon: '📝', name: t('articles'), href: '/articles' },
          ]}
        />
        <MenuSection
          title={t('labtitle')}
          description={t('labdesc')}
          items={[
            { icon: '📙', name: t('posts'), href: '/posts' },
            { icon: '📷', name: t('photos'), href: '/photos', enabled: false },
          ]}
        />
      </div>
    </Container>
  )
}
