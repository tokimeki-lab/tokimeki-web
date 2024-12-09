import { Artist, SongCredit, SongCreditRole } from '@/db/data'
import { isDefaultLocale } from '@/i18n/config'
import Link from 'next/link'
import { songCreditRoleToLabel } from '../songs/SongCreditMapping'

interface Props {
  role: SongCreditRole
  credits: (SongCredit & { artists: Artist })[]
}

const TrackCredit = ({ role, credits }: Props) => {
  const title = songCreditRoleToLabel(role)
  const items = credits.filter((c) => c.role === role)
  return (
    <div className="flex flex-wrap gap-1">
      <div>{title}:</div>
      {items.map((credit) => (
        <Link key={credit.id} href={`/artists/${credit.artist_id}`} prefetch={false} className="text-primary">
          {isDefaultLocale ? credit.name : credit.artists.name_en}
        </Link>
      ))}
    </div>
  )
}

export default TrackCredit
