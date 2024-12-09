import { Event } from '@/db/data'

interface Props {
  event: Event
}

const EventNote = ({ event }: Props) => {
  return <>{event.note && <pre className="py-2 whitespace-pre-wrap text-xs">{event.note}</pre>}</>
}

export default EventNote
