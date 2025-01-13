import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import CostumeDetailImagesWrapper from '@/components/costumes/CostumeDetailImagesWrapper'
import CostumeMetadata from '@/components/costumes/CostumeMetadata'
import CostumeTweets from '@/components/costumes/CostumeTweets'
import CostumeYouTubeVideos from '@/components/costumes/CostumeYouTubeVideos'
import prisma from '@/db/prisma'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface Props {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata | null> => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    return null
  }
  const costume = await getCostume(id)
  if (!costume) {
    return null
  } else {
    const { costumes: t } = await getDictionary()
    const title = `${isDefaultLocale ? costume.name : costume.name_en} - ${t.title}`
    const description = t.desc
    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
    }
  }
}

const Costume = async ({ params }: Props) => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    notFound()
  }
  const costume = await getCostume(id)
  if (!costume) {
    notFound()
  }
  const { costumes: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg text-center px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/costumes' }]} />
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
          <div className="xs:block md:hidden">
            <CostumeMetadata costume={costume} />
          </div>
          <div>
            <Suspense fallback={<CostumeDetailImagesWrapper />}>
              <CostumeDetailImagesWrapper costume={costume} />
            </Suspense>
          </div>
          <div className="hidden md:block">
            <CostumeMetadata costume={costume} />
          </div>
        </div>
        <Suspense fallback={<CostumeTweets />}>
          <CostumeTweets costumeId={costume.id} />
        </Suspense>
        <Suspense fallback={<CostumeYouTubeVideos />}>
          <CostumeYouTubeVideos costumeId={costume.id} />
        </Suspense>
      </div>
    </Container>
  )
}

const getCostume = unstable_cache(
  async (id: number) =>
    prisma.costumes.findUnique({
      include: {
        artists: true,
        events: true,
      },
      where: {
        id,
      },
    }),
  undefined,
  { tags: [CacheTag('Costumes')] }
)

export default Costume
