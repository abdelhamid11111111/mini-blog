import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const protectedPaths = ['/dashboard']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (protectedPaths.some(path => pathname.startsWith(path))) {

    const token = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token')

    if (!token) {

      const loginUrl = new URL('/signin', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
