import { YouTubeChannel } from '@/db/data'
import Link from 'next/link'

interface Props {
  channel: YouTubeChannel
}

const ChannelItem = ({ channel }: Props) => {
  return (
    <Link href={`/youtube/channels/${channel.id}`} prefetch={false} className="text-xs rounded hover:bg-gray-200 border">
      <div className="grid grid-cols-4 content-center">
        <div className="col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={channel.thumbnail_url} alt="" className="aspect-square object-cover rounded" />
        </div>
        <div className="col-span-3 px-2 flex items-center text-gray-500 overflow-hidden overflow-ellipsis">{channel.title}</div>
      </div>
    </Link>
  )
}

export default ChannelItem
