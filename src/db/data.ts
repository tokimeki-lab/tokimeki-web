import {
  articles,
  record_editions,
  record_tracks,
  records,
  records_type,
  song_credits,
  song_credits_role,
  songs,
  youtube_channels,
  youtube_types,
  youtube_videos,
} from '@prisma/client'

export type Article = articles

export type Song = songs
export type SongCredit = song_credits
export type SongCreditRole = song_credits_role

export type Record = records

export type RecordEdition = record_editions
export type RecordTrack = record_tracks
export type RecordType = records_type

export type YouTubeVideo = youtube_videos
export type YouTubeChannel = youtube_channels
export type YouTubeType = youtube_types
