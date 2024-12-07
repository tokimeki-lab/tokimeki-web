import { Urls } from '@/utils/urls'

interface Props {
  src?: string
  alt: string
}

const AlbumCover = ({ src, alt }: Props) => {
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src || Urls.noImage} alt={alt} className="aspect-square w-full object-cover" />
    </div>
  )
}

export default AlbumCover
