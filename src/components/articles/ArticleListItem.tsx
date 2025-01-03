import { Article } from '@/db/data'
import { Urls } from '@/utils/urls'
import { ArticleSites } from './ArticleSites'

interface Props {
  article: Article
}

const ArticleListItem = ({ article }: Props) => {
  const site = ArticleSites.find((site) => article.url.startsWith(site.articleUrlStartWith))
  return (
    <a key={article.id} href={article.url} title={article.title} target="_blank" rel="noopener" className="block border rounded">
      <div className="flex gap-1 text-sm text-gray-500">
        <div className="h-28 aspect-square">
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.thumbnail_url || Urls.noImage}
            alt={article.title}
            loading="lazy"
            className="w-28 h-28 aspect-square object-cover rounded-l"
          />
        </div>
        <div className="flex flex-col p-1 h-28 overflow-hidden">
          <div>
            <span className={`${site?.id === 'tokisen' ? 'bg-orange' : 'bg-primary'} text-white py-[1px] px-2 rounded-full text-xs font-bold`}>
              {site ? site.label : 'その他'}
            </span>
          </div>
          <div className="h-14 font-bold overflow-hidden">{article.title}</div>
          <div className="pt-1 text-xs">{article.published_at}</div>
        </div>
      </div>
    </a>
  )
}

export default ArticleListItem
