import prisma from '@/db/prisma'
import { CacheTag } from '@/lib/cache'
import { unstable_cache } from 'next/cache'
import RecordEditionItem from './RecordEditionItem'

interface Props {
  songId: number
}

const RecordEditionCollection = async ({ songId }: Props) => {
  const editions = await listRecordEditionsBySong(songId)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {editions.map((item) => (
        <RecordEditionItem key={item.catalog_number} item={item} />
      ))}
    </div>
  )
}

const listRecordEditionsBySong = unstable_cache(
  async (songId: number) =>
    prisma.record_editions.findMany({
      where: {
        record_tracks: {
          some: {
            song_id: songId,
          },
        },
      },
      include: { records: true },
      orderBy: {
        release_date: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTag('Songs')] }
)

export default RecordEditionCollection
