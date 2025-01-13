import SectionHeading from '@/components/common/SectionHeading'
import Tweet from '@/components/tweets/Tweet'
import { Event } from '@/db/data'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import { unstable_cache } from 'next/cache'

interface Props {
  event: Event
  showHeading?: boolean
}

const EventTweetList = async ({ event, showHeading = false }: Props) => {
  const tweets = await listEventTweets(event.id)
  const { events: t } = await getDictionary()
  return (
    <>
      {tweets.length > 0 && (
        <div>
          {showHeading && <SectionHeading title={`📝 ${t.related_tweets}`} />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {tweets.map((rel) => (
              <Tweet key={rel.tweets.id} status={rel.tweets} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

const listEventTweets = unstable_cache(
  async (eventId: number) =>
    prisma.event_tweets.findMany({
      include: {
        tweets: {
          include: {
            tweet_authors: true,
          },
        },
      },
      where: {
        event_id: eventId,
      },
      orderBy: {
        tweets: {
          published_at: 'asc',
        },
      },
    }),
  undefined,
  { tags: [CacheTag('Events')] }
)

export default EventTweetList
