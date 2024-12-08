import prisma from '@/db/prisma'
import { unstable_cache } from 'next/cache'
import CalendarBody from './CalendarBody'

interface Props {
  year: number
  month: number
}

const Calendar = async ({ year, month }: Props) => {
  const events = await listEvents(year, month)
  const annualEvents = await listAnnualEvents(year, month)
  const blogs = await listBlogs(year, month)
  return <CalendarBody year={year} month={month} events={events} annualEvents={annualEvents} blogs={blogs} />
}

const listAnnualEvents = unstable_cache(async (year: number, month: number) =>
  prisma.annual_events.findMany({
    where: {
      AND: {
        date: {
          // TODO: replace into published_timestamp
          startsWith: `${month.toString().padStart(2, '0')}`,
        },
        since_year: {
          lte: year,
        },
      },
      OR: [
        {
          until_year: {
            gte: year,
          },
        },
        {
          until_year: null,
        },
      ],
    },
    orderBy: { date: 'asc' },
  })
)

const listBlogs = unstable_cache(async (year: number, month: number) =>
  prisma.blogs.findMany({
    where: {
      // TODO: replace into published_timestamp
      published_at: {
        startsWith: `${year}-${month.toString().padStart(2, '0')}`,
      },
    },
    orderBy: {
      published_at: 'asc',
    },
  })
)

const listEvents = unstable_cache(async (year: number, month: number) =>
  prisma.events.findMany({
    include: {
      event_places: true,
    },
    where: {
      date: {
        // TODO: replace into published_timestamp
        startsWith: `${year}-${month.toString().padStart(2, '0')}`,
      },
    },
    orderBy: [{ date: 'asc' }, { start: 'asc' }],
  })
)

export default Calendar
