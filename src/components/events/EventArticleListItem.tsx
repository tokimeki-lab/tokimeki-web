import { Article } from '@/db/data'
import { Urls } from '@/utils/urls'

interface Props {
  article: Article
}

const EventArticleListItem = ({ article }: Props) => {
  return (
    <a href={article.url} target="_blank" rel="noopener" className="block border rounded">
      <div className="flex gap-1 text-sm text-gray-500">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.thumbnail_url || Urls.noImage} alt={article.title} className="w-16 h-16 aspect-square object-cover rounded-l" />
        <div className="flex flex-col p-1 h-16 overflow-hidden">
          <div className="h-12 font-bold overflow-hidden">{article.title}</div>
          <div className="text-xs">{article.published_at}</div>
        </div>
      </div>
    </a>
  )
}

export default EventArticleListItem
