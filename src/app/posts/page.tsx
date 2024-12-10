import Breadcrumbs from '@/components/common/Breadcrumbs'
import Container from '@/components/common/Container'
import Title from '@/components/common/Title'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'

export const generateMetadata = async (): Promise<Metadata> => {
  const { posts: t } = await getDictionary()
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

export const generateStaticParams = async () => {
  return []
}

const Posts = async () => {
  const { posts: t } = await getDictionary()
  const posts = await listPosts()
  return (
    <Container className="max-w-screen-lg text-center px-2 md:px-2 py-4">
      <Breadcrumbs items={[{ name: t.heading, href: '/posts' }]} />
      <Title title={t.title} description={t.desc} />
      <div className="grid gap-4 text-left">
        {posts.map((post) => (
          <div key={post.id} className="grid gap-1">
            <div className="flex gap-2">
              <div className="text-xs text-gray-500">{post.created_at}</div>
              <div className="text-xs text-gray-500">{post.post_categories.name}</div>
            </div>
            <div className="font-semibold">
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </div>
            {post.description && <div className="text-xs text-gray-500">{post.description}</div>}
          </div>
        ))}
      </div>
    </Container>
  )
}

const listPosts = unstable_cache(async () =>
  prisma.posts.findMany({
    include: { post_categories: true },
    skip: 0,
    take: 10,
    orderBy: { created_at: 'desc' },
  })
)

export default Posts
