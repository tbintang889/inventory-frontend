import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || null;

  // Daftar route publik (tidak butuh login)
  const publicPaths = ['/login', '/_next', '/favicon.ico'];

  const isPublic = publicPaths.some(path => req.nextUrl.pathname.startsWith(path));

  if (!token && !isPublic) {
    // Redirect ke /login kalau belum ada token
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Terapkan middleware ke semua route kecuali static files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
