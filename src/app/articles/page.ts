import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'
import Articles from './[yyyymm]/page'

export const revalidate = 60

export const generateMetadata = async (): Promise<Metadata> => {
  const { articles: t } = await getDictionary()
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

const ArticleBastion = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const yyyymm = `${year}${month.toString().padStart(2, '0')}`
  return Articles({ params: Promise.resolve({ yyyymm }) })
}

export default ArticleBastion