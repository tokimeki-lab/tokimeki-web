import SectionHeading from '@/components/common/SectionHeading'
import VideoCollection from '@/components/youtube/VideoCollection'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { unstable_cache } from 'next/cache'

interface Props {
  songId: number
  short: boolean
}

const SongVideoCollection = async ({ songId, short }: Props) => {
  const videos = await listYouTubeVidoesBySong(songId, short)
  if (!videos.length) {
    return <></>
  } else {
    const { songs: t } = await getDictionary()
    const label = short ? `🎞️ ${t.related_shorts}` : `🎬 ${t.related_videos}`
    return (
      <div className="py-4">
        <SectionHeading title={label} />
        <VideoCollection videos={videos} />
      </div>
    )
  }
}

const listYouTubeVidoesBySong = unstable_cache(async (songId: number, short: boolean, offset?: number, limit?: number) =>
  prisma.youtube_videos.findMany({
    where: {
      youtube_video_songs: {
        some: {
          song_id: songId,
        },
      },
      is_short: short,
    },
    orderBy: {
      published_at: 'desc',
    },
    skip: offset,
    take: limit,
  })
)

export default SongVideoCollection
