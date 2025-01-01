import { YouTubeVideo } from '@/db/data'
import prisma from '@/db/prisma'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { timestampToJSTString } from '@/utils/datetime'
import { Urls } from '@/utils/urls'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import Skelton from '../common/Skeleton'

interface Props {
  video?: YouTubeVideo
  showChannel?: boolean
}

const VideoItem = async ({ video, showChannel }: Props) => {
  const channelTitle = showChannel && video ? (await getYouTubeChannelTitle(video.channel_id))?.title : undefined
  return (
    <Link href={video ? Urls.youtubeVideo(video.id) : '#'} target="_blank" className="hover:bg-gray-200 rounded-lg">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video ? Urls.youtubeThumbnail(video.id) || Urls.noImage : Urls.blankImage}
          alt={video ? video.title : 'loading...'}
          className={`w-full aspect-video object-cover rounded-lg ${!video && 'opacity-10 animate-pulse'}`}
        />
      </div>
      <div className="p-1 grid gap-1">
        <div className="text-xs text-gray-500">
          {video?.published_timestamp ? timestampToJSTString(video.published_timestamp) : video?.published_at || <Skelton className="w-[19em]" />}
        </div>
        <div className="text-xs">{video ? video.title : <Skelton className="w-[20em]" />} </div>
        {channelTitle && <div className="text-xs text-gray-500">{channelTitle}</div>}
      </div>
    </Link>
  )
}

const getYouTubeChannelTitle = unstable_cache(
  async (id: string) =>
    prisma.youtube_channels.findUnique({
      select: {
        title: true,
      },
      where: {
        id,
      },
    }),
  undefined,
  { tags: [CacheTag('YouTube')], revalidate: Config.revalidate }
)

export default VideoItem
