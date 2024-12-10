import prisma from '@/db/prisma'
import { unstable_cache } from 'next/cache'
import VideoTypeItem from './VideoTypeItem'

const VideoTypeCollection = async () => {
  const types = await listYouTubeVideoTypes()
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-left">
      {types.map((type) => (
        <VideoTypeItem key={type.id} type={type} />
      ))}
    </div>
  )
}

const listYouTubeVideoTypes = unstable_cache(async () =>
  prisma.youtube_types.findMany({
    orderBy: {
      sort_priority: 'desc',
    },
  })
)

export default VideoTypeCollection
