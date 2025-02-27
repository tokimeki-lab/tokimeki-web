import CostumeImg from '@/components/costumes/CostumeImg'
import { Costume, CostumeImage } from '@/db/data'
import { isDefaultLocale } from '@/i18n/config'
import Link from 'next/link'

interface Props {
  costume: Costume & { costume_images: CostumeImage[] }
}

const CostumeCreditItem = ({ costume }: Props) => {
  const { id, name, name_en, costume_images } = costume
  return (
    <Link href={`/costumes/${id}`} prefetch={false}>
      <div className="bg-white hover:bg-gray-100 rounded-lg border text-left [&_div]:overflow-hidden [&_div]:overflow-ellipsis [&_div]:whitespace-nowrap">
        <div className="col-span-1">
          <CostumeImg imageKey={costume_images.length > 0 ? costume_images[0].image_key : undefined} size="xs" alt={name} />
        </div>
        <div className="col-span-1 p-2 grid gap-1">
          <div className="text-sm font-semibold">{isDefaultLocale ? name : name_en}</div>
        </div>
      </div>
    </Link>
  )
}

export default CostumeCreditItem
