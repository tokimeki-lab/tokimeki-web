import IndexHeading from '@/components/common/IndexHeading'
import IndexNav, { yearsIndexNavItems } from '@/components/common/IndexNav'
import { Record, RecordEdition } from '@/db/data'
import prisma from '@/db/prisma'
import { dateToYYYYMMDD } from '@/utils/datetime'
import { unstable_cache } from 'next/cache'
import RecordEditionItem from './RecordEditionItem'

const IndexedRecordEditions = async () => {
  const editions = await listRecordEditions()

  const navItems = yearsIndexNavItems
  const groupedEditions = new Map<string, (RecordEdition & { records: Record })[]>()
  for (const edition of editions) {
    let key = navItems.length - 1
    for (let i = 1; i <= navItems.length; i++) {
      if (dateToYYYYMMDD(new Date(edition.release_date)) < navItems[i]) {
        key = i - 1
        break
      }
    }
    const newItems = [...(groupedEditions.get(navItems[key]) || []), edition]
    groupedEditions.set(navItems[key], newItems)
  }
  return (
    <div>
      <IndexNav items={navItems} />
      {navItems.map((i) => (
        <div key={i}>
          <IndexHeading id={i} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {groupedEditions.get(i)?.map((item) => (
              <RecordEditionItem key={item.catalog_number} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const listRecordEditions = unstable_cache(async () =>
  prisma.record_editions.findMany({
    include: { records: true },
    orderBy: { release_date: 'asc' },
  })
)

export default IndexedRecordEditions
