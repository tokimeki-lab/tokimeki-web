import Container from '@/components/common/Container'
import MenuSection from '@/components/home/MenuSection'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export default async function Home() {
  const { home } = await getDictionary()
  return (
    <Container className="max-w-screen-sm text-center px-8 md:px-2">
      <div className="py-16 text-xs text-gray-500">{home.subtitle}</div>
      <div className="px-0 sm:px-8">
        <MenuSection
          title={home.dbtitle}
          description={home.dbdesc}
          items={[
            { icon: '🎼', name: home.songs, href: '/songs' },
            { icon: '💿', name: home.records, href: '/records' },
            { icon: '🎤', name: home.artists, href: '/artists' },
            { icon: '🎬', name: home.youtube, href: '/youtube' },
            { icon: '👗', name: home.costumes, href: '/costumes' },
            { icon: '🗓️', name: home.events, href: '/calendar' },
            { icon: '📝', name: home.articles, href: '/articles' },
          ]}
        />
        {isDefaultLocale && (
          <MenuSection
            title={home.labtitle}
            description={home.labdesc}
            items={[
              { icon: '📙', name: home.posts, href: '/posts' },
              { icon: '📷', name: home.photos, href: '/photos', enabled: false },
            ]}
          />
        )}
      </div>
    </Container>
  )
}
