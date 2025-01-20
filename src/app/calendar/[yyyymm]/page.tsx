import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import Title from '@/components/common/Title'
import Calendar from '@/components/events/Calendar/Calendar'
import { getDictionary } from '@/i18n/dictionaries'
import { notFound } from 'next/navigation'
import { format } from 'util'

interface Props {
  params: Promise<{ yyyymm: string }>
}

export const generateMetadata = async ({ params }: Props) => {
  const p = await params
  if (p.yyyymm.length !== 6) {
    notFound()
  }
  const yyyymm = parseInt(p.yyyymm)
  if (isNaN(yyyymm) || yyyymm < 1) {
    notFound()
  }
  const year = Math.floor(yyyymm / 100)
  const month = yyyymm % 100
  const now = new Date()
  const untilYYYYMM = (now.getFullYear() + 2) * 100 + now.getMonth()
  const isValidDate = 201504 <= yyyymm && yyyymm <= untilYYYYMM && 1 <= month && month <= 12
  if (!isValidDate) {
    notFound()
  }
  const { events: t } = await getDictionary()
  const title = `${format(t.f_calendar_title, year, month)} - t.title`
  const meta = await getMetadata(title)
  return meta
}

const CalendarPage = async ({ params }: Props) => {
  const p = await params
  if (p.yyyymm.length !== 6) {
    notFound()
  }
  const yyyymm = parseInt(p.yyyymm)
  if (isNaN(yyyymm) || yyyymm < 1) {
    notFound()
  }
  const year = Math.floor(yyyymm / 100)
  const month = yyyymm % 100
  const now = new Date()
  const untilYYYYMM = (now.getFullYear() + 2) * 100 + now.getMonth()
  const isValidDate = 201504 <= yyyymm && yyyymm <= untilYYYYMM && 1 <= month && month <= 12
  if (!isValidDate) {
    notFound()
  }
  const { events: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg text-center px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/calendar' }]} />
      <Title title={format(t.f_calendar_title, year, month)} description={t.desc} />
      <Calendar year={year} month={month} />
    </Container>
  )
}

export default CalendarPage
