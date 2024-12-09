import ArticleList from '@/components/articles/ArticleList'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import DateNavigation from '@/components/common/DateNavigation'
import Title from '@/components/common/Title'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'util'

interface Props {
  params: Promise<{ yyyymm: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata | null> => {
  const p = await params
  if (p.yyyymm.length !== 6) {
    return null
  }
  const yyyymm = parseInt(p.yyyymm)
  if (isNaN(yyyymm) || yyyymm < 1) {
    return null
  }
  const year = Math.floor(yyyymm / 100)
  const month = yyyymm % 100
  const { articles: t } = await getDictionary()
  const title = `${format(t.f_subtitle, year, month)} - ${t.title}`
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

export const generateStaticParams = async () => {
  return []
}

const Articles = async ({ params }: Props) => {
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
  const articles = await listArticles(year, month)
  const { articles: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg text-center px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/articles' }]} />
      <Title title={`${format(t.f_subtitle, year, month)}`} description={t.desc} />
      <DateNavigation since={new Date(2015, 4, 11)} date={new Date(year, month - 1)} path="/articles" />
      <div className="pb-4 text-right">
        <Link href={`/calendar/${yyyymm}`} className="text-primary text-sm">
          {format(t.f_link_for_events, year, month)}
        </Link>
      </div>
      {articles.length > 0 ? <ArticleList articles={articles} /> : <div className="pt-16 pb-96 text-gray-500">{t.noarticles}</div>}
      <DateNavigation since={new Date(2015, 4, 11)} date={new Date(year, month - 1)} path="/articles" />
    </Container>
  )
}

const listArticles = unstable_cache(async (year: number, month: number) =>
  prisma.articles.findMany({
    where: {
      published_timestamp: {
        gte: Date.UTC(year, month - 1) / 1000 - 60 * 60 * 9,
        lt: Date.UTC(year, month) / 1000 - 60 * 60 * 9,
      },
      status: 'approved',
    },
    orderBy: {
      published_at: 'asc',
    },
  })
)

export default Articles
