import {
  Bodoni_Moda,
  Barlow_Condensed,
  Inter,
  Reem_Kufi,
  Tajawal,
} from 'next/font/google';

// Same five families/weights the site loaded from the Google Fonts CDN via
// @import in index.css. next/font self-hosts them at build time instead —
// required for Next.js (an @import in globals.css would be a render-blocking
// network request), not a typographic change.
export const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-bodoni-moda',
  display: 'swap',
});

export const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const reemKufi = Reem_Kufi({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-reem-kufi',
  display: 'swap',
});

export const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const fontVariables = [
  bodoniModa.variable,
  barlowCondensed.variable,
  inter.variable,
  reemKufi.variable,
  tajawal.variable,
].join(' ');
