import SectionHeading from '@/components/common/SectionHeading'
import prisma from '@/db/prisma'
import { CacheTag } from '@/lib/cache'
import Config from '@/lib/config'
import { unstable_cache } from 'next/cache'
import TrackList from './TrackList'

interface Props {
  editionId: number
}

const RecordEditionTracks = async ({ editionId }: Props) => {
  const tracks = await listRecordTracksByEdition(editionId)
  const discs = Array.from({ length: Math.max(...tracks.map((t) => t.disc)) }, (_, i) => i + 1)
  return (
    <>
      {discs.map((disc) => (
        <div key={`${tracks[0].edition_id}_${disc}`}>
          <SectionHeading title={`DISC ${disc.toString()}`} />
          <TrackList tracks={tracks.filter((t) => t.disc === disc)} />
        </div>
      ))}
    </>
  )
}

const listRecordTracksByEdition = unstable_cache(
  async (editionId: number) =>
    prisma.record_tracks.findMany({
      where: { edition_id: editionId },
      include: {
        songs: {
          include: {
            song_credits: {
              include: { artists: true },
            },
          },
        },
      },
      orderBy: [{ track: 'asc' }],
    }),
  undefined,
  { tags: [CacheTag('Songs')], revalidate: Config.revalidate }
)

export default RecordEditionTracks
