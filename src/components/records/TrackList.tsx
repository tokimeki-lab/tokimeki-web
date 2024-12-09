import { Artist, RecordTrack, Song, SongCredit } from '@/db/data'
import TrackItem from './TrackItem'

interface Props {
  tracks: (RecordTrack & { song?: Song & { credits: (SongCredit & { artists: Artist })[] } })[]
}

const TrackList = ({ tracks }: Props) => {
  return (
    <div>
      {tracks.map((track) => (
        <>
          <TrackItem key={`${track.edition_id}_${track.disc}_${track.track}`} item={track} />
          <hr />
        </>
      ))}
    </div>
  )
}

export default TrackList
