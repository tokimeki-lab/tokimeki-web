import { Costume } from '@/db/data'
import prisma from '@/db/prisma'
import { unstable_cache } from 'next/cache'
import CostumeDetailImages from './CostumeDetailImages'

interface Props {
  costume: Costume
}

const CostumeDetailImagesWrapper = async ({ costume }: Props) => {
  const images = await listCostumeImages(costume.id)
  return <CostumeDetailImages images={images} />
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
    })
)

export default CostumeDetailImagesWrapper
