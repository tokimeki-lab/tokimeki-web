import { Artist } from '@/db/data'
import { isDefaultLocale } from '@/i18n/config'
import Link from 'next/link'
import { FaInstagram, FaTiktok, FaTwitter, FaWikipediaW } from 'react-icons/fa'
import { FaEarthAsia } from 'react-icons/fa6'
import AdminLink from '../common/AdminLink'

interface Props {
  artist: Artist
}

const ArtistMetadata = ({ artist }: Props) => {
  const { name, name_en, kana, twitter_screenname, instagram_id, tiktok_id, wikipedia_slug, url } = artist
  return (
    <div className="py-4">
      <div className="text-sm text-gray-500">{kana}</div>
      {!isDefaultLocale && <div className="text-xs text-gray-300">{name}</div>}
      <h2 className="font-bold mb-2">
        <AdminLink path={`/artists/${artist.id}`} />
        {isDefaultLocale ? name : name_en}
      </h2>
      <div className="[&_]:inline-block">
        {wikipedia_slug && (
          <Link target="_blank" href={`https://ja.wikipedia.org/wiki/${wikipedia_slug}`} className="flex text-sm text-gray-500">
            <span className="pr-1 flex items-center">
              <FaWikipediaW />
            </span>
            <span>{wikipedia_slug}</span>
          </Link>
        )}
        {twitter_screenname && (
          <Link target="_blank" href={`https://twitter.com/${twitter_screenname}`} className="flex text-sm text-gray-500">
            <span className="pr-1 flex items-center">
              <FaTwitter />
            </span>
            <span>{twitter_screenname}</span>
          </Link>
        )}
        {instagram_id && (
          <Link target="_blank" href={`https://www.instagram.com/${instagram_id}`} className="flex text-sm text-gray-500">
            <span className="pr-1 flex items-center">
              <FaInstagram />
            </span>
            <span>{instagram_id}</span>
          </Link>
        )}
        {tiktok_id && (
          <Link target="_blank" href={`https://www.tiktok.com/@${tiktok_id}`} className="flex text-sm text-gray-500">
            <span className="pr-1 flex items-center">
              <FaTiktok />
            </span>
            <span>{tiktok_id}</span>
          </Link>
        )}
      </div>
      <div className="flex flex-wrap">
        {url && (
          <Link target="_blank" href={url} className="flex text-sm text-gray-500">
            <span className="pr-1 flex items-center">
              <FaEarthAsia />
            </span>
            <span>{url}</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ArtistMetadata
