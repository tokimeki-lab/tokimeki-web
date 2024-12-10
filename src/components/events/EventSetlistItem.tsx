import { EventSetlist, Song } from '@/db/data'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import Link from 'next/link'

interface Props {
  item: EventSetlist & { songs: Song | null }
}

const EventSetlistItem = async ({ item }: Props) => {
  const song = item.songs
  const { events: t } = await getDictionary()
  return (
    <div className="flex gap-2">
      <div className="select-none">{item.order_label || item.order.toString()}.</div>
      <div className="font-medium">
        {song ? (
          <Link href={`/songs/${song.slug}`} prefetch={false} className="text-primary">
            {isDefaultLocale ? item.song_title || song.title : song.title_en}
          </Link>
        ) : (
          <>{item.song_title}</>
        )}
      </div>
      {item.encore && <div className="text-sm text-gray-500">（{t.encore}）</div>}
    </div>
  )
}

export default EventSetlistItem
