import SectionHeading from '@/components/common/SectionHeading'
import Tweet from '@/components/tweets/Tweet'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { unstable_cache } from 'next/cache'

interface Props {
  costumeId?: number
}

const CostumeTweets = async ({ costumeId }: Props) => {
  const { costumes: t } = await getDictionary()
  const tweets = costumeId ? await listTweetsByCostumeId(costumeId) : []
  return !costumeId || tweets.length > 0 ? (
    <div>
      <SectionHeading title={`💬 ${t.related_tweets}`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {costumeId
          ? tweets.map((tweet) => {
              return <Tweet key={tweet.id} status={tweet} />
            })
          : Array.from({ length: 4 }).map((_, i) => <Tweet key={i} />)}
      </div>
    </div>
  ) : (
    <></>
  )
}

const listTweetsByCostumeId = unstable_cache(
  async (costumeId: number) =>
    prisma.tweets.findMany({
      include: {
        tweet_authors: true,
      },
      where: {
        costume_tweets: {
          some: {
            costume_id: costumeId,
          },
        },
      },
      orderBy: {
        published_at: 'desc',
      },
    }),
  undefined,
  { tags: [CacheTag('Costumes')], revalidate: Config.revalidate }
)

export default CostumeTweets
