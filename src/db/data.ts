import {
  annual_events,
  articles,
  artists,
  blogs,
  costume_images,
  costumes,
  event_places,
  events,
  events_type,
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
export type Blog = blogs

export type Event = events
export type EventPlace = event_places
export type EventType = events_type
export type AnnualEvent = annual_events

export type Song = songs
export type SongCredit = song_credits
export type SongCreditRole = song_credits_role

export type Record = records
export type RecordEdition = record_editions
export type RecordTrack = record_tracks
export type RecordType = records_type

export type Artist = artists

export type Costume = costumes
export type CostumeImage = costume_images

export type YouTubeVideo = youtube_videos
export type YouTubeChannel = youtube_channels
export type YouTubeType = youtube_types
