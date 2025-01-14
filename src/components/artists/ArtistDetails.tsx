import { Artist, Costume, CostumeImage } from '@/db/data'
import prisma from '@/db/prisma'
import { getDictionary } from '@/i18n/dictionaries'
import { CacheTag } from '@/lib/cache'
import { unstable_cache } from 'next/cache'
import ArtistMetadata from './ArtistMetadata'
import CostumeCredits from './CostumeCredits'
import EventCredits from './EventCredits'
import SongCredits from './SongCredits'

interface Props {
  artist: Artist & { costumes: (Costume & { costume_images: CostumeImage[] })[] }
}

const ArtistDetails = async ({ artist }: Props) => {
  const songCredits = (await listSongCreditsByArtist(artist.id)).filter((c) => c.artist_id === artist.id)
  const { artists: t } = await getDictionary()
  return (
    <>
      <ArtistMetadata artist={artist} />
      <SongCredits title={`🎤 ${t.vocal}`} credits={songCredits.filter((c) => c.role === 'Vocal')} />
      <SongCredits title={`🎵 ${t.lyrics}`} credits={songCredits.filter((c) => c.role === 'Lyrics')} />
      <SongCredits title={`🎵 ${t.music}`} credits={songCredits.filter((c) => c.role === 'Music')} />
      <SongCredits title={`🎵 ${t.arrangement}`} credits={songCredits.filter((c) => c.role === 'Arrangement')} />
      <SongCredits title={`🎵 ${t.produce}`} credits={songCredits.filter((c) => c.role === 'Produce')} />
      <SongCredits title={`💃 ${t.dance}`} credits={songCredits.filter((c) => c.role === 'Dance')} />
      <CostumeCredits title={`👗 ${t.costume}`} costumes={artist.costumes} />
      <EventCredits artistId={artist.id} />
    </>
  )
}

const listSongCreditsByArtist = unstable_cache(
  async (artistId: number) =>
    prisma.song_credits.findMany({
      include: {
        songs: true,
      },
      where: {
        artist_id: artistId,
      },
      orderBy: {
        songs: {
          id: 'asc',
        },
      },
    }),
  undefined,
  { tags: [CacheTag('Artists')] }
)

export default ArtistDetails
