import { NextResponse } from 'next/server';

const LOCALES = ['en', 'ar'];
const DEFAULT_LOCALE = 'en';

// Mirrors the old React Router setup exactly:
//   <Route path="/" element={<Navigate to="/en" replace />} />   — a real
//     redirect, so "/" -> "/en" changes the visible URL.
//   <Route path="/:lang" .../> and <Route path="/:lang/*" .../>  — these two
//     routes together match literally every non-root path, and their
//     handler (LangRoute) silently normalizes any value other than "ar" to
//     "en" *without* changing the URL. A rewrite is the Next.js equivalent
//     of that "render as English, leave the address bar alone" behaviour;
//     a redirect would visibly change URLs the old app never touched.
export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  const [, firstSegment] = pathname.split('/');

  if (LOCALES.includes(firstSegment)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Skip Next.js internals and any file with an extension (static assets).
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\..*).*)',
  ],
};
