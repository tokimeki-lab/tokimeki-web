import { Event, EventCredit } from '@/db/data'
import Link from 'next/link'

interface Props {
  credit: EventCredit & { events: Event }
}

const EventCreditItem = ({ credit }: Props) => {
  const { title, source_url, events: event } = credit
  return (
    <div className="bg-white rounded-lg border text-left [&_div]:overflow-hidden [&_div]:overflow-ellipsis [&_div]:whitespace-nowrap">
      <div className="col-span-1 p-2 grid gap-1">
        <div className="text-xs text-gray-500">{event.date}</div>
        <Link href={`/events/${event.id}`} prefetch={false}>
          <div className="text-sm font-semibold">{event.title}</div>
        </Link>
        <Link href={source_url} target="_blank">
          <div className="text-xs text-gray-500">{title}</div>
        </Link>
        <div></div>
      </div>
    </div>
  )
}

export default EventCreditItem
