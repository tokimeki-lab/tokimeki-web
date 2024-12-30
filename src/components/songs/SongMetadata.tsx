import { Song } from '@/db/data'
import prisma from '@/db/prisma'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { dateToYYYYMMDD } from '@/utils/datetime'
import { unstable_cache } from 'next/cache'

interface Props {
  song: Song
}

const SongMetadata = async ({ song }: Props) => {
  const { kana, title, title_en, jasrac_code, iswc_code } = song
  const firstAppearanceEdition = (await listRecordEditionsBySong(song.id))[0]
  const { songs: t } = await getDictionary()
  return (
    <div className="py-4">
      <div className="text-xs text-gray-500">{kana}</div>
      {!isDefaultLocale && <div className="text-xs text-gray-500">{title}</div>}
      <h2 className="font-bold text-lg mb-2">{isDefaultLocale ? title : title_en}</h2>
      {firstAppearanceEdition && (
        <div className="text-xs text-gray-500">
          {t.release_date}: {dateToYYYYMMDD(new Date(firstAppearanceEdition.release_date))}
        </div>
      )}
      {firstAppearanceEdition && (
        <div className="text-xs text-gray-500">
          {t.first_appearance}: {isDefaultLocale ? firstAppearanceEdition.records.name : firstAppearanceEdition.records.name_en}（
          {isDefaultLocale ? firstAppearanceEdition.name : firstAppearanceEdition.name_en}）
        </div>
      )}
      {jasrac_code && (
        <div className="text-xs text-gray-500">
          {t.JASRAC_code}: {jasrac_code}
        </div>
      )}
      {iswc_code && (
        <div className="text-xs text-gray-500">
          {t.ISWC_code}: {iswc_code}
        </div>
      )}
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
  { tags: [CacheTag('Songs')], revalidate: Config.revalidate }
)

export default SongMetadata
