import { Artist, Song, SongCredit } from '@/db/data'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Urls } from '@/utils/urls'
import Link from 'next/link'

interface SongItemProps {
  song: Song & { song_credits: (SongCredit & { artists: Artist })[] }
}

const SongItem = async ({ song }: SongItemProps) => {
  const { title, title_en, slug, thumbnail_url, song_credits: credits } = song
  const lyrics = credits
    .filter((c) => c.role === 'Lyrics')
    ?.map((c) => (isDefaultLocale ? c.name : c.artists.name_en))
    .join('/')
  const music = credits
    .filter((c) => c.role === 'Music')
    ?.map((c) => (isDefaultLocale ? c.name : c.artists.name_en))
    .join('/')
  const arrangers = credits
    .filter((c) => c.role === 'Arrangement')
    ?.map((c) => (isDefaultLocale ? c.name : c.artists.name_en))
    .join('/')
  const { songs: t } = await getDictionary()
  return (
    <Link href={`/songs/${slug}`} prefetch={false}>
      <div className="grid grid-cols-3 bg-white hover:bg-gray-100 rounded-lg border overflow-hidden p-2 text-left">
        <div className="col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="w-full object-cover aspect-square" src={thumbnail_url || Urls.noImage} alt={title} loading="lazy" />
        </div>
        <div className="col-span-2 pl-4">
          <div className="mb-2 tracking-wide text-sm font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
            {isDefaultLocale ? title : title_en}
          </div>
          {lyrics && (
            <div className="text-xs leading-5 overflow-hidden overflow-ellipsis whitespace-nowrap text-gray-400">
              {t.lyrics}: {lyrics}
            </div>
          )}
          {music && (
            <div className="text-xs leading-5 text-gray-400 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {t.music}: {music}
            </div>
          )}
          {arrangers && (
            <div className="text-xs leading-5 text-gray-400 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {t.arrangementAbbr}: {arrangers}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default SongItem
