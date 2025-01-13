/** Tokisen related const and functions */

type TokisenMember =
  | '辻野かなみ'
  | '小泉遥香'
  | '坂井仁香'
  | '吉川ひより'
  | '永坂真心'
  | '藤本ばんび'
  | '小高サラ'
  | '杏ジュリア'
  | '菅田愛貴'
  | 'パブりん'

export const tokisenArtistIds = [
  { name: '辻野かなみ', id: 205 },
  { name: '杏ジュリア', id: 206 },
  { name: '坂井仁香', id: 207 },
  { name: '小泉遥香', id: 204 },
  { name: '菅田愛貴', id: 208 },
  { name: '吉川ひより', id: 197 },
  { name: '永坂真心', id: 209 },
  { name: '小高サラ', id: 211 },
  { name: '藤本ばんび', id: 210 },
  { name: 'パブりん', id: 212 },
]

export const getArtistId = (name: string): number => {
  const artist = tokisenArtistIds.find((a) => a.name === name)
  return artist ? artist.id : 0
}

interface Regime {
  startDate: string
  members: { name: TokisenMember; name_en: string; no: number; color: string; colorId: string }[]
  groupName: string
}

export const TokisenRegimes: Regime[] = [
  {
    startDate: '2015-04-11',
    members: [
      { name: '辻野かなみ', name_en: 'Kanami Tsujino', no: 1, color: 'ときめき♡ブルー', colorId: 'blue' },
      { name: '小泉遥香', name_en: 'Haruka Koizumi', no: 2, color: 'ときめき♡ピンク', colorId: 'pink' },
      { name: '坂井仁香', name_en: 'Hitoka Sakai', no: 3, color: 'ときめき♡レッド', colorId: 'red' },
      { name: '吉川ひより', name_en: 'Hiyori Yoshikawa', no: 4, color: 'ときめき♡グリーン', colorId: 'green' },
      { name: '永坂真心', name_en: 'Mako Nagasaka', no: 5, color: 'ときめき♡イエロー', colorId: 'yellow' },
    ],
    groupName: 'ときめき♡宣伝部',
  },
  {
    startDate: '2017-03-21',
    members: [
      { name: '辻野かなみ', name_en: 'Kanami Tsujino', no: 1, color: 'ときめき♡ブルー', colorId: 'blue' },
      { name: '小泉遥香', name_en: 'Haruka Koizumi', no: 2, color: 'ときめき♡ピンク', colorId: 'pink' },
      { name: '坂井仁香', name_en: 'Hitoka Sakai', no: 3, color: 'ときめき♡レッド', colorId: 'red' },
      { name: '吉川ひより', name_en: 'Hiyori Yoshikawa', no: 4, color: 'ときめき♡グリーン', colorId: 'green' },
    ],
    groupName: 'ときめき♡宣伝部',
  },
  {
    startDate: '2017-06-18',
    members: [
      { name: '辻野かなみ', name_en: 'Kanami Tsujino', no: 1, color: '超ときめき♡ブルー', colorId: 'blue' },
      { name: '藤本ばんび', name_en: 'Bambi Fujimoto', no: 2, color: '超ときめき♡レモン', colorId: 'lemon' },
      { name: '坂井仁香', name_en: 'Hitoka Sakai', no: 3, color: '超ときめき♡レッド', colorId: 'red' },
      { name: '小泉遥香', name_en: 'Haruka Koizumi', no: 4, color: '超ときめき♡ピンク', colorId: 'pink' },
      { name: '小高サラ', name_en: 'Sara Odaka', no: 5, color: '超ときめき♡パープル', colorId: 'purple' },
      { name: '吉川ひより', name_en: 'Hiyori Yoshikawa', no: 6, color: '超ときめき♡グリーン', colorId: 'green' },
    ],
    groupName: 'ときめき♡宣伝部',
  },
  {
    startDate: '2018-10-08',
    members: [
      { name: '辻野かなみ', name_en: 'Kanami Tsujino', no: 1, color: '超ときめき♡ブルー', colorId: 'blue' },
      { name: '藤本ばんび', name_en: 'Bambi Fujimoto', no: 2, color: '超ときめき♡レモン', colorId: 'lemon' },
      { name: '坂井仁香', name_en: 'Hitoka Sakai', no: 3, color: '超ときめき♡レッド', colorId: 'red' },
      { name: '小泉遥香', name_en: 'Haruka Koizumi', no: 4, color: '超ときめき♡ピンク', colorId: 'pink' },
      { name: '吉川ひより', name_en: 'Hiyori Yoshikawa', no: 6, color: '超ときめき♡グリーン', colorId: 'green' },
    ],
    groupName: 'ときめき♡宣伝部',
  },
  {
    startDate: '2018-10-14',
    members: [
      { name: '辻野かなみ', name_en: 'Kanami Tsujino', no: 1, color: 'ときめき♡ブルー', colorId: 'blue' },
      { name: '藤本ばんび', name_en: 'Bambi Fujimoto', no: 2, color: 'ときめき♡レモン', colorId: 'lemon' },
      { name: '坂井仁香', name_en: 'Hitoka Sakai', no: 3, color: 'ときめき♡レッド', colorId: 'red' },
      { name: '小泉遥香', name_en: 'Haruka Koizumi', no: 4, color: 'ときめき♡ピンク', colorId: 'pink' },
      { name: '杏ジュリア', name_en: 'Julia An', no: 5, color: '二代目ときめき♡パープル', colorId: 'purple' },
      { name: '吉川ひより', name_en: 'Hiyori Yoshikawa', no: 6, color: 'ときめき♡グリーン', colorId: 'green' },
    ],
    groupName: 'ときめき♡宣伝部',
  },
  {
    startDate: '2020-04-01',
    members: [
      { name: '辻野かなみ', name_en: 'Kanami Tsujino', no: 1, color: '超ときめき♡ブルー', colorId: 'blue' },
      { name: '杏ジュリア', name_en: 'Julia An', no: 2, color: '超ときめき♡パープル', colorId: 'purple' },
      { name: '坂井仁香', name_en: 'Hitoka Sakai', no: 3, color: '超ときめき♡レッド', colorId: 'red' },
      { name: '小泉遥香', name_en: 'Haruka Koizumi', no: 4, color: '超ときめき♡ピンク', colorId: 'pink' },
      { name: '菅田愛貴', name_en: 'Aiki Suda', no: 5, color: '超ときめき♡レモン', colorId: 'lemon' },
      { name: '吉川ひより', name_en: 'Hiyori Yoshikawa', no: 6, color: '超ときめき♡グリーン', colorId: 'green' },
    ],
    groupName: '超ときめき♡宣伝部',
  },
]

export const getTokisenRegime = (date: string): Regime | undefined => {
  const d = new Date(date)
  if (isNaN(d.getTime()) || d < new Date(TokisenRegimes[0].startDate)) {
    return undefined
  }
  if (d > new Date(TokisenRegimes[TokisenRegimes.length - 1].startDate)) {
    return TokisenRegimes[TokisenRegimes.length - 1]
  }
  for (let i = 1; i < TokisenRegimes.length; i++) {
    if (d < new Date(TokisenRegimes[i].startDate)) {
      return TokisenRegimes[i - 1]
    }
  }
  return undefined
}
