'use client'

import AdminLink from '@/components/common/AdminLink'
import { Event, EventPlace, EventType } from '@/db/data'
import { useDictionary } from '@/i18n/hook'
import Link from 'next/link'
import { format } from 'util'

interface Props {
  event: Event & { event_places?: EventPlace }
}

const CalendarCellEvent = ({ event }: Props) => {
  const now = new Date()
  const isFuture = new Date(event.date) > now
  const remains = Math.floor((new Date(event.date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  const { events: t } = useDictionary()
  const getEventTypeLabel = (type: EventType) => {
    switch (type) {
      case 'BROADCAST':
        return t.broadcast
      case 'LIVE':
        return t.live
      case 'EVENT':
        return t.event
      case 'MILESTONE':
        return t.milestone
      default:
      case 'OTHER':
        return t.others
    }
  }
  const typeLabel = getEventTypeLabel(event.type)
  return (
    <div className="pl-2 inline-block text-left">
      {event.start && <span className="min-w-12 pr-2 inline-block">{event.start}</span>}
      <span className="text-xs bg-black text-white font-semibold py-[2px] px-1 mr-2">{typeLabel}</span>
      <AdminLink path={`/events/${event.id}`} />
      <Link href={`/events/${event.id}`} prefetch={false} className="pr-2 text-primary font-semibold">
        {event.title}
      </Link>
      {event.event_places && <span className="text-gray-500">{event.event_places.name}</span>}
      {isFuture && <span className="ml-1 text-gray-500">({format(t.f_days_left, remains)})</span>}
    </div>
  )
}

export default CalendarCellEvent
