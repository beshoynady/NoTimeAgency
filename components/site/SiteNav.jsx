'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import { useLang } from '../../i18n/LanguageContext';
import Logo from './Logo';

const MENU_EASE = [0.16, 1, 0.3, 1];

const menuVariants = {
  closed: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.22,
      ease: MENU_EASE,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: MENU_EASE,
    },
  },
};

const listVariants = {
  closed: {
    transition: {
      staggerChildren: 0.025,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.065,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
    y: 18,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: MENU_EASE,
    },
  },
};

export default function SiteNav() {
  const { t, lang, switchLang } = useLang();

  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  const menuBtnRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* ---------------------------------------------------------------------- */
  /* KEYBOARD + FOCUS                                                       */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!open) return;

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);

        requestAnimationFrame(() => {
          menuBtnRef.current?.focus();
        });
      }
    };

    document.addEventListener('keydown', onKey);

    const timeout = window.setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 120);

    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(timeout);
    };
  }, [open]);

  /* ---------------------------------------------------------------------- */
  /* BODY SCROLL LOCK                                                       */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  /* ---------------------------------------------------------------------- */
  /* CLOSE MENU ON DESKTOP                                                  */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');

    const handleChange = (event) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    media.addEventListener?.('change', handleChange);

    return () => {
      media.removeEventListener?.('change', handleChange);
    };
  }, []);

  const links = t.nav.links;

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-50
        transition-all
        duration-500
        ease-[cubic-bezier(0.16,1,0.3,1)]
        ${
          solid || open
            ? 'border-b border-border bg-background/90 backdrop-blur-xl'
            : 'bg-transparent'
        }
      `}
    >
      {/* ------------------------------------------------------------------ */}
      {/* NAVBAR                                                             */}
      {/* ------------------------------------------------------------------ */}

      <nav
        className="
          mx-auto
          flex
          h-[68px]
          max-w-[90rem]
          items-center
          justify-between
          px-5
          md:px-10
        "
        aria-label={t.nav.label}
      >
        {/* LOGO */}

        <a
          href="#top"
          aria-label={t.nav.home}
          onClick={() => setOpen(false)}
          className="
            relative
            z-[70]
            inline-flex
            items-center
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-primary
            focus-visible:outline-offset-4
          "
        >
          <motion.div
            animate={{
              opacity: open ? 0.82 : 1,
              scale: open ? 0.97 : 1,
            }}
            transition={{
              duration: 0.35,
              ease: MENU_EASE,
            }}
          >
            <Logo alt="" />
          </motion.div>
        </a>

        {/* ---------------------------------------------------------------- */}
        {/* DESKTOP NAV                                                      */}
        {/* ---------------------------------------------------------------- */}

        <ul
          className="
            hidden
            items-center
            gap-9
            lg:flex
          "
          role="list"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="
                  label
                  relative
                  text-muted-foreground
                  transition-colors
                  duration-300
                  hover:text-primary
                  focus-visible:text-primary
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-primary
                "
              >
                {link.label}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-2
                    left-0
                    h-px
                    w-0
                    bg-primary
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </a>
            </li>
          ))}
        </ul>

        {/* ---------------------------------------------------------------- */}
        {/* ACTIONS                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative z-[70] flex items-center gap-3 md:gap-4">
          {/* LANGUAGE */}

          <div
            className="
              flex
              items-center
              label
            "
            role="group"
            aria-label={t.nav.language}
          >
            <button
              type="button"
              onClick={() => switchLang('en')}
              aria-pressed={lang === 'en'}
              aria-label={t.nav.langEn}
              className={`
                px-1
                transition-colors
                duration-300
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-primary
                ${
                  lang === 'en'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              EN
            </button>

            <span
              className="text-border"
              aria-hidden="true"
            >
              |
            </span>

            <button
              type="button"
              onClick={() => switchLang('ar')}
              aria-pressed={lang === 'ar'}
              aria-label={t.nav.langAr}
              className={`
                px-1
                transition-colors
                duration-300
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-primary
                ${
                  lang === 'ar'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              ع
            </button>
          </div>

          {/* DESKTOP CTA */}

          <a
            href="#contact"
            className="
              group
              hidden
              items-center
              gap-3
              border
              border-primary/60
              px-5
              py-3
              label
              text-primary
              transition-all
              duration-300
              hover:bg-primary
              hover:text-primary-foreground
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-primary
              focus-visible:outline-offset-2
              lg:inline-flex
            "
          >
            <span>{t.nav.cta}</span>

            <motion.span
              aria-hidden="true"
              className="inline-block"
              whileHover={{ x: 3 }}
            >
              ↗
            </motion.span>
          </a>

          {/* ---------------------------------------------------------------- */}
          {/* MOBILE MENU BUTTON                                                */}
          {/* ---------------------------------------------------------------- */}

          <button
            ref={menuBtnRef}
            type="button"
            aria-label={open ? t.nav.close : t.nav.open}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="
              group
              relative
              grid
              h-11
              w-11
              place-items-center
              overflow-hidden
              border
              border-border
              bg-background/40
              text-foreground
              backdrop-blur-sm
              transition-all
              duration-300
              hover:border-primary/60
              hover:text-primary
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-primary
              lg:hidden
            "
          >
            {/* Animated background */}

            <motion.span
              aria-hidden="true"
              className="
                absolute
                inset-0
                bg-primary
              "
              initial={false}
              animate={{
                scale: open ? 1 : 0,
              }}
              transition={{
                duration: 0.35,
                ease: MENU_EASE,
              }}
              style={{
                transformOrigin: 'center',
              }}
            />

            {/* Morphing icon */}

            <span
              className="
                relative
                z-10
                flex
                h-5
                w-5
                flex-col
                items-center
                justify-center
              "
              aria-hidden="true"
            >
              <motion.span
                className="
                  absolute
                  h-px
                  w-5
                  bg-current
                "
                animate={{
                  rotate: open ? 45 : 0,
                  y: open ? 0 : -3,
                  width: open ? 20 : 20,
                }}
                transition={{
                  duration: 0.35,
                  ease: MENU_EASE,
                }}
              />

              <motion.span
                className="
                  absolute
                  h-px
                  bg-current
                "
                animate={{
                  rotate: open ? -45 : 0,
                  y: open ? 0 : 3,
                  width: open ? 20 : 14,
                  x: open ? 0 : 3,
                }}
                transition={{
                  duration: 0.35,
                  ease: MENU_EASE,
                }}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* ================================================================== */}
      {/* MOBILE MENU                                                        */}
      {/* ================================================================== */}

      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}

            <motion.button
              type="button"
              aria-label={t.nav.close}
              className="
                fixed
                inset-x-0
                top-[68px]
                bottom-0
                z-40
                cursor-default
                bg-black/20
                backdrop-blur-[2px]
                lg:hidden
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
              }}
              onClick={() => setOpen(false)}
            />

            {/* PANEL */}

            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t.nav.label}
              className="
                absolute
                inset-x-0
                top-[68px]
                z-50
                overflow-hidden
                border-t
                border-border
                bg-background
                lg:hidden
              "
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Decorative top line */}

              <motion.div
                aria-hidden="true"
                className="
                  h-px
                  origin-left
                  bg-primary
                "
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08,
                  ease: MENU_EASE,
                }}
              />

              <div
                className="
                  max-h-[calc(100dvh-68px)]
                  overflow-y-auto
                  overscroll-contain
                  px-5
                  pb-7
                  pt-6
                "
              >
                {/* MENU META */}

                <div className="mb-6 flex items-center justify-between">
                  <span className="label text-primary">
                    NO TIME
                  </span>

                  <span className="label text-muted-foreground">
                    {lang === 'ar' ? 'القائمة' : 'MENU'}
                  </span>
                </div>

                {/* LINKS */}

                <motion.ul
                  className="
                    border-t
                    border-border
                  "
                  role="list"
                  variants={listVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  {links.map((link, index) => (
                    <motion.li
                      key={link.href}
                      variants={itemVariants}
                      className="
                        border-b
                        border-border
                      "
                    >
                      <a
                        ref={index === 0 ? firstLinkRef : null}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="
                          group
                          flex
                          min-h-[72px]
                          items-center
                          justify-between
                          gap-5
                          py-4
                          focus-visible:outline
                          focus-visible:outline-2
                          focus-visible:outline-primary
                          focus-visible:outline-offset-[-4px]
                        "
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className="
                              label
                              w-6
                              text-primary/60
                            "
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <span
                            className="
                              font-display
                              text-[clamp(1.7rem,8vw,2.7rem)]
                              uppercase
                              leading-none
                              tracking-[-0.03em]
                              text-foreground
                              transition-transform
                              duration-300
                              group-hover:translate-x-1
                            "
                          >
                            {link.label}
                          </span>
                        </div>

                        <span
                          aria-hidden="true"
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            border
                            border-border
                            text-primary
                            transition-all
                            duration-300
                            group-hover:border-primary
                            group-hover:bg-primary
                            group-hover:text-primary-foreground
                          "
                        >
                          ↗
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* CTA */}

                <motion.a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="
                    group
                    mt-7
                    flex
                    min-h-[58px]
                    items-center
                    justify-between
                    bg-primary
                    px-5
                    py-4
                    label
                    text-primary-foreground
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-primary
                    focus-visible:outline-offset-2
                  "
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{
                    delay: 0.3,
                  }}
                >
                  <span>{t.nav.cta}</span>

                  <span
                    aria-hidden="true"
                    className="
                      text-lg
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    ↗
                  </span>
                </motion.a>

                {/* FOOTER META */}

                <motion.div
                  className="
                    mt-7
                    flex
                    items-center
                    justify-between
                    border-t
                    border-border
                    pt-5
                  "
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    delay: 0.4,
                    duration: 0.35,
                  }}
                >
                  <span className="label text-muted-foreground">
                    DUBAI · UAE
                  </span>

                  <span className="label text-primary">
                    360° CREATIVE
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
