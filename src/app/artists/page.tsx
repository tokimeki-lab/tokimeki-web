import IndexedArtistCollection from '@/components/artists/IndexedArtistCollection'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import IndexNav, { jpIndexNavItems } from '@/components/common/IndexNav'
import getMetadata from '@/components/common/Meta'
import Title from '@/components/common/Title'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const { artists: t } = await getDictionary()
  const title = t.title
  const description = t.desc
  const meta = await getMetadata(title, description)
  return meta
}

const Artists = async () => {
  const { artists: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg text-center px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/artists' }]} />
      <Title title={t.title} description={t.desc} />
      <div className="pb-4">
        <IndexNav items={jpIndexNavItems} />
      </div>
      <IndexedArtistCollection />
    </Container>
  )
}

export default Artists
