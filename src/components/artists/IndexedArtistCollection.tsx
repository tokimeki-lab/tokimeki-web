import IndexHeading from '@/components/common/IndexHeading'
import { jpIndexNavItems } from '@/components/common/IndexNav'
import { Artist } from '@/db/data'
import prisma from '@/db/prisma'
import { CacheTag } from '@/lib/cache'
import { unstable_cache } from 'next/cache'
import ArtistCollection from './ArtistCollection'

const IndexedArtistCollection = async () => {
  const artists = await listArtists()
  const navItems = jpIndexNavItems
  const groupedArtists = new Map<string, Artist[]>()
  for (const artist of artists) {
    let key = navItems.length - 1
    for (let i = 1; i <= navItems.length; i++) {
      if (artist.kana.charAt(0) < navItems[i]) {
        key = i - 1
        break
      }
    }
    const item = artist
    const newItems = [...(groupedArtists.get(navItems[key]) || []), item]
    groupedArtists.set(navItems[key], newItems)
  }
  return (
    <div>
      {navItems.map((i) => (
        <div key={i}>
          <IndexHeading id={i} />
          <ArtistCollection artists={groupedArtists.get(i) || []} />
        </div>
      ))}
    </div>
  )
}

const listArtists = unstable_cache(
  async () =>
    prisma.artists.findMany({
      include: {
        song_credits: {
          include: {
            songs: true,
          },
          where: {
            songs: {
              thumbnail_url: {
                not: null,
              },
            },
          },
          take: 1,
        },
      },
      orderBy: [{ kana: 'asc' }],
    }),
  undefined,
  { tags: [CacheTag('Artists')] }
)

export default IndexedArtistCollection
