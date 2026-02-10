import { NextResponse, type NextRequest } from 'next/server';

// --- Global Cache ---
let cachedServerPublicIp: string | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 นาที

function isPrivateIp(ip: string) {
  return (
    ip === '::1' ||
    ip === '127.0.0.1' ||
    ip === 'localhost' ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    (ip.startsWith('172.') &&
      parseInt(ip.split('.')[1], 10) >= 16 &&
      parseInt(ip.split('.')[1], 10) <= 31)
  );
}

export async function middleware(request: NextRequest) {
  const isGuardEnabled = process.env.ENABLE_IP_GUARD === 'true';
  if (!isGuardEnabled) return NextResponse.next();

  // --- Visitor IP ---
  let visitorIp =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    (request as any).ip ||
    '127.0.0.1';

  if (visitorIp.startsWith('::ffff:')) {
    visitorIp = visitorIp.replace('::ffff:', '');
  }

  // --- Fetch Server Public IP (with cache) ---
  const now = Date.now();
  if (!cachedServerPublicIp || now - lastFetchTime > CACHE_DURATION) {
    try {
      const res = await fetch('https://api.ipify.org', { cache: 'no-store' });
      if (res.ok) {
        cachedServerPublicIp = (await res.text()).trim();
        lastFetchTime = now;
      }
    } catch {
      // ถ้า fetch ไม่ได้ → อย่าพัง flow
    }
  }

  const isLanOrLocal = isPrivateIp(visitorIp);
  const isPublicMatch =
    cachedServerPublicIp && visitorIp === cachedServerPublicIp;
  const isAllowed = isLanOrLocal || isPublicMatch;

  const pathname = request.nextUrl.pathname;
  const isErrorPage = pathname === '/access-denied';

  // ❌ BLOCK ONLY
  if (!isAllowed && !isErrorPage) {
    return NextResponse.redirect(
      new URL('/access-denied', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
