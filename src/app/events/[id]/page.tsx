import AdminLink from '@/components/common/AdminLink'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import EventArticleList from '@/components/events/EventArticleList'
import EventBlogList from '@/components/events/EventBlogList'
import EventCostumeList from '@/components/events/EventCostumeList'
import EventInfo from '@/components/events/EventInfo'
import EventNote from '@/components/events/EventNote'
import EventSetList from '@/components/events/EventSetList'
import EventTweetList from '@/components/events/EventTweetList'
import EventYouTubeVideoList from '@/components/events/EventYouTubeVideoList'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata | null> => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    return null
  }
  const event = await getEvent(id)
  if (!event) {
    return null
  } else {
    const { events: t } = await getDictionary()
    const title = `${event.title} - ${t.title}`
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

export const generateStaticParams = async () => {
  return []
}

const Event = async ({ params }: Props) => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    notFound()
  }
  const event = await getEvent(id)
  if (!event) {
    notFound()
  }
  const yyyymm = `${event.date.slice(0, 4)}${event.date.slice(5, 7)}`
  const { events: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: `/calendar/${yyyymm}` }]} />
      <div className="flex items-center">
        <AdminLink path={`/events/${event.id}`} />
        <Title title={event.title || ''} />
      </div>
      <EventInfo event={event} />
      <EventNote event={event} />
      <div className="grid gap-8 py-8">
        <EventSetList event={event} showHeading={true} />
        <EventArticleList event={event} showHeading={true} />
        <EventCostumeList event={event} showHeading={true} />
        <EventYouTubeVideoList event={event} showHeading={true} />
        <EventBlogList showHeading={true} />
        <EventTweetList event={event} showHeading={true} />
      </div>
    </Container>
  )
}

const getEvent = unstable_cache(
  async (id: number) =>
    prisma.events.findUnique({
      where: {
        id,
      },
    }),
  undefined,
  { tags: [CacheTag('Events')], revalidate: Config.revalidate }
)

export default Event
