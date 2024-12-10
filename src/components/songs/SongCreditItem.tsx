import { Artist, SongCredit } from '@/db/data'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { AdjustmentsVerticalIcon, DocumentTextIcon, MicrophoneIcon, MusicalNoteIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

interface Props {
  credit: SongCredit & { artists: Artist }
}

const SongCreditItem = async ({ credit }: Props) => {
  const title = await getTitle(credit)
  const sourceLabel = await getSourceLabel(credit)
  const icon = getIcon(credit)
  return (
    <div key={credit.id} className="p-2 lg:px-4 bg-white rounded-lg border overflow-hidden text-left">
      <div className="flex">
        <div className="flex justify-center pr-2 lg:pr-4">{icon}</div>
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          {!isDefaultLocale && <div className="text-xs text-gray-300">{credit.name}</div>}
          <div className="pb-1 font-semibold">
            <Link href={`/artists/${credit.artist_id}`} className="text-primary">
              {isDefaultLocale ? credit.name : credit.artists.name_en}
            </Link>
          </div>
          <div className="text-xs text-gray-500">
            {credit.source_url ? (
              <Link href={credit.source_url} className="text-primary">
                {sourceLabel}
              </Link>
            ) : (
              sourceLabel
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const getTitle = async (credit: SongCredit) => {
  const { songs: t } = await getDictionary()
  switch (credit.role) {
    case 'Lyrics':
      return t.lyrics
    case 'Music':
      return t.music
    case 'Arrangement':
      return t.arrangement
    case 'Vocal':
      return t.vocal
    case 'Dance':
      return t.dance
    case 'Produce':
    default:
      return credit.title || t.produce
  }
}

const getSourceLabel = async (credit: SongCredit) => {
  const { songs: t } = await getDictionary()

  switch (credit.source) {
    case 'BOOKLET':
      return `✅ ${t.source_booklet}`
    case 'JASRAC':
      return `✅ ${t.source_JASRAC}`
    case 'EXTERNAL':
      return `✅ ${t.source_website}`
    default:
      return `🎵 ${t.source_unknown}`
  }
}

const getIcon = (credit: SongCredit) => {
  switch (credit.role) {
    case 'Lyrics':
      return (
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary">
          <DocumentTextIcon className="h-6 w-6 text-white" />
        </div>
      )
    case 'Music':
      return (
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary">
          <MusicalNoteIcon className="h-6 w-6 text-white" />
        </div>
      )
    case 'Arrangement':
      return (
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary">
          <AdjustmentsVerticalIcon className="h-6 w-6 text-white" />
        </div>
      )
    case 'Vocal':
      return (
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary">
          <MicrophoneIcon className="h-6 w-6 text-white" />
        </div>
      )
    case 'Dance':
      return (
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200">
          <UserGroupIcon className="h-6 w-6 text-gray-500" />
        </div>
      )
    case 'Produce':
    default:
      return (
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200">
          <SparklesIcon className="h-6 w-6 text-gray-500" />
        </div>
      )
  }
}

export default SongCreditItem
