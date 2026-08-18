"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { IMG } from "@/lib/images";

const EASE = [0.16, 1, 0.3, 1];

// Each capability carries a TAG — its actual craft domain (fabrication,
// print, culinary...), not a sequence position. The rail previously numbered
// these 01-06, which implies an order none of them actually have (you don't
// need Production before Catering) — exactly the kind of numbering the
// frontend-design skill flags as decoration standing in for information.
// The tag is real information instead: what kind of work this is.
const CAPABILITIES = [
  {
    tag: { en: "Fabrication", ar: "تصنيع" },
    title: { en: "Production", ar: "الإنتاج" },
    copy: {
      en: "Exhibition stands, fabrication, installations and branded environments.",
      ar: "أجنحة المعارض، التصنيع، التركيبات والبيئات المُموَّهة بالعلامة.",
    },
    img: IMG.stand,
  },
  {
    tag: { en: "Print & Finish", ar: "طباعة وتشطيب" },
    title: { en: "Gift Items", ar: "الهدايا" },
    copy: {
      en: "Corporate gifting produced to brand standard — screen printing, UV, foiling, debossing, laser engraving.",
      ar: "هدايا الشركات وفق معايير العلامة — طباعة الشاشة، الأشعة فوق البنفسجية، التذهيب، النقش، الحفر بالليزر.",
    },
    img: IMG.gifts,
  },
  {
    tag: { en: "On-Site Capture", ar: "توثيق ميداني" },
    title: {
      en: "Photography & Videography",
      ar: "التصوير الفوتوغرافي والمرئي",
    },
    copy: {
      en: "Food styling, product and full event coverage.",
      ar: "تنسيق الطعام، التصوير المنتجي وتغطية كاملة للفعاليات.",
    },
    img: IMG.table,
  },
  {
    tag: { en: "Culinary", ar: "فن الطهي" },
    title: { en: "Catering", ar: "التموين" },
    copy: {
      en: "Private service, majlis, corporate hospitality, signature desserts, beverages and table styling.",
      ar: "خدمة خاصة، مجالس، ضيافة مؤسسية، حلويات مميزة، مشروبات وتنسيق الطاولات.",
    },
    img: IMG.majlis,
  },
  {
    tag: { en: "Live Performance", ar: "أداء حي" },
    title: { en: "Entertainment", ar: "الترفيه" },
    copy: {
      en: "Arabic singers, oud players, live entertainment, sound and lighting.",
      ar: "مطربون عرب، عازفو عود، ترفيه مباشر، صوت وإضاءة.",
    },
    img: IMG.oud,
  },
  {
    tag: { en: "Technical Production", ar: "إنتاج تقني" },
    title: { en: "Sound & Lighting", ar: "الصوت والإضاءة" },
    copy: {
      en: "Stage design, rigging, DJ and live sound.",
      ar: "تصميم المنصات، التركيب، الـ DJ والصوت المباشر.",
    },
    img: IMG.lighting,
  },
];

/* ---------------------------------------------------------
   Capability Card
--------------------------------------------------------- */

