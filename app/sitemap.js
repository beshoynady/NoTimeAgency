const SITE_URL = 'https://notime-hub.com';

export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      alternates: { languages: { en: `${SITE_URL}/en`, ar: `${SITE_URL}/ar` } },
    },
    {
      url: `${SITE_URL}/ar`,
      lastModified: new Date(),
      alternates: { languages: { en: `${SITE_URL}/en`, ar: `${SITE_URL}/ar` } },
    },
  ];
}
