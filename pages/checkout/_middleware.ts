// middleware.ts
import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwt } from '../../utils'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, ev: NextFetchEvent) {
  const { token } = request.cookies
  const { name } = request.page

  try {
    await jwt.isVaidToken(token)
  } catch (error) {
    return NextResponse.redirect(`/auth/login?p=${name}`)
  }

  return NextResponse.next()
}
