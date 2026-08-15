import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { translations } from './translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ lang, children }) {
  const navigate = useNavigate();
  const validLang = lang === 'ar' ? 'ar' : 'en';
  const dir = validLang === 'ar' ? 'rtl' : 'ltr';
  const t = translations[validLang];

  // Keep the document language + direction in sync (immediate, reliable).
  useEffect(() => {
    const html = document.documentElement;
    html.lang = validLang;
    html.dir = dir;
  }, [validLang, dir]);

  // Switch language while preserving the in-page hash (navigation context).
  const switchLang = (next) => {
    if (next === validLang) return;
    const hash = window.location.hash || '';
    navigate(`/${next}${hash}`);
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
