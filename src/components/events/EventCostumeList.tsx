import { Event } from '@/db/data'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { unstable_cache } from 'next/cache'
import SectionHeading from '../common/SectionHeading'
import CostumeCollection from '../costumes/CostumeCollection'

interface Props {
  event: Event
  showHeading?: boolean
}

const EventCostumeList = async ({ event, showHeading = false }: Props) => {
  const eventCostumes = await listEventCostumes(event.id)
  const costumes = eventCostumes.map((i) => i.costumes)
  const { events: t } = await getDictionary()
  return (
    <>
      {costumes.length > 0 && (
        <div>
          {showHeading && <SectionHeading title={`👗 ${t.costumes}`} />}
          <CostumeCollection costumes={costumes} />
        </div>
      )}
    </>
  )
}

const listEventCostumes = unstable_cache(
  async (eventId: number) =>
    prisma.event_cosutumes.findMany({
      select: {
        costumes: {
          include: {
            costume_images: {
              orderBy: {
                display_order: 'asc',
              },
            },
            artists: true,
          },
        },
      },
      where: {
        event_id: eventId,
      },
      orderBy: {
        display_order: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTag('Events')], revalidate: Config.revalidate }
)

export default EventCostumeList
