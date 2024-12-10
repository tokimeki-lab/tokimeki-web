import { Artist, Costume, Event } from '@/db/data'
import { isDefaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Urls } from '@/utils/urls'
import Link from 'next/link'

interface Props {
  costume: Costume & { events: Event | null } & { artists: Artist | null }
}

const CostumeMetadata = async ({ costume }: Props) => {
  const { name, name_en, is_official_name, events: event } = costume
  const { costumes: t } = await getDictionary()
  return (
    <div className="text-left grid gap-1 [&_]:text-xs [&_]:text-gray-500">
      <div>
        <span className="pr-1">{t.costume_name_type}:</span>
        <span> {is_official_name ? t.official : t.unofficial}</span>
      </div>
      <h2 className="font-bold text-lg text-primary">{isDefaultLocale ? name : name_en}</h2>
      {!isDefaultLocale && <div>{name}</div>}
      <div>
        <span className="pr-1">{t.designer}:</span>
        {costume.artists ? (
          <Link href={`/artists/${costume.artist_id}`} className="text-primary">
            {isDefaultLocale ? costume.artists.name : costume.artists.name_en}
          </Link>
        ) : (
          <>
            <span className="pr-1">{t.researching}</span>
            {isDefaultLocale && (
              <span>
                [
                <Link href={Urls.inqiuryForm} target="_blank" className="text-primary">
                  情報を提供する
                </Link>
                ]
              </span>
            )}
          </>
        )}
      </div>
      {event && (
        <>
          <div>
            <span className="pr-1">{t.first_appearance}:</span>
            <Link href={`/calendar/${event.date.replaceAll('-', '').slice(0, 6)}`} className="text-primary">
              {event.date}
            </Link>
          </div>
          <div>
            <span className="pr-1">{t.first_appearance_event}:</span>
            <Link href={`/events/${event.id}`} className="text-primary">
              {event.title}
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default CostumeMetadata
