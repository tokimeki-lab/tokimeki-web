export const Urls = {
  inqiuryForm: 'https://docs.google.com/forms/d/1E3EOsHMNFk6R0BUHmUFy_e1NQdtucLMQ0TmKV7L0PKY/viewform?pli=1&pli=1&edit_requested=true',
  noImage: 'https://tokiken.com/noimage.png',
  amazonProduct: (asin: string) => `https://www.amazon.co.jp/dp/${asin}/ref=nosim?tag=${process.env.NEXT_PUBLIC_ASSOCIATE_ID}`,
  youtubeThumbnail: (videoId: string | undefined | null) => (videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : undefined),
  youtubeVideo: (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`,
}
