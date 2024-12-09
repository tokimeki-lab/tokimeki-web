import ArtistDetails from '@/components/artists/ArtistDetails'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import prisma from '@/db/prisma'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata | null> => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    return null
  }
  const artist = await getArtist(id)
  if (!artist) {
    return null
  } else {
    const { artists: t } = await getDictionary()
    const title = `${isDefaultLocale ? artist.name : artist.name_en} - ${t.title}`
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
}

export const generateStaticParams = async () => {
  return []
}

const Artist = async ({ params }: Props) => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    notFound()
  }
  const artist = await getArtist(id)
  if (!artist) {
    notFound()
  }
  const { artists: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg  px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/artists' }]} />
      <ArtistDetails artist={artist} />
    </Container>
  )
}

const getArtist = unstable_cache(async (id: number) =>
  prisma.artists.findUnique({
    include: {
      costumes: {
        include: {
          costume_images: {
            take: 1,
          },
        },
      },
    },
    where: { id },
  })
)

export default Artist
