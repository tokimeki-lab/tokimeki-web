import { Event } from '@/db/data'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import SectionHeading from '../common/SectionHeading'
import EventSetlistItem from './EventSetlistItem'

interface Props {
  event: Event
  showHeading?: boolean
}

const EventSetList = async ({ event, showHeading = false }: Props) => {
  const [setlist, credit] = await Promise.all([listEventSetlist(event.id), getSetlistCredit(event.id)])
  const { events: t } = await getDictionary()
  return (
    <div className="flex flex-col gap-2">
      {setlist.length > 0 && (
        <div>
          {showHeading && <SectionHeading title={`🎵 ${t.setlist}`} />}
          {setlist.map((set) => (
            <EventSetlistItem key={set.id} item={set} />
          ))}
        </div>
      )}
      {credit && (
        <div className="text-sm text-gray-500">
          {t.setlist_source}:{' '}
          <Link href={credit.source_url} className="text-primary" target="_blank" rel="noopener noreferrer">
            {credit.name}
          </Link>
        </div>
      )}
    </div>
  )
}

const listEventSetlist = unstable_cache(async (eventId: number) =>
  prisma.event_setlist.findMany({
    where: {
      event_id: eventId,
    },
    include: {
      songs: true,
    },
    orderBy: {
      order: 'asc',
    },
  })
)

const getSetlistCredit = unstable_cache(async (eventId: number) =>
  prisma.setlist_credit.findFirst({
    where: {
      event_id: eventId,
    },
  })
)

export default EventSetList
