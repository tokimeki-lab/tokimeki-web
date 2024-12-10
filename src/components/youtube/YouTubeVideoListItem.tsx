import { YouTubeVideo } from '@/db/data'
import { Urls } from '@/utils/urls'

interface Props {
  video: YouTubeVideo
}

const YouTubeVideoListItem = ({ video }: Props) => {
  return (
    <div key={video.id} className="relative rounded overflow-hidden aspect-video">
      <a href={Urls.youtubeVideo(video.id)} target="_blank" rel="noopener noreferrer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={Urls.youtubeThumbnail(video.id)} alt={video.title} className="w-full h-36 object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1">
          <div className="text-xs">{video.published_at}</div>
          <div className="text-sm h-9">{video.title}</div>
        </div>
      </a>
    </div>
  )
}

export default YouTubeVideoListItem
