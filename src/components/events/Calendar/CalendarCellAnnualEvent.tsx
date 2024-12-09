import { AnnualEvent } from '@/db/data'
import { isDefaultLocale } from '@/i18n/config'

interface Props {
  event: AnnualEvent
}

const CalendarCellAnnualEvent = ({ event }: Props) => {
  return (
    <div className="pl-2 inline-block text-left">
      <span className="text-white bg-primary py-[0.1rem] px-2 rounded-full select-none">{isDefaultLocale ? event.title : event.title_en}</span>
    </div>
  )
}

export default CalendarCellAnnualEvent
