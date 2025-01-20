import { YouTubeVideosPerPage } from '@/app/youtube/const'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import Pagenation from '@/components/common/Pagenation'
import Title from '@/components/common/Title'
import VideoCollection from '@/components/youtube/VideoCollection'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { format } from 'util'

interface Props {
  params: Promise<{ id: string; page: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata | null> => {
  const p = await params
  const { id } = p
  const page = parseInt((p.page as string) || '1')
  if (!id || isNaN(page) || page < 1) {
    return null
  }
  const channel = await getYouTubeChannel(id)
  if (!channel) {
    return null
  } else {
    const { youtube: t } = await getDictionary()
    const title = `${channel.title} - ${t.title}`
    const description = `${channel.title}: ${t.desc}`
    const meta = await getMetadata(title, description)
    return meta
  }
}

const YouTubeChannelVideosPage = async ({ params }: Props) => {
  const p = await params
  const { id } = p
  const page = parseInt(p.page as string)
  if (isNaN(page) || page < 1) {
    notFound()
  }
  const channel = await getYouTubeChannel(id)
  if (!channel) {
    notFound()
  }
  const offset = (page - 1) * YouTubeVideosPerPage
  const videos = await listYouTubeVideosByChannel(id, offset, YouTubeVideosPerPage + 1)
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
            name: `${channel.title}`,
            href: `/youtube/channels/${id}}`,
          },
        ]}
      />
      <Title title={t.title} description={format(t.f_video_list, channel.title)} />
      <VideoCollection videos={videos.slice(0, YouTubeVideosPerPage)} />
      <Pagenation current={page} hasNext={hasNext} path={(page: number) => `/youtube/channels/${id}/pages/${page}`} />
    </Container>
  )
}

const getYouTubeChannel = unstable_cache(
  async (id: string) =>
    prisma.youtube_channels.findUnique({
      where: {
        id,
      },
    }),
  undefined,
  { tags: [CacheTag('YouTube')], revalidate: Config.revalidate }
)

const listYouTubeVideosByChannel = unstable_cache(
  async (id: string, offset: number, limit: number) =>
    prisma.youtube_videos.findMany({
      where: {
        channel_id: id,
      },
      orderBy: {
        published_at: 'desc',
      },
      skip: offset,
      take: limit,
    }),
  undefined,
  { tags: [CacheTag('YouTube')], revalidate: Config.revalidate }
)

export default YouTubeChannelVideosPage
