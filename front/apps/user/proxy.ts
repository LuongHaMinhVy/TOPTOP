import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const nextIntlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the pathname already has a locale
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale && pathname === '/') {
    // Detect region/locale for the root path
    const country = req.headers.get('x-vercel-ip-country') || req.headers.get('cf-ipcountry');
    const acceptLanguage = req.headers.get('accept-language');

    let locale = 'en'; // Default to English for international users

    if (country === 'VN') {
      locale = 'vi';
    } else if (acceptLanguage?.toLowerCase().includes('vi')) {
      locale = 'vi';
    }

    // Redirect to the detected locale
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  return nextIntlMiddleware(req);
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - all files inside /public (e.g. /favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
