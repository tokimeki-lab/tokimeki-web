import { Event } from '@/db/data'
import prisma from '@/db/prisma'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getTokisenRegime } from '@/utils/tokisen'
import { unstable_cache } from 'next/cache'

interface Props {
  event: Event
}

const EventCastList = async ({ event }: Props) => {
  const { date } = event
  const castNames = (await listEventCasts(event.id)).map((c) => c.name)
  const regime = getTokisenRegime(date)
  const casts = regime?.members.filter((m) => castNames.includes(m.name)) || []
  const baseClasses = ['inline-block', 'py-[0.1rem]', 'px-2', 'mr-1', 'mb-1', 'text-xs', 'rounded-full', 'text-white', 'select-none']
  const { events: t } = await getDictionary()
  return (
    <>
      {casts.length > 0 && (
        <>
          <span className="pr-2">{t.casts}:</span>
          {casts.map((cast) => {
            const color = getTokisenColor(cast.name)
            const className = [color, ...baseClasses].join(' ')
            return (
              <span key={cast.name} className={className}>
                {isDefaultLocale ? cast.name : cast.name_en}
              </span>
            )
          })}
        </>
      )}
    </>
  )
}

const listEventCasts = unstable_cache(
  async (eventId: number) =>
    await prisma.event_casts.findMany({
      where: {
        event_id: eventId,
      },
    })
)

const getTokisenColor = (name: string) => {
  switch (name) {
    case '辻野かなみ':
      return 'bg-blue'
    case '杏ジュリア':
    case '小高サラ':
      return 'bg-purple'
    case '坂井仁香':
      return 'bg-red'
    case '小泉遥香':
      return 'bg-pink'
    case '菅田愛貴':
    case '藤本ばんび':
    case '永坂真心':
      return 'bg-lemon'
    case '吉川ひより':
      return 'bg-green'
    case 'パブりん':
    default:
      return 'bg-orange'
  }
}

export default EventCastList
