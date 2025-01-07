import LinkButton from '@/components/common/LinkButton'
import { RecordEdition, RecordType } from '@/db/data'
import { isDefaultLocale } from '@/i18n/config'
import { Urls } from '@/utils/urls'
import Link from 'next/link'
import { FaAmazon } from 'react-icons/fa6'
import AdminLink from '../common/AdminLink'
import AlbumCover from './AlbumCover'
import RecordEditionTracks from './RecordEditionTracks'

interface Props {
  type: RecordType
  edition: RecordEdition
}

const RecordEditionDetails = async ({ type, edition }: Props) => {
  const { id, catalog_number, name, name_en, price, release_date, thumbnail_url, asin } = edition
  return (
    <>
      <div id={catalog_number} className="relative -top-16 bg-black" />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 pb-16">
        <div className="col-span-1 pb-4">
          {asin ? (
            <Link href={Urls.amazonProduct(asin)} target="_blank">
              <AlbumCover src={thumbnail_url || Urls.noImage} alt={edition.name} />
            </Link>
          ) : (
            <AlbumCover src={thumbnail_url || Urls.noImage} alt={edition.name} />
          )}
          {isDefaultLocale && asin && (
            <div className="py-2">
              <LinkButton icon={<FaAmazon />} text="Amazon.co.jp" href={Urls.amazonProduct(asin)} />
            </div>
          )}
        </div>
        <div className="col-span-1 sm:col-span-3">
          <div className="grid gap-1 pb-4">
            <div>
              <span className="bg-black py-1 px-2 text-white text-xs">{type}</span>
            </div>
            <div className="font-semibold">
              <AdminLink path={`/records/${edition.record_id}/editions/${edition.id}`} />
              {isDefaultLocale ? name : name_en}
            </div>
            <div className="flex flex-wrap gap-2 [&_]:text-gray-500 [&_]:text-xs">
              <div>{catalog_number}</div>
              <div>{release_date}</div>
              {price && <div>{price}</div>}
            </div>
          </div>
          <RecordEditionTracks editionId={id} />
        </div>
      </div>
    </>
  )
}

export default RecordEditionDetails
