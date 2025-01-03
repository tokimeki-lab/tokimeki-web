import CalendarPage from './[yyyymm]/page'

const CalendarBastion = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const yyyymm = `${year}${month.toString().padStart(2, '0')}`
  return CalendarPage({ params: Promise.resolve({ yyyymm }) })
}

export default CalendarBastion
