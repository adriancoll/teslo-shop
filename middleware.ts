import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOGIN_URL = '/auth/login'

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('[middleware] - ', { session })

  if (!session) {
    /** @example {String} /checkout/address */
    const requestedPage = req.nextUrl.pathname
    const url = req.nextUrl.clone()

    url.pathname = LOGIN_URL
    // Add it to search params to logged in redirect
    url.search = `p=${requestedPage}`

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  //   matcher: ['/checkout/*']
  matcher: ['/checkout/address', '/checkout/summary']
}
