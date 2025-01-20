import getMetadata from '@/components/common/Meta'
import { getDictionary } from '@/i18n/dictionaries'
import CalendarPage from './[yyyymm]/page'

export const generateMetadata = async () => {
  const { events: t } = await getDictionary()
  const title = t.title
  const description = t.desc
  const meta = await getMetadata(title, description)
  return meta
}

const CalendarBastion = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const yyyymm = `${year}${month.toString().padStart(2, '0')}`
  return CalendarPage({ params: Promise.resolve({ yyyymm }) })
}

export default CalendarBastion
