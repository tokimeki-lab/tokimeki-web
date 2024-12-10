import { Artist, RecordTrack, Song, SongCredit } from '@/db/data'
import TrackItem from './TrackItem'

interface Props {
  tracks: (RecordTrack & { song?: Song & { credits: (SongCredit & { artists: Artist })[] } })[]
}

const TrackList = ({ tracks }: Props) => {
  return (
    <div className="pb-8">
      {tracks.map((track) => (
        <div key={`${track.edition_id}_${track.disc}_${track.track}`}>
          <TrackItem item={track} />
          {tracks.length !== track.track && <hr />}
        </div>
      ))}
    </div>
  )
}

export default TrackList
