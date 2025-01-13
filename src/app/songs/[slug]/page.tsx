import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import RecordEditionCollection from '@/components/records/RecordEditionCollection'
import SongCredits from '@/components/songs/SongCredits'
import SongMetadata from '@/components/songs/SongMetadata'
import SongVideoCollection from '@/components/songs/SongVideoCollection'
import prisma from '@/db/prisma'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata | null> => {
  const p = await params
  const slug = decodeURIComponent(p.slug)
  const song = await getSongBySlug(slug)
  if (!song) {
    return null
  } else {
    const { songs: t } = await getDictionary()
    const title = `${isDefaultLocale ? song.title : song.title_en} - ${t.title}`
    const description = `超ときめき♡宣伝部の楽曲: ${song.title} のデータ`
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

const Song = async ({ params }: Props) => {
  const p = await params
  const slug = decodeURIComponent(p.slug)
  const song = await getSongBySlug(slug)
  if (!song) {
    notFound()
  }
  const { id } = song
  const { songs: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/songs' }]} />
      <SongMetadata song={song} />
      <SongCredits songId={id} />
      <div className="py-4">
        <SectionHeading title={`💿 ${t.records}`} />
        <RecordEditionCollection songId={id} />
      </div>
      <SongVideoCollection songId={id} short={false} />
      <SongVideoCollection songId={id} short={true} />
    </Container>
  )
}

const getSongBySlug = unstable_cache(
  async (slug: string) =>
    prisma.songs.findFirst({
      where: {
        slug,
      },
    }),
  undefined,
  { tags: [CacheTag('Songs')] }
)

export default Song
