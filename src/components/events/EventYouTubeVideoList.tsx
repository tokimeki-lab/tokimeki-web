import YouTubeVideoList from '@/components/youtube/YouTubeVideoList'
import { Event } from '@/db/data'
import prisma from '@/db/prisma'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { unstable_cache } from 'next/cache'

interface Props {
  event: Event
  showHeading?: boolean
}

const EventYouTubeVideoList = async ({ event, showHeading = false }: Props) => {
  const videos = await listEventYouTubeVideos(event.id)
  return <YouTubeVideoList videos={videos} showHeading={showHeading} />
}

const listEventYouTubeVideos = unstable_cache(
  async (eventId: number) =>
    prisma.youtube_videos.findMany({
      where: {
        event_youtube_videos: {
          some: {
            event_id: eventId,
          },
        },
      },
      orderBy: {
        published_at: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTag('Events')], revalidate: Config.revalidate }
)

export default EventYouTubeVideoList
