import { TweetAuthor, Tweet as TweetType } from '@/db/data'
import { timestampToJSTString } from '@/utils/datetime'
import { Urls } from '@/utils/urls'
import Link from 'next/link'
import Skelton from '../common/Skeleton'

interface Props {
  status?: TweetType & { tweet_authors: TweetAuthor }
}

const Tweet = ({ status }: Props) => {
  return (
    <div className="flex flex-col justify-between gap-2 border rounded p-2 hover:bg-gray-100">
      <div>
        <div className="flex gap-2 items-center">
          <div className="shrink-0">
            <Link
              href={status ? `https://twitter.com/${status.screen_name}/status/${status.id}` : '#'}
              rel="noopener noreferrer"
              className="font-bold text-sm"
              target="_blank">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={status ? status.tweet_authors.icon_url! : Urls.blankImage}
                alt={status ? status.tweet_authors.user_name : 'loading'}
                className="w-10 aspect-square rounded-full"
              />
            </Link>
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="overflow-hidden text-left text-nowrap text-ellipsis">
              <Link
                href={status ? `https://twitter.com/${status.screen_name}/status/${status.id}` : '#'}
                rel="noopener noreferrer"
                className="font-bold text-sm"
                target="_blank">
                {status ? status.tweet_authors.user_name : <Skelton className="w-[8em]" />}
              </Link>
            </div>
            <Link
              href={status ? `https://twitter.com/${status.screen_name}/status/${status.id}` : '#'}
              rel="noopener noreferrer"
              className="text-gray-500 text-sm"
              target="_blank">
              {status ? `@${status.screen_name}` : <Skelton />}
            </Link>
          </div>
        </div>
        <pre className="pt-2 text-xs text-left whitespace-pre-wrap">{status ? status.text : <Skelton lines={8} />}</pre>
      </div>
      <div>
        {status?.image_urls && (
          <div className="w-full">
            <Link
              href={status ? `https://twitter.com/${status.screen_name}/status/${status.id}` : '#'}
              rel="noopener noreferrer"
              prefetch={false}
              target="_blank">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={status.image_urls.split(',')[0]}
                alt="tweet-image"
                loading="lazy"
                className="w-full aspect-video sm:aspect-square object-cover rounded"
              />
            </Link>
          </div>
        )}
        <div className="flex text-gray-500 text-sm">
          <Link
            href={status ? `https://twitter.com/${status.screen_name}/status/${status.id}` : '#'}
            rel="noopener noreferrer"
            prefetch={false}
            target="_blank"
            className="hover:underline">
            {status ? timestampToJSTString(status.published_timestamp) : <Skelton className="w-[10em]" />}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Tweet
