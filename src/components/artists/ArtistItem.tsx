import { Artist, Song, SongCredit } from '@/db/data'
import { isDefaultLocale } from '@/i18n/config'
import { Urls } from '@/utils/urls'
import Link from 'next/link'

export interface ArtistItemProps {
  item: Artist & {
    song_credits?: (SongCredit & { songs: Song })[]
  }
}

const ArtistItem = ({ item }: ArtistItemProps) => {
  const { id, name, name_en } = item
  const src = getImageSrc({ item })
  return (
    <Link href={`/artists/${id}`} prefetch={false}>
      <div className="flex items-center  rounded-lg border text-left bg-white hover:bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={name} className="w-12 h-12 object-cover rounded-l" />
        <div className="p-2 text-sm font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">{isDefaultLocale ? name : name_en}</div>
      </div>
    </Link>
  )
}

const getImageSrc = ({ item }: ArtistItemProps) => {
  const song = item.song_credits?.map((i) => i.songs)?.[0]
  return song?.thumbnail_url || Urls.noImage
}

export default ArtistItem
