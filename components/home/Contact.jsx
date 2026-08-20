'use client';

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { IMG } from "@/lib/images";

/* ---------- CONTACT — cinematic closing shot ---------- */

const EMAIL = "info@notime-hub.com";

export default function Contact() {
  const { t } = useLang();
  const rm = useReducedMotion();
  const ref = useRef(null);

  // Pre-filled subject so clicking the email actually opens a message ready
  // to send, not a blank compose window — subject follows the active locale.
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(t.finalCta.mailSubject)}`;

  const CONTACTS = [
    {
      type: "phone",
      label: "Call us",
      value: "+971 54 453 4333",
      href: "https://wa.me/971544534333",
      Icon: Phone,
      external: true,
    },
    {
      type: "email",
      label: "Email us",
      value: EMAIL,
      href:
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(EMAIL)}` +
      `&su=${encodeURIComponent(t.finalCta.mailSubject)}`,
    external: true,
      Icon: Mail,
    },
    {
      type: "instagram",
      label: "Instagram",
      value: "@notimehub",
      href: "https://www.instagram.com/notimehub/",
      Icon: Instagram,
      external: true,
    },
  ];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
    // See AiMotion.jsx's comment on this option — defers measurement past
    // the layout-effect phase, fixing a real "ref not yet hydrated" console
    // warning observed on first load.
    layoutEffect: false,
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.5,
  });

  // This section isn't pinned — offset ["start end", "end end"] maps its
  // own full min-h-[120vh] height to progress 0..1 as it scrolls through a
  // 100vh viewport. The previous thresholds (title 0.1-0.4, CTA 0.4-0.6,
  // contacts 0.48-0.68) spread the reveal across more than half that
  // distance, which meant nothing but the bare background was visible for
  // the first ~12vh the section was on screen, then a slow drawn-out
  // build-up — the same "empty scroll" pattern fixed elsewhere this
  // session. Front-loaded into a short window near the start instead, so
  // the section reads as complete almost as soon as it's on screen, then
  // simply holds through the rest of its own scroll-through.

  /* ------------------------------------------------------------------------ */
  /* BACKGROUND                                                                */
  /* ------------------------------------------------------------------------ */

  const bgScale = useTransform(
    p,
    [0, 1],
    rm ? [1, 1] : [1.3, 1],
  );

  const bgOpacity = useTransform(
    p,
    rm ? [0, 1] : [0, 0.2],
    rm ? [0.45, 0.45] : [0, 0.45],
  );

  /* ------------------------------------------------------------------------ */
  /* TITLE                                                                     */
  /* ------------------------------------------------------------------------ */

  const titleScale = useTransform(
    p,
    rm ? [0, 1] : [0, 0.12],
    rm ? [1, 1] : [0.85, 1],
  );

  const titleOpacity = useTransform(
    p,
    rm ? [0, 1] : [0, 0.06],
    rm ? [1, 1] : [0, 1],
  );

  /* ------------------------------------------------------------------------ */
  /* CTA                                                                       */
  /* ------------------------------------------------------------------------ */

  const ctaOpacity = useTransform(
    p,
    rm ? [0, 1] : [0.08, 0.14],
    rm ? [1, 1] : [0, 1],
  );

  const ctaY = useTransform(
    p,
    rm ? [0, 1] : [0.08, 0.14],
    rm ? ["0px", "0px"] : ["30px", "0px"],
  );

  /* ------------------------------------------------------------------------ */
  /* CONTACT DETAILS                                                           */
  /* ------------------------------------------------------------------------ */

  const contactsOpacity = useTransform(
    p,
    rm ? [0, 1] : [0.16, 0.24],
    rm ? [1, 1] : [0, 1],
  );

  const contactsY = useTransform(
    p,
    rm ? [0, 1] : [0.16, 0.24],
    rm ? ["0px", "0px"] : ["24px", "0px"],
  );

  return (
    <section
      id="contact"
      ref={ref}
      data-chapter="action"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden border-t border-border py-20"
    >
      {/* ================================================================== */}
      {/* BACKGROUND                                                         */}
      {/* ================================================================== */}

      <motion.div
        style={{
          scale: bgScale,
          opacity: bgOpacity,
        }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <Image
          src={IMG.heroPortal}
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
        />

        {/* Main readability overlay */}
        <div className="absolute inset-0 bg-background/60" />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_70%)]" />

        {/* Subtle bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
      </motion.div>

      {/* ================================================================== */}
      {/* CONTENT                                                            */}
      {/* ================================================================== */}

      <div className="relative z-10 flex w-full max-w-[90rem] flex-col items-center px-5 py-28 text-center md:px-10 md:py-32">
        {/* Eyebrow */}
        <motion.p
          style={{ opacity: titleOpacity }}
          className="label text-muted-foreground"
        >
          {t.finalCta.label}
        </motion.p>

        {/* Main statement */}
        <motion.h2
          style={{
            scale: titleScale,
            opacity: titleOpacity,
          }}
          className="mt-8 max-w-6xl font-display text-[15vw] uppercase leading-[0.8] tracking-tight text-foreground md:text-[10vw]"
        >
          {t.finalCta.statement}
        </motion.h2>

        {/* ================================================================== */}
        {/* PRIMARY CTA                                                        */}
        {/* ================================================================== */}

        <motion.a
          href={mailHref}
          style={{
            opacity: ctaOpacity,
            y: ctaY,
          }}
          className="group mt-14 inline-flex items-center gap-4 bg-primary px-9 py-5 label text-primary-foreground transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,132,61,0.25)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
        >
          <span>{t.finalCta.cta}</span>

          <ArrowRight
            size={16}
            strokeWidth={1.6}
            className="rtl-flip transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.a>

        {/* ================================================================== */}
        {/* CONTACT CHANNELS                                                   */}
        {/* ================================================================== */}

        <motion.div
          style={{
            opacity: contactsOpacity,
            y: contactsY,
          }}
          className="mt-16 w-full max-w-4xl"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-border" />

            <span className="label text-muted-foreground">
              CONTACT
            </span>

            <span className="h-px w-8 bg-border" />
          </div>

          <div className="grid grid-cols-1 border border-border/70 bg-background/20 backdrop-blur-md sm:grid-cols-3">
            {CONTACTS.map(({ type, label, value, href, Icon, external }, index) => (
              <a
                key={type}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className={`
                  group flex min-h-28 items-center gap-4 px-5 py-5 text-start
                  transition-colors duration-300
                  hover:bg-background/30
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-primary focus-visible:outline-offset-[-2px]
                  sm:px-6
                  ${
                    index !== CONTACTS.length - 1
                      ? "border-b border-border/70 sm:border-b-0 sm:border-e"
                      : ""
                  }
                `}
              >
                {/* Icon */}
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-border/80 bg-background/30 text-primary transition-colors duration-300 group-hover:border-primary/50 group-hover:bg-primary/10">
                  <Icon
                    size={17}
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                </span>

                {/* Text */}
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </span>

                  <span className="mt-1 block truncate text-sm font-medium tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
                    <bdi dir="ltr">{value}</bdi>
                  </span>
                </span>

                {/* Directional arrow */}
                <ArrowRight
                  size={14}
                  strokeWidth={1.3}
                  className="ms-auto shrink-0 text-muted-foreground transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-primary rtl-flip"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
