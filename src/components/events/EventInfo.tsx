import { Event } from '@/db/data'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import EventCastList from './EventCastList'
import EventCreditList from './EventCreditList'

interface Props {
  event: Event
}

const EventInfo = async ({ event }: Props) => {
  const place = await getEventPlace(event.id)
  const { events: t } = await getDictionary()
  return (
    <div className="grid gap-1">
      <div className="text-xs text-gray-500">
        <span className="pr-1">{t.date}:</span>
        <span>
          {event.date} {event.start}
        </span>
      </div>
      {place && (
        <div className="text-xs text-gray-500">
          <span className="pr-1">{t.venue}:</span>
          <Link href={`http://local.google.co.jp/maps?q=${place.address}`} target="_blank">
            {place.name}（{place.address}）
          </Link>
        </div>
      )}
      {event.hashtags && (
        <div className="flex gap-1 text-xs text-gray-500">
          <span>{t.hashtags}:</span>
          {event.hashtags.split(',').map((hashtag) => (
            <Link
              key={hashtag}
              href={`https://twitter.com/hashtag/${encodeURIComponent(hashtag)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary">{`#${hashtag}`}</Link>
          ))}
        </div>
      )}
      <div className="[&_div]:inline-block text-xs items-center text-gray-500">
        <EventCastList event={event} />
      </div>
      <EventCreditList event={event} />
    </div>
  )
}

const getEventPlace = unstable_cache(
  async (eventId: number) =>
    prisma.event_places.findFirst({
      where: {
        events: {
          some: {
            id: eventId,
          },
        },
      },
    }),
  undefined,
  { tags: [CacheTag('Events')] }
)

export default EventInfo
