import { YouTubeVideosPerPage } from '@/app/youtube/const'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import Pagenation from '@/components/common/Pagenation'
import Title from '@/components/common/Title'
import VideoCollection from '@/components/youtube/VideoCollection'
import prisma from '@/db/prisma'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { format } from 'util'

export const revalidate = 43200

interface Props {
  params: Promise<{ id: string; page: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata | null> => {
  const p = await params
  const id = p.id ? parseInt(p.id) : undefined
  const page = parseInt('1')
  if (!id || isNaN(page) || page < 1) {
    return null
  }
  const type = await getYouTubeVideoType(id)
  if (!type) {
    return null
  } else {
    const { youtube: t } = await getDictionary()
    const title = `${type.name} - ${t.title}`
    const description = `${type.name} - ${t.desc}`
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

const YouTubeTypeVideosPage = async ({ params }: Props) => {
  const p = await params
  const id = parseInt(p.id)
  const page = parseInt(p.page as string)
  if (isNaN(id) || isNaN(page) || id < 1 || page < 1) {
    notFound()
  }
  const type = await getYouTubeVideoType(id)
  if (!type) {
    notFound()
  }
  const offset = (page - 1) * YouTubeVideosPerPage
  const videos = await listYouTubeVideos(id, offset, YouTubeVideosPerPage + 1)
  if (videos.length === 0) {
    notFound()
  }
  const hasNext = videos.length > YouTubeVideosPerPage
  const { youtube: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg text-center px-2 md:px-2 py-4">
      <Breadcrumbs
        items={[
          { name: 'YouTube', href: '/youtube' },
          {
            name: `${isDefaultLocale ? type.name : type.name_en}`,
            href: `/youtube/genres/${id}`,
          },
        ]}
      />
      <Title title={t.title} description={format(t.f_video_list, isDefaultLocale ? type.name : type.name_en)} />
      <VideoCollection videos={videos.slice(0, YouTubeVideosPerPage)} showChannel={true} />
      <Pagenation current={page} hasNext={hasNext} path={(page) => `/youtube/genres/${id}/pages/${page}`} />
    </Container>
  )
}

const getYouTubeVideoType = unstable_cache(async (id: number) =>
  prisma.youtube_types.findUnique({
    where: {
      id,
    },
  })
)

const listYouTubeVideos = unstable_cache(async (typeId: number, offset: number, limit: number) =>
  prisma.youtube_videos.findMany({
    orderBy: {
      published_at: 'desc',
    },
    where: {
      type_id: typeId,
    },
    skip: offset,
    take: limit,
  })
)

export default YouTubeTypeVideosPage
