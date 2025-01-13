import { Event } from '@/db/data'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import SectionHeading from '../common/SectionHeading'

interface Props {
  event: Event
  showHeading?: boolean
}

const EventCreditList = async ({ event, showHeading = false }: Props) => {
  const credits = await listEventCredits(event.id)
  const { events: t } = await getDictionary()
  return (
    <>
      {credits.length > 0 && (
        <div>
          {showHeading && <SectionHeading title={`👥 ${t.credits}`} />}
          <ul>
            {credits.map((credit) => {
              return (
                <li key={credit.id} className="text-xs">
                  <div className="flex gap-2">
                    <div className="text-gray-500">{credit.title}:</div>
                    <div className={credit.artists ? 'text-primary' : ''}>
                      {credit.artists ? (
                        <>
                          <Link href={`/artists/${credit.artists.id}`}>{credit.artists.name}</Link>
                        </>
                      ) : (
                        credit.name
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

const listEventCredits = unstable_cache(
  async (eventId: number) =>
    await prisma.event_credits.findMany({
      include: {
        artists: true,
      },
      where: {
        event_id: eventId,
      },
      orderBy: {
        display_order: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTag('Events')] }
)

export default EventCreditList
