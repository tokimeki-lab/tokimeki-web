import SectionHeading from '@/components/common/SectionHeading'
import VideoItem from '@/components/youtube/VideoItem'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { unstable_cache } from 'next/cache'

interface Props {
  costumeId: number
}

const CostumeYouTubeVideos = async ({ costumeId }: Props) => {
  const videos = await listYouTubeVideosByCostume(costumeId)
  const { costumes: t } = await getDictionary()
  return videos.length > 0 ? (
    <div>
      <SectionHeading title={`🎬 ${t.related_videos}`} />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 [&_]:text-left">
        {videos.map((video) => {
          return <VideoItem key={video.id} video={video} showChannel={true} />
        })}
      </div>
    </div>
  ) : (
    <></>
  )
}

const listYouTubeVideosByCostume = unstable_cache(async (costumeId: number) =>
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
  })
)

export default CostumeYouTubeVideos
