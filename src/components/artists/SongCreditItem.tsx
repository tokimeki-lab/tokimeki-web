import { Song, SongCredit, SongCreditRole } from '@/db/data'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Urls } from '@/utils/urls'
import Link from 'next/link'

interface Props {
  credit: SongCredit & { songs: Song }
}

const SongCreditItem = ({ credit }: Props) => {
  const { title, name, role, songs: song } = credit
  return (
    <Link href={`/songs/${song.slug}`} prefetch={false}>
      <div className="bg-white hover:bg-gray-100 rounded-lg border text-left [&_div]:overflow-hidden [&_div]:overflow-ellipsis [&_div]:whitespace-nowrap">
        <div className="col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="w-full object-cover aspect-square" src={song.thumbnail_url || Urls.noImage} alt={song.title} loading="lazy" />
        </div>
        <div className="col-span-1 p-2 grid gap-1">
          <div className="text-sm font-semibold">{isDefaultLocale ? song.title : song.title_en}</div>
          <div className="text-xs text-gray-500">{title || getCreditTitle(role)}</div>
          <div className="text-xs text-gray-500">{name}</div>
          <div></div>
        </div>
      </div>
    </Link>
  )
}

const getCreditTitle = async (role: SongCreditRole) => {
  const { artists: t } = await getDictionary()
  switch (role) {
    case 'Lyrics':
      return t.lyrics
    case 'Music':
      return t.music
    case 'Arrangement':
      return t.arrangement
    case 'Dance':
      return t.dance
    default:
      return t.produce
  }
}

export default SongCreditItem
