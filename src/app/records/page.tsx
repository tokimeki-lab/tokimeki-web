import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import IndexedRecordEditions from '@/components/records/IndexedRecordEditions'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const { records: t } = await getDictionary()
  const title = t.title
  const description = t.desc
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

const Records = async () => {
  const { records: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg text-center px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/records' }]} />
      <Title title={t.title} description={t.desc} />
      <IndexedRecordEditions />
    </Container>
  )
}

export default Records
