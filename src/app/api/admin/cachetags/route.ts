import { CacheTags } from '@/lib/cache'
import { NextResponse } from 'next/server'

export const revalidate = 60

export const GET = async () => {
  const tags = CacheTags
  const now = new Date()
  return NextResponse.json({
    tags,
    generatedAt: now.toISOString(),
  })
}
