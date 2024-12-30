import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const { API_KEY } = process.env

export async function PUT(request: NextRequest) {
  const ACTION_KEY = request.headers.get('authorization')
  if (API_KEY !== ACTION_KEY) {
    return NextResponse.json({ status: 'failed', message: 'unauthorized' }, { status: 401 })
  }
  const searchParams = request.nextUrl.searchParams
  const p = searchParams.get('path')
  if (p) {
    revalidatePath(p)
    return NextResponse.json({ status: 'success' })
  }

  const t = searchParams.get('tag')
  if (t) {
    revalidateTag(t)
    return NextResponse.json({ status: 'success' })
  }

  return NextResponse.json({ status: 'failed', message: 'invalid request' }, { status: 400 })
}
