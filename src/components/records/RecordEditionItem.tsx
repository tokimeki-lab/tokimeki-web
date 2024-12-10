import { Record, RecordEdition } from '@/db/data'
import { isDefaultLocale } from '@/i18n/config'
import { dateToYYYYMMDD } from '@/utils/datetime'
import { Urls } from '@/utils/urls'
import Link from 'next/link'

interface Props {
  item: RecordEdition & { records: Record }
}

const RecordEditionItem = ({ item }: Props) => {
  const { name, name_en, release_date, catalog_number, records: record, thumbnail_url } = item
  const formattedDate = dateToYYYYMMDD(new Date(release_date))

  return (
    <Link href={`/records/${record.slug}#${catalog_number}`} prefetch={false}>
      <div className="bg-white hover:bg-gray-100 rounded-lg border overflow-hidden text-left">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="w-full object-cover aspect-square" src={thumbnail_url || Urls.noImage} alt={name} loading="lazy" />
        </div>
        <div className="w-full p-2 ">
          <div className="mb-2 text-sm font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
            {isDefaultLocale ? record.name : record.name_en}
          </div>
          <div className="text-xs text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">{isDefaultLocale ? name : name_en}</div>
          <div className="text-xs text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">{formattedDate}</div>
        </div>
      </div>
    </Link>
  )
}

export default RecordEditionItem
