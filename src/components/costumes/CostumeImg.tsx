import { Urls } from '@/utils/urls'

interface Props {
  imageKey?: string
  size: 'xs' | 'md' | 'lg'
  alt: string
}

const CostumeImg = ({ imageKey, size, alt }: Props) => {
  const key = imageKey ? encodeURIComponent(`costumes/${imageKey}.${size}.png`) : undefined
  const url = Urls.file(key)
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={alt} className="w-full aspect-square object-cover" loading="lazy" />
    </div>
  )
}

export default CostumeImg