function CapabilityCard({ item, index, lang, progress, reducedMotion }) {
  /*
   * Each card gets a different progress window.
   * This creates a subtle "focus" effect as cards approach
   * the center of the viewport.
   */
  const start = index / CAPABILITIES.length;
  const end = (index + 1) / CAPABILITIES.length;

  const scale = useTransform(
    progress,
    reducedMotion
      ? [0, 1]
      : [Math.max(0, start - 0.18), start, end, Math.min(1, end + 0.18)],
    reducedMotion ? [1, 1] : [0.94, 1, 1, 0.94],
  );

  const opacity = useTransform(
    progress,
    reducedMotion
      ? [0, 1]
      : [Math.max(0, start - 0.18), start, end, Math.min(1, end + 0.18)],
    reducedMotion ? [1, 1] : [0.55, 1, 1, 0.55],
  );

  const y = useTransform(
    progress,
    reducedMotion
      ? [0, 1]
      : [Math.max(0, start - 0.18), start, end, Math.min(1, end + 0.18)],
    reducedMotion ? [0, 0] : [18, 0, 0, 18],
  );

  return (
    <motion.article
      style={{
        scale,
        opacity,
        y,
      }}
      className="
        group
        relative
        w-[82vw]
        max-w-[25rem]
        shrink-0
        snap-start
        overflow-hidden
        border
        border-border
        bg-background
        sm:w-[24rem]
        md:w-[26rem]
      "
      role="listitem"
    >
      {/* Image — capped well below the old h-[20rem] (320px): combined with
          the header block above, that made the card taller than what's
          left of the viewport after the fixed header on shorter screens
          (confirmed at 1280x720), forcing the card's own content to be
          clipped by the bottom of the screen. */}
      <div className="relative h-44 overflow-hidden sm:h-48 md:h-52">
        <motion.div
          className="absolute inset-0"
          whileHover={reducedMotion ? undefined : { scale: 1.045 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Image
            src={item.img}
            alt={item.title[lang]}
            fill
            sizes="(min-width: 768px) 26rem, 82vw"
            className="
              object-cover
              grayscale-[12%]
              transition-[filter]
              duration-700
              group-hover:grayscale-0
            "
          />
        </motion.div>

        {/* Editorial image treatment */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/5 to-transparent" />

        {/* Process tag — the craft domain this capability belongs to, not a
            position in a sequence (there's no order to fabrication vs.
            catering). Styled like a workshop docket stamp: a bordered plate
            sitting on the image, not a decorative number. */}
        <div className="absolute left-5 top-5">
          <span className="inline-block border border-primary/50 bg-background/70 px-2.5 py-1.5 label text-primary backdrop-blur-sm">
            {item.tag[lang]}
          </span>
        </div>

        {/* Hover arrow */}
        <motion.div
          initial={{ opacity: 0, x: -8, y: 8 }}
          whileHover={{ opacity: 1, x: 0, y: 0 }}
          className="absolute right-5 top-5"
        >
          <ArrowUpRight size={20} strokeWidth={1.3} className="text-primary" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative p-5 md:p-6">
        <div className="flex items-start justify-between gap-5">
          <h3 className="max-w-[90%] font-display text-2xl uppercase leading-[0.95] tracking-tight md:text-3xl">
            {item.title[lang]}
          </h3>
        </div>

        <motion.div initial={false} className="mt-4 overflow-hidden">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {item.copy[lang]}
          </p>
        </motion.div>

        {/* Bottom accent — the same tag, restated quietly rather than a
            "0N of 6" that would read as a countdown. */}
        <div className="mt-5 flex items-center justify-between">
          <span className="label text-muted-foreground">{item.tag[lang]}</span>

          <span className="h-px flex-1 mx-4 bg-border transition-colors duration-500 group-hover:bg-primary/60" />

          <ArrowRight
            size={16}
            strokeWidth={1.2}
            className="text-primary rtl-flip transition-transform duration-500 group-hover:translate-x-1"
          />
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------------------------------------------------
   Main Section
--------------------------------------------------------- */

export default function Capabilities() {
  const { t, lang, dir } = useLang();
  const reducedMotion = useReducedMotion();

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.45,
  });

  // Subtle heading drift while the section passes through the viewport —
  // position only, not opacity. The section is only min-h-[100dvh], so the
  // header and the card rail are visible together in the same screen; a
  // 0.5-opacity fade at the scroll edges (the previous version) meant the
  // eyebrow label was reliably faint/unreadable exactly while it was being
  // looked at, not just briefly at the very top/bottom of a taller section.
  const headingY = useTransform(
    progress,
    [0, 1],
    reducedMotion ? [0, 0] : [18, -18],
  );

  return (
    <section
      data-chapter="craft"
      aria-label={t.capabilities.heading}
      className=" relative min-h-[100dvh] py-10 overflow-hidden border-b border-border bg-card/40 "
    >
      {/* ---------------------------------------------------
          Header
      --------------------------------------------------- */}

      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <motion.div
          style={{ y: headingY }}
          className="flex items-end justify-between gap-8"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />

              <span className="label text-primary">{t.capabilities.eyebrow}</span>
            </div>

            <h2 className="text-balance font-display text-4xl uppercase leading-[0.9] tracking-tight md:text-6xl lg:text-7xl">
              {t.capabilities.heading}
            </h2>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <p className="label text-muted-foreground">
              {t.capabilities.scrollHint}
            </p>

            <motion.div
              animate={
                reducedMotion
                  ? undefined
                  : {
                      x: dir === "rtl" ? [-3, 3, -3] : [3, -3, 3],
                    }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight
                size={15}
                strokeWidth={1.3}
                className="rtl-flip text-primary"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ---------------------------------------------------
          Capability Rail
      --------------------------------------------------- */}

      <div
        className="
          mt-8
          flex
          snap-x
          snap-mandatory
          gap-5
          overflow-x-auto
          px-5
          pb-8
          pt-2
          [scrollbar-width:none]
          md:mt-10
          md:gap-6
          md:px-10
        "
        role="list"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {CAPABILITIES.map((item, index) => (
          <CapabilityCard
            key={item.title.en}
            item={item}
            index={index}
            lang={lang}
            progress={progress}
            reducedMotion={reducedMotion}
          />
        ))}

        {/* End spacer */}
        <div aria-hidden="true" className="w-1 shrink-0 md:w-4" />
      </div>

      {/* ---------------------------------------------------
          Progress indicator
      --------------------------------------------------- */}

      <div className="mx-auto mt-2 max-w-[90rem] px-5 md:px-10">
        <div className="relative h-px bg-border">
          <motion.div
            style={{
              scaleX: progress,
              transformOrigin: dir === "rtl" ? "right" : "left",
            }}
            className="absolute inset-y-0 left-0 right-0 origin-left bg-primary rtl-flip"
          />
        </div>
      </div>
    </section>
  );
}
