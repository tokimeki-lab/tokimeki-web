import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import IndexNav, { jpIndexNavItems } from '@/components/common/IndexNav'
import Title from '@/components/common/Title'
import IndexedSongCollection from '@/components/songs/IndexedSongCollection'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const { songs: t } = await getDictionary()
  const title = t.title
  const description = t.desc
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

const Songs = async () => {
  const { songs: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg text-center px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/songs' }]} />
      <Title title={t.title} description={t.desc} />
      <IndexNav items={jpIndexNavItems} />
      <IndexedSongCollection />
    </Container>
  )
}

export default Songs
