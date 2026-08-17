'use client';

import { Instagram, Mail, Phone, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import Logo from "@/components/site/Logo";

const CONTACTS = [
  {
    label: "Phone",
    value: "+971 54 453 4333",
    href: "https://wa.me/971544534333",
    Icon: Phone,
    external: true,
  },
  {
    label: "Email",
    value: "info@notimehub.com",
    href: "mailto:info@notimehub.com",
    Icon: Mail,
  },
  {
    label: "Instagram",
    value: "@notimehub",
    href: "https://www.instagram.com/notimehub/",
    Icon: Instagram,
    external: true,
  },
];

const MARKETS = [
  "SA",
  "UAE",
  "EG",
  "QA",
  "OM",
  "KW",
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer
      data-chapter="footer"
      className="relative overflow-hidden border-t border-border bg-background"
    >
      {/* ================================================================ */}
      {/* MAIN FOOTER                                                      */}
      {/* ================================================================ */}

      <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-10 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10 lg:gap-16">

          {/* ============================================================ */}
          {/* BRAND                                                        */}
          {/* ============================================================ */}

          <div className="md:col-span-4">
            <Logo className="h-8 w-48" />

            <p className="label mt-5 max-w-xs leading-relaxed text-muted-foreground">
              {t.footer.dubai}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />

              <span className="label text-primary">
                NO TIME
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* NAVIGATION                                                    */}
          {/* ============================================================ */}

          <nav
            aria-label={t.footer.navigate}
            className="md:col-span-2"
          >
            <p className="label text-primary">
              {t.footer.navigate}
            </p>

            <ul className="mt-5 space-y-3">
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      text-muted-foreground
                      transition-colors
                      duration-300
                      hover:text-foreground
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-primary
                      focus-visible:outline-offset-4
                    "
                  >
                    <span>{link.label}</span>

                    <ArrowUpRight
                      size={12}
                      strokeWidth={1.3}
                      className="
                        opacity-0
                        -translate-x-1
                        transition-all
                        duration-300
                        group-hover:translate-x-0
                        group-hover:opacity-100
                        rtl-flip
                      "
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ============================================================ */}
          {/* MARKETS                                                       */}
          {/* ============================================================ */}

          <div className="md:col-span-2">
            <p className="label text-primary">
              {t.footer.markets}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {MARKETS.map((market) => (
                <span
                  key={market}
                  className="
                    border
                    border-border
                    px-3
                    py-2
                    text-[0.65rem]
                    font-medium
                    tracking-[0.16em]
                    text-muted-foreground
                    transition-colors
                    duration-300
                    hover:border-primary/50
                    hover:text-primary
                  "
                >
                  {market}
                </span>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* CONTACT                                                       */}
          {/* ============================================================ */}

          <div className="md:col-span-4">
            <p className="label text-primary">
              {t.footer.social}
            </p>

            <div className="mt-5 space-y-2">
              {CONTACTS.map(
                ({
                  label,
                  value,
                  href,
                  Icon,
                  external,
                }) => (
                  <a
                    key={value}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      border
                      border-border
                      bg-card/20
                      px-4
                      py-3.5
                      transition-all
                      duration-300
                      hover:border-primary/40
                      hover:bg-card/40
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-primary
                      focus-visible:outline-offset-2
                    "
                  >
                    {/* Icon */}
                    <span
                      className="
                        grid
                        h-9
                        w-9
                        shrink-0
                        place-items-center
                        border
                        border-border
                        text-primary
                        transition-colors
                        duration-300
                        group-hover:border-primary/40
                        group-hover:bg-primary/10
                      "
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                    </span>

                    {/* Content */}
                    <span className="min-w-0">
                      <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                        {label}
                      </span>

                      <span className="mt-1 block truncate text-sm text-foreground transition-colors duration-300 group-hover:text-primary">
                        <bdi dir="ltr">{value}</bdi>
                      </span>
                    </span>

                    {/* Arrow */}
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.3}
                      className="
                        ms-auto
                        shrink-0
                        text-muted-foreground
                        transition-all
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        group-hover:text-primary
                        rtl-flip
                      "
                    />
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* DIVIDER                                                          */}
      {/* ================================================================ */}

      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <div className="h-px bg-border" />
      </div>

      {/* ================================================================ */}
      {/* BOTTOM BAR                                                       */}
      {/* ================================================================ */}

      <div className="mx-auto flex max-w-[90rem] flex-col gap-4 px-5 py-6 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">

        <span>
          © {new Date().getFullYear()} {t.footer.rights}
        </span>

        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-border" />

          <span>
            {t.footer.tagline}
          </span>

          <span className="h-px w-6 bg-border" />
        </div>

      </div>
    </footer>
  );
}
