import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import Title from '@/components/common/Title'
import ChannelCollection from '@/components/youtube/ChannelCollection'
import VideoTypeCollection from '@/components/youtube/VideoTypeCollection'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const { youtube: t } = await getDictionary()
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

const Contents = async () => {
  const { youtube: t } = await getDictionary()
  const title = t.title
  const description = t.desc
  return (
    <Container className="max-w-screen-lg text-center px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/youtube' }]} />
      <Title title={title} description={description} />
      <div className="grid gap-16">
        <div>
          <SectionHeading title={`🎬 ${t.channel}`} />
          <ChannelCollection />
        </div>
        <div>
          <SectionHeading title={`🎬 ${t.genre}`} />
          <VideoTypeCollection />
        </div>
      </div>
    </Container>
  )
}

export default Contents
