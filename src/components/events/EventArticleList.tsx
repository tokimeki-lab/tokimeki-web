import { Event } from '@/db/data'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { unstable_cache } from 'next/cache'
import SectionHeading from '../common/SectionHeading'
import EventArticleListItem from './EventArticleListItem'

interface Props {
  event: Event
  showHeading?: boolean
}

const EventArticleList = async ({ event, showHeading = false }: Props) => {
  const articles = await listEventArticles(event.id)
  const { events: t } = await getDictionary()
  return (
    <>
      {articles.length > 0 && (
        <div>
          {showHeading && <SectionHeading title={`📝 ${t.related_urls}`} />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {articles.map((article) => (
              <EventArticleListItem key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

const listEventArticles = unstable_cache(async (eventId: number) =>
  prisma.articles.findMany({
    where: {
      event_articles: {
        some: {
          event_id: eventId,
        },
      },
    },
    orderBy: {
      published_at: 'asc',
    },
  })
)

export default EventArticleList
