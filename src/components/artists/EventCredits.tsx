import SectionHeading from '@/components/common/SectionHeading'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import { unstable_cache } from 'next/cache'
import EventCreditItem from './EventCreditItem'

interface Props {
  artistId?: number
}

const EventCredits = async ({ artistId }: Props) => {
  const credits = artistId ? await listEventCreditsByArtist(artistId) : []
  const { artists: t } = await getDictionary()
  return credits.length === 0 ? (
    <></>
  ) : (
    <div className="py-4">
      <SectionHeading title={t.event} badgeText={credits.length.toString()} />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2">
        {credits.map((credit) => (
          <EventCreditItem key={credit.id} credit={credit} />
        ))}
      </div>
    </div>
  )
}

const listEventCreditsByArtist = unstable_cache(
  async (artistId: number) =>
    prisma.event_credits.findMany({
      include: {
        events: true,
      },
      where: {
        artist_id: artistId,
      },
      orderBy: {
        events: {
          date: 'asc',
        },
      },
    }),
  undefined,
  { tags: [CacheTag('Events')] }
)

export default EventCredits
