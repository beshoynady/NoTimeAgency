// Central registry of homepage photography, served from /public/images —
// plain paths, not bundler imports, so every consumer just needs a string.
export const IMG = {
  hero: '/images/hero/hero-bg.webp',
  // Approved replacement for the Hero section specifically (hero-bg.webp
  // above is still used elsewhere and untouched — see the Hero-only scope
  // note in components/home/Hero.jsx).
  heroPortal: '/images/hero/herobg3.png',
  gala: '/images/services/gala.webp',
  stadium: '/images/work/stadium.webp',
  motion: '/images/media/motion.webp',
  table: '/images/general/table.webp',
  award: '/images/services/award.webp',
  sprinter: '/images/services/sprinter.webp',
  stand: '/images/services/stand.webp',
  majlis: '/images/services/majlis.webp',
  oud: '/images/general/oud.webp',
  lighting: '/images/general/lighting.webp',
  gifts: '/images/general/gifts.webp',
  skyline: '/images/general/skyline.webp',
};

// Real client wordmarks for the Trusted By strip, sourced directly from
// each organization's own official site (or Wikimedia Commons for
// EgyptAir's public-domain mark) — see components/home/TrustedBy.jsx for
// the per-client sourcing note. No entry here for Smith Gulf: no official,
// verifiable asset could be found; it renders as a text wordmark instead.
export const LOGOS = {
  uaeProLeague: '/logos/uae-pro-league.svg',
  uaeAthleticsFederation: '/logos/uae-athletics-federation.png',
  egyptair: '/logos/egyptair.svg',
  dubaiAirshow: '/logos/dubai-airshow.svg',
  atm: '/logos/atm.png',
};
