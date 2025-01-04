import Breadcrumbs from '@/components/common/Breadcrumbs'
import Chip from '@/components/common/Chip'
import Container from '@/components/common/Container'
import { Markdown } from '@/components/common/Markdown'
import Title from '@/components/common/Title'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { ISO8601toJPDateTimeStr } from '@/utils/datetime'
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
  const post = await getPost(id)
  if (!post) {
    return null
  } else {
    const { posts: t } = await getDictionary()
    const title = `${post.title} - ${t.title}`
    const description = `${t.title}: ${post.title}`
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

const Post = async ({ params }: Props) => {
  const p = await params
  const id = parseInt(p.id)
  if (isNaN(id) || id < 1) {
    notFound()
  }
  const post = await getPost(id)
  if (!post) {
    notFound()
  }
  const { posts: t } = await getDictionary()
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/posts' }]} />
      <Title title={post.title || ''} />
      <div className="flex gap-2">
        <Chip text={ISO8601toJPDateTimeStr(post.created_at)} icon="✏️" />
        <Chip text={ISO8601toJPDateTimeStr(post.updated_at)} icon="♻️" />
      </div>
      <div className="grid gap-4 pb-8 text-left">
        <Markdown body={post.body || ''} />
      </div>
    </Container>
  )
}

const getPost = unstable_cache(
  async (id: number) =>
    prisma.posts.findUnique({
      include: { post_categories: true },
      where: { id },
    }),
  undefined,
  { tags: [CacheTag('Posts')], revalidate: Config.revalidate }
)

export default Post
