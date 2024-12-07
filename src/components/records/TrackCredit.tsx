import { SongCredit, SongCreditRole } from '@/db/data'
import Link from 'next/link'
import { songCreditRoleToLabel } from '../songs/SongCreditMapping'

interface Props {
  role: SongCreditRole
  credits: SongCredit[]
}

const TrackCredit = ({ role, credits }: Props) => {
  const title = songCreditRoleToLabel(role)
  const items = credits.filter((c) => c.role === role)
  return (
    <div className="flex flex-wrap gap-1">
      <div>{title}:</div>
      {items.map((credit) => (
        <Link key={credit.id} href={`/artists/${credit.artist_id}`} prefetch={false} className="text-primary">
          {credit.name}
        </Link>
      ))}
    </div>
  )
}

export default TrackCredit
