import { fontVariables } from './fonts';
import { LanguageProvider } from '@/i18n/LanguageContext';
import ScrollToTop from '@/components/ScrollToTop';
import '../globals.css';

const SITE_URL = 'https://notime-hub.com';
const LOCALES = ['en', 'ar'];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata() {
  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      // Official brand asset per instruction — design/NO TIME-09.png.
      icon: { url: '/images/logo/tabicon.png', type: 'image/png' },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === 'ar' ? 'ar' : 'en';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={fontVariables}>
      <body>
        <LanguageProvider lang={locale}>
          <ScrollToTop />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
