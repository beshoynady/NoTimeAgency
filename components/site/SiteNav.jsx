'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';
import Logo from './Logo';

export default function SiteNav() {
  const { t, lang, switchLang } = useLang();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the menu + focus management.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    // Move focus into the menu when it opens.
    const id = window.setTimeout(() => firstLinkRef.current?.focus(), 40);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(id);
    };
  }, [open]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = t.nav.links;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || open ? 'bg-background/92 backdrop-blur border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-[90rem] items-center justify-between px-5 md:px-10" aria-label={t.nav.label}>
        <a href="#top" aria-label={t.nav.home}>
          <Logo alt="" />
        </a>

        <ul className="hidden items-center gap-9 lg:flex" role="list">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="label text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Language switcher */}
          <div className="flex items-center label" role="group" aria-label={t.nav.language}>
            <button
              type="button"
              onClick={() => switchLang('en')}
              aria-pressed={lang === 'en'}
              aria-label={t.nav.langEn}
              className={`px-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                lang === 'en' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              EN
            </button>
            <span className="text-border" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => switchLang('ar')}
              aria-pressed={lang === 'ar'}
              aria-label={t.nav.langAr}
              className={`px-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                lang === 'ar' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              ع
            </button>
          </div>

          <a
            href="#contact"
            className="hidden border border-primary/60 px-5 py-3 label text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 lg:inline-block"
          >
            {t.nav.cta}
          </a>

          <button
            ref={menuBtnRef}
            type="button"
            aria-label={open ? t.nav.close : t.nav.open}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center border border-border text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary lg:hidden"
          >
            {open ? <X size={18} strokeWidth={1.4} /> : <Menu size={18} strokeWidth={1.4} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background lg:hidden">
          <ul className="px-5 py-2" role="list">
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-border/60 last:border-0">
                <a
                  ref={i === 0 ? firstLinkRef : null}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-2xl uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block bg-primary px-5 py-5 text-center label text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
          >
            {t.nav.cta}
          </a>
        </div>
      )}
    </header>
  );
}
