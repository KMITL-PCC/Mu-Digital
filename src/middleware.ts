import { NextResponse, type NextRequest } from 'next/server';

// --- Global Cache (เก็บค่าไว้นอก Function เพื่อ Performance) ---
let cachedServerPublicIp: string | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 นาที

// ฟังก์ชันเช็ค Private/Local IP (ครอบคลุม LAN ทั้งหมด)
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

  // ถ้าปิด Guard ไว้ ไม่ต้องเสียเวลาคำนวณ
  if (!isGuardEnabled) return NextResponse.next();

  // 1. หา Visitor IP (รองรับ Ngrok/Docker Proxy)
  let visitorIp =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    (request as any).ip ||
    '127.0.0.1';

  if (visitorIp.startsWith('::ffff:')) {
    visitorIp = visitorIp.replace('::ffff:', '');
  }

  // 2. Auto Fetch Server Public IP (พร้อม Cache)
  const now = Date.now();
  if (!cachedServerPublicIp || now - lastFetchTime > CACHE_DURATION) {
    try {
      const res = await fetch('https://api.ipify.org', { cache: 'no-store' });
      if (res.ok) {
        cachedServerPublicIp = (await res.text()).trim();
        lastFetchTime = now;
      }
    } catch (err) {
      console.warn('⚠️ Failed to fetch Server IP:', err);
    }
  }

  const isLanOrLocal = isPrivateIp(visitorIp);
  const isPublicMatch = cachedServerPublicIp && visitorIp === cachedServerPublicIp;
  const isAllowed = isLanOrLocal || isPublicMatch;

  const logIcon = isAllowed ? '✅' : '❌';
  const matchReason = isLanOrLocal 
    ? '(Matches LAN/Local)' 
    : isPublicMatch 
      ? '(Matches Public IP)' 
      : '(No Match)';

  console.log(`
  ${logIcon} [IP GUARD CHECK]
  --------------------------------------------------
  👤 Visitor IP    : ${visitorIp}
  🏠 Server IP     : ${cachedServerPublicIp || 'Fetching...'}
  📊 Comparison    : ${visitorIp} == ${cachedServerPublicIp || '?'}
  💡 Result        : ${isAllowed ? 'ALLOWED' : 'DENIED'} ${matchReason}
  --------------------------------------------------
  `);

  // 5. จัดการ Redirect
  const isRootPage = request.nextUrl.pathname === '/';
  const isErrorPage = request.nextUrl.pathname === '/access-denied';

  if (!isAllowed && !isErrorPage) {
    return NextResponse.redirect(new URL('/access-denied', request.url));
  }

  if (isAllowed && isRootPage) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};