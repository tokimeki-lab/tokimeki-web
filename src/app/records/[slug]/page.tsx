import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import getMetadata from '@/components/common/Meta'
import RecordEditions from '@/components/records/RecordEditions'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata | null> => {
  const p = await params
  const slug = decodeURIComponent(p.slug)
  const record = await getRecordBySlug(slug)
  if (!record) {
    return null
  } else {
    const { records: t } = await getDictionary()
    const title = `${record.name} - ${t.title}`
    const description = `${record.name} - ${t.desc}`
    const meta = await getMetadata(title, description)
    return meta
  }
}

const Record = async ({ params }: Props) => {
  const p = await params
  const slug = decodeURIComponent(p.slug)
  const record = await getRecordBySlug(slug)
  if (!record) {
    notFound()
  }
  const { records: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/records' }]} />
      <RecordEditions record={record} />
    </Container>
  )
}

const getRecordBySlug = unstable_cache(
  async (slug: string) =>
    prisma.records.findUnique({
      where: { slug },
    }),
  undefined,
  { tags: [CacheTag('Songs')] }
)

export default Record
