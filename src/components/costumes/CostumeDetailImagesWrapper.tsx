import { Costume } from '@/db/data'
import prisma from '@/db/prisma'
import { CacheTag } from '@/lib/cache'
import { unstable_cache } from 'next/cache'
import CostumeDetailImages from './CostumeDetailImages'

interface Props {
  costume?: Costume
}

const CostumeDetailImagesWrapper = async ({ costume }: Props) => {
  const images = costume ? await listCostumeImages(costume.id) : []
  return costume ? <CostumeDetailImages images={images} /> : <CostumeDetailImages />
}

const listCostumeImages = unstable_cache(
  async (id: number) =>
    await prisma.costume_images.findMany({
      where: {
        costume_id: id,
      },
      orderBy: {
        display_order: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTag('Costumes')] }
)

export default CostumeDetailImagesWrapper
