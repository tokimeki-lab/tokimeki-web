import prisma from '@/db/prisma'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { unstable_cache } from 'next/cache'
import ChannelItem from './ChannelItem'

const ChannelCollection = async () => {
  const channels = await listYouTubeChannels()
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-left">
      {channels.map((channel) => (
        <ChannelItem key={channel.id} channel={channel} />
      ))}
    </div>
  )
}

const listYouTubeChannels = unstable_cache(
  async () =>
    prisma.youtube_channels.findMany({
      orderBy: {
        display_order: 'desc',
      },
    }),
  undefined,
  { tags: [CacheTag('YouTube')], revalidate: Config.revalidate }
)

export default ChannelCollection
