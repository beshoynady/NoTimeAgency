'use client';

import { useLang } from "@/i18n/LanguageContext";
import Logo from "@/components/site/Logo";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer data-chapter="footer" className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-10 px-5 py-16 md:grid-cols-4 md:px-10">
        <div>
          <Logo className="h-8 w-48" />
          <p className="label mt-4 text-muted-foreground">{t.footer.dubai}</p>
        </div>
        <nav aria-label={t.footer.navigate}>
          <p className="label text-primary">{t.footer.navigate}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {t.nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="label text-primary">{t.footer.markets}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            SA / UAE / EG / QA / OM / KU
          </p>
        </div>
        <div>
          <p className="label text-primary">{t.footer.social}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            {t.footer.socialPlaceholder}
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[90rem] flex-col gap-2 border-t border-border px-5 py-6 text-[0.7rem] uppercase tracking-widest text-muted-foreground md:flex-row md:justify-between md:px-10">
        <span>
          © {new Date().getFullYear()} {t.footer.rights}
        </span>
        <span>{t.footer.tagline}</span>
      </div>
    </footer>
  );
}
