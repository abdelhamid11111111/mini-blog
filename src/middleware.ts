import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJwt, parseAuthCookie } from '../utils/jwt'

export async function middleware(request: NextRequest) {
    
    const cookieHeader = request.headers.get('cookie')
    const token = parseAuthCookie(cookieHeader)

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const payload = await verifyJwt(token) // Now async but same function name
    
    if (!payload) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/api/item/:path*',
        // Add other protected routes
    ],
}