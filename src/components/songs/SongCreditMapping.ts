import { SongCreditRole } from '@/db/data'
import { getDictionary } from '@/i18n/dictionaries'

export const songCreditRoleToLabel = async (role: SongCreditRole) => {
  const { songs: t } = await getDictionary()
  switch (role) {
    case 'Lyrics':
      return t.lyrics
    case 'Music':
      return t.music
    case 'Arrangement':
      return t.arrangement
    case 'Dance':
      return t.dance
    default:
      return t.produce
  }
}
