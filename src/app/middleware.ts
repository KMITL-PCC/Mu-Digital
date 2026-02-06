import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  
  let ip = (request as any).ip || request.headers.get('x-forwarded-for') || '127.0.0.1'

  if (ip.includes(',')) {
    ip = ip.split(',')[0]
  }
  const allowedPrefix = process.env.ALLOWED_IP_PREFIX || '192.168.1.'

  const isLocal = ip === '::1' || ip === '127.0.0.1' || ip === 'localhost'
  const isAllowedNetwork = ip.startsWith(allowedPrefix)

  console.log(`Visitor IP: ${ip} | Allowed: ${isAllowedNetwork}`) 

  const isErrorPage = request.nextUrl.pathname === '/access-denied'

  if (!isLocal && !isAllowedNetwork && !isErrorPage) {
    return NextResponse.rewrite(new URL('/access-denied', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}