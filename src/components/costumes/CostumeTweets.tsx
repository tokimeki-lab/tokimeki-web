import SectionHeading from '@/components/common/SectionHeading'
import Tweet from '@/components/tweets/Tweet'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { unstable_cache } from 'next/cache'

interface Props {
  costumeId: number
}

const CostumeTweets = async ({ costumeId }: Props) => {
  const tweets = await listTweetsByCostumeId(costumeId)
  const { costumes: t } = await getDictionary()
  return tweets.length > 0 ? (
    <div>
      <SectionHeading title={`💬 ${t.related_tweets}`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {tweets.map((tweet) => {
          return <Tweet key={tweet.id} status={tweet} />
        })}
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
