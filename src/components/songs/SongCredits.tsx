import SectionHeading from '@/components/common/SectionHeading'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import { unstable_cache } from 'next/cache'
import SongCreditItem from './SongCreditItem'

interface Props {
  songId: number
}

const SongCredits = async ({ songId }: Props) => {
  const credits = await listSongCreditsBySong(songId)
  const groupedCredits = [
    credits.filter((credit) => credit.role === 'Vocal'),
    credits.filter((credit) => credit.role === 'Lyrics'),
    credits.filter((credit) => credit.role === 'Music'),
    credits.filter((credit) => credit.role === 'Arrangement'),
    credits.filter((credit) => credit.role === 'Dance'),
    credits.filter((credit) => credit.role === 'Produce'),
  ]
  const { songs: t } = await getDictionary()
  return (
    <div className="py-4">
      <SectionHeading title={`🎤 ${t.credits}`} />
      {groupedCredits.map((credits, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-2  gap-2">
          {credits.map((credit) => (
            <div key={credit.id} className="pb-2">
              <SongCreditItem credit={credit} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const listSongCreditsBySong = unstable_cache(
  async (songId: number) =>
    prisma.song_credits.findMany({
      include: { artists: true },
      where: {
        song_id: songId,
      },
    }),
  undefined,
  { tags: [CacheTag('Songs')] }
)

export default SongCredits
