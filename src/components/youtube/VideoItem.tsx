import { YouTubeVideo } from '@/db/data'
import prisma from '@/db/prisma'
import { timestampToJSTString } from '@/utils/datetime'
import { Urls } from '@/utils/urls'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'

interface Props {
  video: YouTubeVideo
  showChannel?: boolean
}

const VideoItem = async ({ video, showChannel }: Props) => {
  const channelTitle = showChannel ? (await getYouTubeChannelTitle(video.channel_id))?.title : undefined
  return (
    <Link href={Urls.youtubeVideo(video.id)} target="_blank" className="hover:bg-gray-200 rounded-lg">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={Urls.youtubeThumbnail(video.id) || Urls.noImage} alt={video.title} className="w-full aspect-video object-cover rounded-lg" />
      </div>
      <div className="p-1 grid gap-1">
        <div className="text-xs text-gray-500">
          {video.published_timestamp ? timestampToJSTString(video.published_timestamp) : video.published_at}
        </div>
        <div className="text-xs">{video.title}</div>
        {channelTitle && <div className="text-xs text-gray-500">{channelTitle}</div>}
      </div>
    </Link>
  )
}

const getYouTubeChannelTitle = unstable_cache(async (id: string) =>
  prisma.youtube_channels.findUnique({
    select: {
      title: true,
    },
    where: {
      id,
    },
  })
)

export default VideoItem
