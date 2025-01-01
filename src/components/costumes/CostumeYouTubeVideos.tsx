import SectionHeading from '@/components/common/SectionHeading'
import VideoItem from '@/components/youtube/VideoItem'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { unstable_cache } from 'next/cache'

interface Props {
  costumeId?: number
}

const CostumeYouTubeVideos = async ({ costumeId }: Props) => {
  const videos = costumeId ? await listYouTubeVideosByCostume(costumeId) : []
  const { costumes: t } = await getDictionary()
  return !costumeId || videos.length > 0 ? (
    <div>
      <SectionHeading title={`🎬 ${t.related_videos}`} />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 [&_]:text-left">
        {costumeId
          ? videos.map((video) => {
              return <VideoItem key={video.id} video={video} showChannel={true} />
            })
          : Array.from({ length: 12 }).map((_, i) => {
              return <VideoItem key={i} video={undefined} showChannel={true} />
            })}
      </div>
    </div>
  ) : (
    <></>
  )
}

const listYouTubeVideosByCostume = unstable_cache(
  async (costumeId: number) =>
    prisma.youtube_videos.findMany({
      include: {
        youtube_channels: true,
      },
      where: {
        youtube_video_costumes: {
          some: {
            costume_id: costumeId,
          },
        },
      },
      orderBy: {
        published_at: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTag('Costumes')], revalidate: Config.revalidate }
)

export default CostumeYouTubeVideos
