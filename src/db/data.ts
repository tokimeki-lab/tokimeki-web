import {
  annual_events,
  articles,
  artists,
  blogs,
  costume_images,
  costumes,
  costumes_type,
  event_places,
  event_setlist,
  events,
  events_type,
  record_editions,
  record_tracks,
  records,
  records_type,
  song_credits,
  song_credits_role,
  songs,
  tweet_authors,
  tweets,
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
export type EventSetlist = event_setlist

export type Song = songs
export type SongCredit = song_credits
export type SongCreditRole = song_credits_role

export type Record = records
export type RecordEdition = record_editions
export type RecordTrack = record_tracks
export type RecordType = records_type

export type Artist = artists

export type Costume = costumes
export type CostumeType = costumes_type
export type CostumeImage = costume_images

export type Tweet = tweets
export type TweetAuthor = tweet_authors

export type YouTubeVideo = youtube_videos
export type YouTubeChannel = youtube_channels
export type YouTubeType = youtube_types
