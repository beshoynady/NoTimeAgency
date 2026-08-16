'use client';

import { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { translations } from './translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ lang, children }) {
  const router = useRouter();
  const validLang = lang === 'ar' ? 'ar' : 'en';
  const dir = validLang === 'ar' ? 'rtl' : 'ltr';
  const t = translations[validLang];

  // The server-rendered <html lang/dir> (set in the [locale] layout) already
  // gets this right on first paint; this keeps it in sync defensively across
  // client-side locale switches too.
  useEffect(() => {
    const html = document.documentElement;
    html.lang = validLang;
    html.dir = dir;
  }, [validLang, dir]);

  const switchLang = (next) => {
    if (next === validLang) return;
    const hash = window.location.hash || '';
    router.push(`/${next}${hash}`);
  };

  return (
    <LanguageContext.Provider value={{ lang: validLang, dir, t, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider');
  return ctx;
};
