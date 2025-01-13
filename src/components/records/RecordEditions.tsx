import { AppleMusicAlbumPreviewPlayer } from '@/components/songs/AppleMusicAlbumPlayer'
import { Record } from '@/db/data'
import prisma from '@/db/prisma'
import { isDefaultLocale } from '@/i18n/config'
import { CacheTag } from '@/lib/cache'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import AdminLink from '../common/AdminLink'
import RecordEditionDetails from './RecordEditionDetails'

interface Props {
  record: Record
}

const RecordEditions = async ({ record }: Props) => {
  const editions = await listRecordEditionsByRecord(record.id)
  return (
    <div className="grid gap-4 pt-4">
      <div className="grid gap-1">
        {record.product_url ? (
          <div>
            <AdminLink path={`/records/${record.id}`} />
            <Link href={record.product_url} target="_blank" className="inline-block text-lg text-primary font-bold">
              {isDefaultLocale ? record.name : record.name_en}
            </Link>
          </div>
        ) : (
          <div className="text-lg text-primary font-bold">{record.name}</div>
        )}
        <div className="text-sm text-gray-500">{record.label}</div>
      </div>
      {record.apple_music_id && (
        <div>
          <AppleMusicAlbumPreviewPlayer appleMusicRecordId={record.apple_music_id} />
        </div>
      )}
      {editions.map((edition) => (
        <RecordEditionDetails key={edition.id} edition={edition} type={record.type} />
      ))}
    </div>
  )
}

const listRecordEditionsByRecord = unstable_cache(
  async (recordId: number) => {
    const recordEditions = await prisma.record_editions.findMany({
      where: { record_id: recordId },
      orderBy: { display_order: 'asc' },
    })
    return recordEditions
  },
  undefined,
  { tags: [CacheTag('Songs')] }
)

export default RecordEditions
