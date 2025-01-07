import Alert from '@/components/common/Alert'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import Title from '@/components/common/Title'
import CostumeCollection from '@/components/costumes/CostumeCollection'
import prisma from '@/db/prisma'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { Urls } from '@/utils/urls'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'

export const generateMetadata = async (): Promise<Metadata> => {
  const { costumes: t } = await getDictionary()
  const title = t.title
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

const Costumes = async () => {
  const costumes = await listCostumes()
  const { costumes: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg text-center px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/costumes' }]} />
      <Title title={t.title} description={t.desc} />
      <div className="grid gap-16">
        <div>
          <SectionHeading title={`👗 ${t.chotokisencostume}`} />
          {isDefaultLocale && <Alert message="写真や情報の提供を募集しています" type="info" href={Urls.inqiuryForm} />}
          <CostumeCollection costumes={costumes.filter((c) => c.type === 'chotokisen')} />
        </div>
        <div>
          <SectionHeading title={`👗 ${t.tokisencostume}`} />
          {isDefaultLocale && (
            <Alert
              message="ときめき♡宣伝部衣装データは作成中です。衣装展やイベントなどで撮影した写真や情報を募集しています。"
              type="warning"
              href={Urls.inqiuryForm}
            />
          )}
          <CostumeCollection costumes={costumes.filter((c) => c.type === 'tokisen')} />
        </div>
        <div>
          <SectionHeading title={`👗 ${t.birthdaycostume}`} />
          {isDefaultLocale && (
            <Alert
              message="生誕祭衣装データは作成中です。衣装展やイベントなどで撮影した写真や情報を募集しています。"
              type="warning"
              href={Urls.inqiuryForm}
            />
          )}
          <CostumeCollection costumes={costumes.filter((c) => c.type === 'birthday')} />
        </div>
      </div>
    </Container>
  )
}

const listCostumes = unstable_cache(
  async () =>
    prisma.costumes.findMany({
      include: {
        artists: true,
        costume_images: {
          take: 1,
          orderBy: {
            display_order: 'asc',
          },
        },
      },
      orderBy: {
        display_order: 'asc',
      },
    }),
  undefined,
  { tags: [CacheTag('Costumes')], revalidate: Config.revalidate }
)

export default Costumes
