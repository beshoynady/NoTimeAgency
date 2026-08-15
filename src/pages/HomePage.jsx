import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";
import Reveal from "../components/Reveal";
import CountUp from "../components/CountUp";
import Seo from "../components/Seo";
import SiteNav, { Wordmark } from "../components/site/SiteNav";
import { useLang } from "../i18n/LanguageContext";

const IMG = {
  hero: "https://images.hostinger.com/763123b6-8c1e-477e-b546-87458c203d12.png",
  gala: "https://images.hostinger.com/31843255-911c-4d34-bd1d-85681536c3e8.png",
  stadium:
    "https://images.hostinger.com/f5d4a4d0-5cf8-4109-9bc9-badffe1763aa.png",
  motion:
    "https://images.hostinger.com/c7c42cf8-8a8f-4bf9-8009-45fadf252246.png",
  table:
    "https://images.hostinger.com/98d44b5e-05a0-4534-b253-300918bb28f2.png",
  award:
    "https://images.hostinger.com/4dfe578b-b04e-423a-9543-117609489bff.png",
  sprinter:
    "https://images.hostinger.com/ac63ef1b-17fc-448b-a6e6-c0edaec30c82.png",
  stand:
    "https://images.hostinger.com/86e23385-b653-4d0a-a947-182b2bbab366.png",
  majlis:
    "https://images.hostinger.com/acbd6790-929d-4267-9602-87a47d883f45.png",
  oud: "https://images.hostinger.com/ce9be3f7-cb58-4a66-8b88-0d1e610255c0.png",
  lighting:
    "https://images.hostinger.com/a9126ed1-4ab9-4fbd-ad9d-0f7c68eeb099.png",
  gifts:
    "https://images.hostinger.com/cb4dbc63-08a3-4cee-a460-51e078423388.png",
  skyline:
    "https://images.hostinger.com/4795e5f0-5af7-4047-9b39-d6fab2f28488.png",
};

const SITE_URL = "https://notime.agency";

// Bilingual per-item data (kept here so images stay paired with copy).
const SERVICES = [
  {
    n: "01",
    title: { en: "Events", ar: "الفعاليات" },
    tags: {
      en: "Concept · Décor · Production · Guest Experience",
      ar: "المفهوم · الديكور · الإنتاج · تجربة الضيوف",
    },
    copy: {
      en: "Full event delivery — from tournament branding and on-ground production to award ceremonies and sponsor activation.",
      ar: "تنفيذ متكامل للفعاليات — من هوية البطولات والإنتاج الميداني إلى حفل التكريم وتفعيل الرعاة.",
    },
    img: IMG.hero,
  },
  {
    n: "02",
    title: {
      en: "Private & Luxury Celebrations",
      ar: "الاحتفالات الخاصة والفاخرة",
    },
    tags: {
      en: "Baby Receptions · Showers · Intimate Gatherings",
      ar: "استقبالات المواليد · حفلات القهوة · المناسبات الحميمة",
    },
    copy: {
      en: "Concept decks and theming, décor and floral direction, giveaways and keepsakes, photobooths and full on-day production.",
      ar: "مفاهيم وهوية، توجيه الديكور والزهور، الهدايا والتذكارات، الكبائن المصوّرة، وإنتاج اليوم الكامل.",
    },
    img: IMG.gala,
  },
  {
    n: "03",
    title: { en: "Marketing", ar: "التسويق" },
    tags: {
      en: "Campaigns · Government & Enterprise",
      ar: "الحملات · الحكومي والمؤسسي",
    },
    copy: {
      en: "Brand and campaign strategy, web platforms and portals, performance and paid media, analytics and reporting.",
      ar: "استراتيجية العلامة والحملات، المنصات والبوابات الإلكترونية، الإعلام المدفوع والأداء، التحليلات والتقارير.",
    },
    img: IMG.award,
  },
  {
    n: "04",
    title: { en: "Social Media", ar: "السوشيال ميديا" },
    tags: {
      en: "Content Systems · Design · Community · Growth",
      ar: "أنظمة المحتوى · التصميم · المجتمع · النمو",
    },
    copy: {
      en: "Content strategy and monthly calendars, daily bilingual publishing, on-ground coverage, paid campaigns and community growth.",
      ar: "استراتيجية المحتوى والتقويمات الشهرية، النشر اليومي ثنائي اللغة، التغطية الميدانية، الحملات المدفوعة ونمو المجتمع.",
    },
    img: IMG.sprinter,
  },
  {
    n: "05",
    title: { en: "Digital Platforms", ar: "المنصات الرقمية" },
    tags: {
      en: "Websites · Mobile Apps · CMS & Dashboards",
      ar: "المواقع · التطبيقات · أنظمة الإدارة ولوحات التحكم",
    },
    copy: {
      en: "UX/UI and design systems, development, CMS and analytics, Arabic/English RTL–LTR builds, SEO, performance and API integrations.",
      ar: "تجربة وواجهة المستخدم وأنظمة التصميم، التطوير، أنظمة الإدارة والتحليلات، بنى عربية/إنجليزية RTL–LTR، SEO، الأداء وتكامل الـ API.",
    },
    img: IMG.stand,
  },
  {
    n: "06",
    title: { en: "Public Relations", ar: "العلاقات العامة" },
    tags: {
      en: "Exhibitions · Media Relations · Reputation",
      ar: "المعارض · العلاقات الإعلامية · السمعة",
    },
    copy: {
      en: "Stand design, build and full on-site PR management across regional and international exhibitions.",
      ar: "تصميم وتنفيذ الأجنحة وإدارة كاملة للعلاقات العامة في الموقع عبر المعارض الإقليمية والدولية.",
    },
    img: IMG.majlis,
  },
];

const CAPABILITIES = [
  {
    title: { en: "Production", ar: "الإنتاج" },
    copy: {
      en: "Exhibition stands, fabrication, installations and branded environments.",
      ar: "أجنحة المعارض، التصنيع، التركيبات والبيئات المُموَّهة بالعلامة.",
    },
    img: IMG.stand,
  },
  {
    title: { en: "Gift Items", ar: "الهدايا" },
    copy: {
      en: "Corporate gifting produced to brand standard — screen printing, UV, foiling, debossing, laser engraving.",
      ar: "هدايا الشركات وفق معايير العلامة — طباعة الشاشة، الأشعة فوق البنفسجية، التذهيب، النقش، الحفر بالليزر.",
    },
    img: IMG.gifts,
  },
  {
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
    title: { en: "Catering", ar: "التموين" },
    copy: {
      en: "Private service, majlis, corporate hospitality, signature desserts, beverages and table styling.",
      ar: "خدمة خاصة، مجالس، ضيافة مؤسسية، حلويات مميزة، مشروبات وتنسيق الطاولات.",
    },
    img: IMG.majlis,
  },
  {
    title: { en: "Entertainment", ar: "الترفيه" },
    copy: {
      en: "Arabic singers, oud players, live entertainment, sound and lighting.",
      ar: "مطربون عرب، عازفو عود، ترفيه مباشر، صوت وإضاءة.",
    },
    img: IMG.oud,
  },
  {
    title: { en: "Sound & Lighting", ar: "الصوت والإضاءة" },
    copy: {
      en: "Stage design, rigging, DJ and live sound.",
      ar: "تصميم المنصات، التركيب، الـ DJ والصوت المباشر.",
    },
    img: IMG.lighting,
  },
];

const TALENT = [
  {
    name: "Lojain Omran",
    role: { en: "Media Personality — KSA", ar: "إعلامية — السعودية" },
  },
  {
    name: "Tareq Al Harbi",
    role: { en: "Content Creator — KSA", ar: "صانع محتوى — السعودية" },
  },
  {
    name: "Afro By Sara",
    role: {
      en: "Lifestyle Content Creator — UAE",
      ar: "صانعة محتوى — الإمارات",
    },
  },
  {
    name: "Hamoud Alfayez",
    role: { en: "Media Personality — UAE", ar: "إعلامي — الإمارات" },
  },
  {
    name: "Fatima Almomen",
    role: {
      en: "Lifestyle Content Creator — UAE",
      ar: "صانعة محتوى — الإمارات",
    },
  },
  {
    name: "Azza Al Mughairy",
    role: { en: "Media Personality — UAE", ar: "إعلامية — الإمارات" },
  },
  {
    name: "Mohanad Alwadiya",
    role: { en: "Real Estate — UAE", ar: "عقارات — الإمارات" },
  },
  {
    name: "Saoud Alkaabi",
    role: { en: "Media Personality — UAE", ar: "إعلامي — الإمارات" },
  },
  {
    name: "Sara Al Madani",
    role: { en: "Entrepreneur — UAE", ar: "رائدة أعمال — الإمارات" },
  },
  {
    name: "Adil Taouil",
    role: { en: "Content Creator — Morocco", ar: "صانع محتوى — المغرب" },
  },
  {
    name: "Kris Fade",
    role: { en: "Media Personality — UAE", ar: "إعلامي — الإمارات" },
  },
  {
    name: "Aseel Omran",
    role: { en: "Actress/Singer — KSA", ar: "ممثلة/مغنية — السعودية" },
  },
  {
    name: "Khalid Al Ameri",
    role: { en: "Content Creator — UAE", ar: "صانع محتوى — الإمارات" },
  },
  {
    name: "Salama Mohamed",
    role: { en: "Entrepreneur — UAE", ar: "رائدة أعمال — الإمارات" },
  },
  { name: "Bader Najeeb", role: { en: "Chef — UAE", ar: "طاهٍ — الإمارات" } },
  {
    name: "Alanoud Badr",
    role: { en: "TV Presenter — UAE", ar: "مذيعة — الإمارات" },
  },
  {
    name: "Danyah Shafei",
    role: { en: "TV Presenter — UAE/KSA", ar: "مذيعة — الإمارات/السعودية" },
  },
  { name: "Mustapha Al Agha", role: { en: "TV Presenter", ar: "مذيع" } },
  {
    name: "Rola Adel",
    role: {
      en: "Media Personality — UAE/KSA",
      ar: "إعلامية — الإمارات/السعودية",
    },
  },
  {
    name: "Taim Al Falasi",
    role: { en: "Content Creator — UAE", ar: "صانعة محتوى — الإمارات" },
  },
];

const EASE = [0.16, 1, 0.3, 1];

function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div
      className="overflow-hidden border-y border-border py-5"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {row.map((txt, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="font-display text-3xl uppercase tracking-tight text-foreground/80 md:text-5xl">
              {txt}
            </span>
            <span className="mx-8 text-primary md:mx-12">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- CINEMATIC PINNED HERO ---------- */
function CinematicHero() {
  const { t, dir } = useLang();
  const rm = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.4,
  });

  const bgScale = useTransform(p, [0, 1], rm ? [1, 1] : [1.05, 1.5]);
  const bgY = useTransform(p, [0, 1], rm ? ["0%", "0%"] : ["0%", "12%"]);
  const bgOpacity = useTransform(
    p,
    rm ? [0, 1] : [0, 0.7, 1],
    rm ? [1, 1] : [1, 0.7, 0.25],
  );

  const noTimeScale = useTransform(
    p,
    [0, 0.45, 1],
    rm ? [1, 1, 1] : [1, 1.35, 2.1],
  );
  const noTimeY = useTransform(
    p,
    [0, 0.45, 1],
    rm ? ["0%", "0%", "0%"] : ["0%", "-6%", "-22%"],
  );
  const noTimeOpacity = useTransform(
    p,
    rm ? [0, 1] : [0, 0.5, 0.72],
    rm ? [1, 1] : [1, 1, 0],
  );
  const noTimeLetterSpacing = useTransform(
    p,
    [0, 0.5],
    rm ? ["0em", "0em"] : ["0em", "0.06em"],
  );

  const subY = useTransform(
    p,
    rm ? [0, 1] : [0.1, 0.4, 0.7],
    rm ? ["0%", "0%"] : ["40%", "0%", "-30%"],
  );
  const subOpacity = useTransform(
    p,
    rm ? [0, 1] : [0.1, 0.28, 0.6, 0.78],
    rm ? [0, 0] : [0, 1, 1, 0],
  );

  const bridgeY = useTransform(
    p,
    rm ? [0, 1] : [0.55, 0.8, 1],
    rm ? ["0%", "0%"] : ["60%", "0%", "-18%"],
  );
  const bridgeOpacity = useTransform(
    p,
    rm ? [0, 1] : [0.55, 0.72, 0.95],
    rm ? [0, 0] : [0, 1, 0],
  );

  const cueOpacity = useTransform(
    p,
    rm ? [0, 1] : [0, 0.12, 0.25],
    rm ? [1, 1] : [1, 1, 0],
  );
  const ctaOpacity = useTransform(
    p,
    rm ? [0, 1] : [0, 0.18, 0.3],
    rm ? [1, 1] : [1, 1, 0],
  );
  const vignette = useTransform(p, [0, 1], rm ? [0.6, 0.6] : [0.55, 0.92]);

  return (
    <section
      ref={ref}
      className={rm ? "relative min-h-[100dvh]" : "relative h-[260vh]"}
    >
      <div
        className={
          rm
            ? "relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
            : "sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden"
        }
      >
        {/* Background */}
        <motion.div
          style={{ scale: bgScale, y: bgY, opacity: bgOpacity }}
          className="absolute inset-0"
        >
          <img src={IMG.hero} alt="" className="h-full w-full object-cover" />
          <motion.div
            style={{ opacity: vignette }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_75%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />
        </motion.div>

        {/* Top label */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute left-0 right-0 top-[88px] z-20 mx-auto flex max-w-[90rem] items-center justify-between px-5 md:px-10"
        >
          <p className="label text-muted-foreground">{t.hero.brandLabel}</p>
          <p className="label hidden text-muted-foreground md:block">
            {t.hero.agencyLabel}
          </p>
        </motion.div>

        {/* NO TIME — oversized typographic motion */}
        <motion.h1
          style={{
            scale: noTimeScale,
            y: noTimeY,
            opacity: noTimeOpacity,
            letterSpacing: noTimeLetterSpacing,
          }}
          className="relative z-10 select-none px-4 text-center font-display uppercase leading-[0.78] tracking-tight text-foreground will-change-transform"
        >
          <span className="block text-[20vw] md:text-[18vw]">NO TIME</span>
        </motion.h1>

        {/* Secondary statement */}
        <motion.div
          style={{ y: subY, opacity: subOpacity }}
          className="absolute z-10 px-5 text-center"
        >
          <p className="font-display text-[10vw] uppercase leading-none tracking-tight text-primary md:text-[7vw]">
            {t.hero.statement}
          </p>
        </motion.div>

        {/* Bridge brand statement */}
        <motion.div
          style={{ y: bridgeY, opacity: bridgeOpacity }}
          className="absolute z-10 mx-auto max-w-3xl px-6 text-center"
        >
          <p className="font-editorial text-2xl leading-snug text-foreground/90 md:text-4xl md:leading-tight">
            {t.hero.bridge}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          style={{ opacity: ctaOpacity }}
          className="absolute bottom-12 left-0 right-0 z-20 mx-auto flex max-w-[90rem] items-end justify-between px-5 md:px-10"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 border border-primary/60 px-7 py-4 label text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            {t.hero.cta}
            <ArrowRight
              size={16}
              strokeWidth={1.4}
              className="rtl-flip transition-transform group-hover:translate-x-1"
            />
          </a>
          <motion.div
            style={{ opacity: cueOpacity }}
            className="flex items-center gap-3 label text-muted-foreground"
          >
            {t.hero.scrollCue}
            <motion.span
              animate={rm ? {} : { y: [0, 6, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown size={16} strokeWidth={1.4} />
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- single cycle step (hooks-safe) ---------- */
function CycleStep({ c, i, p, rm }) {
  const start = 0.2 + i * 0.16;
  const end = start + 0.2;
  const y = useTransform(
    p,
    rm ? [0, 1] : [start, start + 0.06, end],
    rm ? ["0%", "0%"] : ["80%", "0%", "-30%"],
  );
  const opacity = useTransform(
    p,
    rm ? [0, 1] : [start, start + 0.05, end - 0.04, end],
    rm ? [1, 1] : [0, 1, 1, 0],
  );
  const xLine = useTransform(
    p,
    rm ? [0, 1] : [start, start + 0.08],
    rm ? ["100%", "100%"] : ["0%", "100%"],
  );
  return (
    <motion.div
      style={{ y, opacity }}
      className="border-t border-border py-8 md:py-12"
    >
      <div className="flex items-baseline gap-6">
        <span className="label text-primary">{`0${i + 1}`}</span>
        <h3 className="font-display text-[12vw] uppercase leading-none tracking-tight text-foreground md:text-[7vw]">
          {c.step}
        </h3>
      </div>
      <div className="relative mt-4 h-px overflow-hidden bg-border">
        <motion.div style={{ width: xLine }} className="h-full bg-primary" />
      </div>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        {c.copy}
      </p>
    </motion.div>
  );
}

/* ---------- single orbiting capability label (hooks-safe) ---------- */
function CapLabel({ cap, i, p, rm, count }) {
  const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
  const R = 180;
  const cx = Math.cos(angle) * R;
  const cy = Math.sin(angle) * R;
  const start = 0.32 + i * 0.04;
  const op = useTransform(
    p,
    rm ? [0, 1] : [start, start + 0.05, 0.85, 0.97],
    rm ? [1, 1] : [0, 1, 1, 0],
  );
  const yOff = useTransform(
    p,
    rm ? [0, 1] : [start, start + 0.08],
    rm ? [0, 0] : [20, 0],
  );
  const y = useTransform(yOff, (v) => cy + v);
  return (
    <motion.span
      style={{ opacity: op, x: cx, y }}
      className="absolute z-20 hidden whitespace-nowrap border border-border bg-background/80 px-3 py-2 label text-foreground backdrop-blur md:block"
    >
      {cap}
    </motion.span>
  );
}

/* ---------- BRAND STORY — scroll sequence STRATEGY → DELIVERY ---------- */
function BrandStory() {
  const { t } = useLang();
  const rm = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.5,
  });

  const headingY = useTransform(p, [0, 1], rm ? ["0%", "0%"] : ["20%", "-20%"]);
  const headingOpacity = useTransform(
    p,
    rm ? [0, 1] : [0, 0.15, 0.85, 1],
    rm ? [1, 1] : [0, 1, 1, 0],
  );

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto max-w-[72rem] px-5 py-32 md:px-10 md:py-48"
    >
      <motion.div style={{ y: headingY, opacity: headingOpacity }}>
        <p className="label text-primary">{t.brandStory.label}</p>
        <h2 className="mt-10 font-editorial text-[7vw] leading-[1.2] tracking-tight md:text-[3.4rem] md:leading-[1.15]">
          {t.brandStory.statement}
          <span className="text-primary">
            {t.brandStory.statementHighlight}
          </span>
        </h2>
      </motion.div>

      <div className="mt-28 md:mt-40">
        {t.brandStory.cycle.map((c, i) => (
          <CycleStep key={c.step} c={c} i={i} p={p} rm={rm} />
        ))}
      </div>
    </section>
  );
}

/* ---------- 360° SCROLL-DRIVEN SCENE ---------- */
function Scene360() {
  const { t } = useLang();
  const rm = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.5,
  });

  const rotate = useTransform(
    p,
    rm ? [0, 1] : [0.1, 0.9],
    rm ? [0, 0] : [0, 360],
  );
  const scale = useTransform(
    p,
    rm ? [0, 1] : [0.1, 0.5, 0.9],
    rm ? [1, 1] : [0.7, 1, 1.25],
  );
  const ringOpacity = useTransform(
    p,
    rm ? [0, 1] : [0.15, 0.35, 0.8, 0.95],
    rm ? [1, 1] : [0, 1, 1, 0.3],
  );
  const labelOpacity = useTransform(
    p,
    rm ? [0, 1] : [0.3, 0.45, 0.8, 0.95],
    rm ? [1, 1] : [0, 1, 1, 0],
  );

  const caps = t.scene360.caps;

  return (
    <section
      ref={ref}
      className={
        rm
          ? "relative border-y border-border bg-card/30 py-24 md:py-32"
          : "relative h-[220vh] border-y border-border bg-card/30"
      }
    >
      <div
        className={
          rm
            ? "relative grid place-items-center py-10"
            : "sticky top-0 grid h-[100dvh] place-items-center overflow-hidden"
        }
      >
        <div className="relative grid place-items-center">
          <motion.div
            style={{ rotate, opacity: ringOpacity }}
            className="absolute h-[78vw] w-[78vw] max-h-[42rem] max-w-[42rem] rounded-full border border-primary/30 md:h-[44rem] md:w-[44rem]"
          />
          <motion.div
            style={{
              rotate: useTransform(
                p,
                rm ? [0, 1] : [0.1, 0.9],
                rm ? [0, 0] : [0, -220],
              ),
              opacity: ringOpacity,
            }}
            className="absolute h-[58vw] w-[58vw] max-h-[32rem] max-w-[32rem] rounded-full border border-border md:h-[34rem] md:w-[34rem]"
          />
          <motion.div
            style={{
              rotate: useTransform(
                p,
                rm ? [0, 1] : [0.1, 0.9],
                rm ? [0, 0] : [0, 140],
              ),
              opacity: ringOpacity,
            }}
            className="absolute h-[40vw] w-[40vw] max-h-[22rem] max-w-[22rem] rounded-full border border-primary/20 md:h-[24rem] md:w-[24rem]"
          />

          <motion.div style={{ scale }} className="relative z-10 text-center">
            <p className="font-display text-[34vw] leading-none tracking-tighter text-primary md:text-[22rem]">
              360°
            </p>
            <p className="label -mt-2 text-muted-foreground">
              {t.scene360.integrated}
            </p>
          </motion.div>

          {caps.map((cap, i) => (
            <CapLabel
              key={cap}
              cap={cap}
              i={i}
              p={p}
              rm={rm}
              count={caps.length}
            />
          ))}
        </div>

        <motion.p
          style={{ opacity: labelOpacity }}
          className={
            rm
              ? "relative mt-10 max-w-xl px-6 text-center text-sm leading-relaxed text-muted-foreground"
              : "absolute bottom-16 left-0 right-0 mx-auto max-w-xl px-6 text-center text-sm leading-relaxed text-muted-foreground"
          }
        >
          {t.scene360.copy}
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- SERVICES — interactive editorial navigator ---------- */
function ServicesNavigator() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const activeService = SERVICES[active];
  const L = (o) => o[lang];

  return (
    <section
      id="services"
      className="relative mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-36"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="font-display text-5xl uppercase leading-none tracking-tight md:text-8xl">
          {t.services.heading}
        </h2>
        <p className="label text-muted-foreground">
          <span className="md:hidden">{t.services.tapHint}</span>
          <span className="hidden md:inline">{t.services.hoverHint}</span>
        </p>
      </div>

      {/* Mobile preview */}
      <div className="mt-10 aspect-[16/9] overflow-hidden border border-border lg:hidden">
        <img
          src={activeService.img}
          alt={L(activeService.title)}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:mt-14">
        {/* Navigator list */}
        <div className="lg:col-span-7">
          <div className="border-t border-border">
            {SERVICES.map((s, i) => (
              <button
                key={s.n}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                aria-label={L(s.title)}
                className="group block w-full border-b border-border/70 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[-6px] md:py-9"
              >
                <div className="grid grid-cols-1 items-baseline gap-2 md:grid-cols-12 md:gap-6">
                  <span className="label col-span-1 text-primary">{s.n}</span>
                  <h3
                    className={`col-span-7 font-display uppercase leading-none tracking-tight transition-all duration-500 ${
                      active === i
                        ? "text-5xl text-primary md:text-7xl"
                        : "text-3xl text-foreground md:text-5xl"
                    }`}
                  >
                    {L(s.title)}
                  </h3>
                  <p className="label col-span-4 text-muted-foreground">
                    {L(s.tags)}
                  </p>
                </div>
                <AnimatePresence>
                  {active === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="max-w-md overflow-hidden text-sm leading-relaxed text-muted-foreground md:ml-[8.333%]"
                    >
                      {L(s.copy)}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>

        {/* Preview panel */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="sticky top-[100px] aspect-[3/4] overflow-hidden border border-border">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeService.n}
                src={activeService.img}
                alt={L(activeService.title)}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="label text-primary">{activeService.n}</p>
              <p className="mt-2 font-display text-3xl uppercase leading-none tracking-tight text-foreground">
                {L(activeService.title)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CASE STUDY — cinematic scroll ---------- */
function CaseStudy() {
  const { t, lang } = useLang();
  const rm = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.5,
  });

  const imgScale = useTransform(p, [0, 1], rm ? [1, 1] : [1.25, 1]);
  const imgY = useTransform(p, [0, 1], rm ? ["0%", "0%"] : ["8%", "-8%"]);
  const titleY = useTransform(
    p,
    rm ? [0, 1] : [0, 0.5],
    rm ? ["0%", "0%"] : ["40%", "0%"],
  );
  const titleOpacity = useTransform(
    p,
    rm ? [0, 1] : [0, 0.2, 0.7, 1],
    rm ? [1, 1] : [0, 1, 1, 0.3],
  );
  const mockupY = useTransform(
    p,
    rm ? [0, 1] : [0.3, 0.6],
    rm ? ["0%", "0%"] : ["30%", "0%"],
  );
  const mockupOpacity = useTransform(
    p,
    rm ? [0, 1] : [0.3, 0.45],
    rm ? [1, 1] : [0, 1],
  );
  const metricsOpacity = useTransform(
    p,
    rm ? [0, 1] : [0.55, 0.7],
    rm ? [1, 1] : [0, 1],
  );
  const metricsY = useTransform(
    p,
    rm ? [0, 1] : [0.55, 0.7],
    rm ? ["0px", "0px"] : ["40px", "0px"],
  );

  const metrics = [
    {
      aria: `487K ${t.caseStudy.metrics.views}`,
      node: (
        <>
          <CountUp value={487} suffix="K" />
        </>
      ),
      label: t.caseStudy.metrics.views,
    },
    {
      aria: `+37.6K ${t.caseStudy.metrics.followers}`,
      node: (
        <>
          <span aria-hidden="true">+</span>
          <CountUp value={37.6} decimals={1} suffix="K" />
        </>
      ),
      label: t.caseStudy.metrics.followers,
    },
    {
      aria: `271K ${t.caseStudy.metrics.reach}`,
      node: <CountUp value={271} suffix="K" />,
      label: t.caseStudy.metrics.reach,
    },
  ];

  // Reduced-motion: render a clean, non-pinned layout (numbers still accessible).
  if (rm) {
    return (
      <section id="work" className="relative border-y border-border">
        <img
          src={IMG.stadium}
          alt=""
          className="h-[55vh] w-full object-cover"
        />
        <div className="absolute inset-0 h-[55vh] bg-background/55" />
        <div className="relative mx-auto max-w-[90rem] px-5 py-16 md:px-10 md:py-24">
          <p className="label text-primary">{t.caseStudy.label}</p>
          <h2 className="mt-6 max-w-4xl font-display text-[10vw] uppercase leading-[0.85] tracking-tight text-foreground md:text-[6vw]">
            {t.caseStudy.title}
          </h2>
          <p className="label mt-5 text-muted-foreground">
            {t.caseStudy.partner}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="max-w-md text-lg leading-relaxed text-foreground/90">
                {t.caseStudy.description}
              </p>
              <ul className="mt-8 border-t border-border">
                {t.caseStudy.items.map((it) => (
                  <li
                    key={it}
                    className="border-b border-border/70 py-3 text-sm text-muted-foreground"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={IMG.award}
                  alt=""
                  loading="lazy"
                  className="col-span-2 h-48 w-full object-cover md:h-60"
                />
                <img
                  src={IMG.sprinter}
                  alt=""
                  loading="lazy"
                  className="h-40 w-full object-cover md:h-52"
                />
                <img
                  src={IMG.lighting}
                  alt=""
                  loading="lazy"
                  className="h-40 w-full object-cover md:h-52"
                />
              </div>
            </div>
          </div>
          <div className="mt-12">
            <p className="label text-primary">{t.caseStudy.snapshot}</p>
            <div className="mt-5 grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  aria-label={m.aria}
                  className="py-6 sm:px-6 sm:first:pl-0"
                >
                  <p
                    className="font-display text-4xl text-primary md:text-6xl"
                    aria-hidden="true"
                  >
                    {m.node}
                  </p>
                  <p className="label mt-2 text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="work"
      ref={ref}
      className="relative h-[200vh] overflow-hidden border-y border-border"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div
          style={{ scale: imgScale, y: imgY }}
          className="absolute inset-0"
        >
          <img
            src={IMG.stadium}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
        </motion.div>

        <div className="relative z-10 mx-auto flex h-full max-w-[90rem] flex-col justify-center px-5 md:px-10">
          <motion.div style={{ y: titleY, opacity: titleOpacity }}>
            <p className="label text-primary">{t.caseStudy.label}</p>
            <h2 className="mt-6 max-w-4xl font-display text-[12vw] uppercase leading-[0.82] tracking-tight text-foreground md:text-[7vw]">
              {t.caseStudy.title}
            </h2>
            <p className="label mt-5 text-muted-foreground">
              {t.caseStudy.partner}
            </p>
          </motion.div>

          <motion.div
            style={{ y: mockupY, opacity: mockupOpacity }}
            className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <p className="max-w-md text-lg leading-relaxed text-foreground/90">
                {t.caseStudy.description}
              </p>
              <ul className="mt-8 border-t border-border">
                {t.caseStudy.items.map((it) => (
                  <li
                    key={it}
                    className="border-b border-border/70 py-3 text-sm text-muted-foreground"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={IMG.award}
                  alt=""
                  loading="lazy"
                  className="col-span-2 h-48 w-full object-cover md:h-60"
                />
                <img
                  src={IMG.sprinter}
                  alt=""
                  loading="lazy"
                  className="h-40 w-full object-cover md:h-52"
                />
                <img
                  src={IMG.lighting}
                  alt=""
                  loading="lazy"
                  className="h-40 w-full object-cover md:h-52"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: metricsY, opacity: metricsOpacity }}
            className="mt-10"
          >
            <p className="label text-primary">{t.caseStudy.snapshot}</p>
            <div className="mt-5 grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  aria-label={m.aria}
                  className="py-6 sm:px-6 sm:first:pl-0"
                >
                  <p
                    className="font-display text-4xl text-primary md:text-6xl"
                    aria-hidden="true"
                  >
                    {m.node}
                  </p>
                  <p className="label mt-2 text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- AI & MOTION — experimental ---------- */
function AiMotion() {
  const { t, dir } = useLang();
  const rm = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.5,
  });

  // Direction-aware horizontal drift (mirrors in RTL).
  const x = useTransform(
    p,
    [0, 1],
    rm ? ["0%", "0%"] : dir === "rtl" ? ["-12%", "32%"] : ["12%", "-32%"],
  );
  const bgScale = useTransform(p, [0, 1], rm ? [1, 1] : [1.2, 1]);
  const maskClip = useTransform(
    p,
    rm ? [0, 1] : [0.1, 0.6],
    rm
      ? ["inset(0 0% 0 0)", "inset(0 0% 0 0)"]
      : ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-border"
    >
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <img
          src={IMG.motion}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-background/70" />
      </motion.div>

      <div className="relative mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-36">
        <p className="label text-primary">{t.aiMotion.label}</p>
        <div className="mt-6 overflow-hidden">
          <motion.h2
            style={{ clipPath: maskClip }}
            className="font-display text-[14vw] uppercase leading-[0.8] tracking-tighter text-foreground md:text-[9vw]"
          >
            {t.aiMotion.headingPre}{" "}
            <span className="text-primary">{t.aiMotion.headingHighlight}</span>{" "}
            {t.aiMotion.headingPost}
          </motion.h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
          <ul className="border-t border-border">
            {t.aiMotion.items.map((txt, i) => (
              <Reveal key={txt} delay={i * 0.06}>
                <li className="flex items-center justify-between border-b border-border/70 py-5">
                  <span className="font-display text-xl uppercase tracking-wide md:text-2xl">
                    {txt}
                  </span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.2}
                    className="rtl-flip text-primary"
                  />
                </li>
              </Reveal>
            ))}
          </ul>

          <motion.div style={{ x }} className="flex gap-4">
            <img
              src={IMG.lighting}
              alt=""
              loading="lazy"
              className="h-56 w-72 shrink-0 object-cover md:h-72"
            />
            <img
              src={IMG.sprinter}
              alt=""
              loading="lazy"
              className="h-56 w-72 shrink-0 object-cover md:h-72"
            />
            <img
              src={IMG.stand}
              alt=""
              loading="lazy"
              className="h-56 w-72 shrink-0 object-cover md:h-72"
            />
            <img
              src={IMG.gala}
              alt=""
              loading="lazy"
              className="h-56 w-72 shrink-0 object-cover md:h-72"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA — cinematic closing shot ---------- */
function FinalCta() {
  const { t } = useLang();
  const rm = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.5,
  });

  const bgScale = useTransform(p, [0, 1], rm ? [1, 1] : [1.3, 1]);
  const bgOpacity = useTransform(
    p,
    rm ? [0, 1] : [0, 0.5],
    rm ? [0.45, 0.45] : [0, 0.45],
  );
  const titleScale = useTransform(
    p,
    rm ? [0, 1] : [0.1, 0.6],
    rm ? [1, 1] : [0.85, 1],
  );
  const titleOpacity = useTransform(
    p,
    rm ? [0, 1] : [0.1, 0.4],
    rm ? [1, 1] : [0, 1],
  );
  const ctaOpacity = useTransform(
    p,
    rm ? [0, 1] : [0.4, 0.6],
    rm ? [1, 1] : [0, 1],
  );
  const ctaY = useTransform(
    p,
    rm ? [0, 1] : [0.4, 0.6],
    rm ? ["0px", "0px"] : ["30px", "0px"],
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex min-h-[120vh] items-center justify-center overflow-hidden border-t border-border"
    >
      <motion.div
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0"
      >
        <img
          src={IMG.hero}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_70%)]" />
      </motion.div>

      <div className="relative z-10 px-6 text-center">
        <motion.p
          style={{ opacity: titleOpacity }}
          className="label text-muted-foreground"
        >
          {t.finalCta.label}
        </motion.p>
        <motion.h2
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="mt-8 font-display text-[15vw] uppercase leading-[0.8] tracking-tight text-foreground md:text-[10vw]"
        >
          {t.finalCta.statement}
        </motion.h2>
        <motion.a
          href="mailto:hello@example.com"
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="group mt-14 inline-flex items-center gap-4 bg-primary px-9 py-5 label text-primary-foreground transition-transform active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
        >
          {t.finalCta.cta}
          <ArrowRight
            size={16}
            strokeWidth={1.6}
            className="rtl-flip transition-transform group-hover:translate-x-1"
          />
        </motion.a>
        <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
          {t.finalCta.contactPlaceholder}
        </p>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { t, lang, dir } = useLang();

  // Smooth, subtle cursor-follow glow — decorative, desktop only.
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const ogLocale = lang === "ar" ? "ar_AR" : "en_US";

  return (
    <div id="top" className="grain relative min-h-screen bg-background">
      <Helmet>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.description} />
        <link rel="canonical" href={`${SITE_URL}/${lang}`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="ar" href={`${SITE_URL}/ar`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en`} />
        <meta property="og:locale" content={ogLocale} />
        <meta
          property="og:locale:alternate"
          content={lang === "ar" ? "en_US" : "ar_AR"}
        />
      </Helmet>
      <Seo
        title={t.seo.ogTitle}
        description={t.seo.ogDescription}
        image={IMG.hero}
        siteName="NO TIME"
        url={`${SITE_URL}/${lang}`}
      />

      <SiteNav />

      {/* subtle cursor glow (desktop) */}
      <div
        className="pointer-events-none fixed z-[5] hidden h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl transition-transform duration-300 ease-out md:block"
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      />

      <CinematicHero />

      <Marquee items={t.marquee} />

      <BrandStory />

      <Scene360 />

      <ServicesNavigator />

      <CaseStudy />

      <AiMotion />

      {/* Extended capabilities — horizontal scroll */}
      <section
        className="border-b border-border bg-card/40 py-20 md:py-28"
        aria-label={t.capabilities.heading}
      >
        <div className="mx-auto flex max-w-[90rem] items-end justify-between px-5 md:px-10">
          <h2 className="font-display text-4xl uppercase leading-none tracking-tight md:text-6xl">
            {t.capabilities.heading}
          </h2>
          <p className="label hidden items-center gap-2 text-muted-foreground md:flex">
            {t.capabilities.scrollHint}
            <ArrowRight size={14} strokeWidth={1.4} className="rtl-flip" />
          </p>
        </div>
        <div
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 md:px-10"
          role="list"
        >
          {CAPABILITIES.map((c) => (
            <article
              key={c.title.en}
              className="w-[80vw] shrink-0 snap-start border border-border bg-background sm:w-[24rem]"
              role="listitem"
            >
              <img
                src={c.img}
                alt={c.title[lang]}
                loading="lazy"
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl uppercase tracking-wide">
                  {c.title[lang]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.copy[lang]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Markets */}
      <section
        className="relative overflow-hidden"
        aria-label={t.markets.heading}
      >
        <img
          src={IMG.skyline}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-32">
          <p className="label text-primary">{t.markets.heading}</p>
          <div className="mt-10 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {t.markets.items.map((m, i) => (
              <Reveal key={m.code} delay={i * 0.06}>
                <div className="border-t border-border pt-5">
                  <p className="font-display text-5xl uppercase tracking-tight md:text-6xl">
                    {m.code}
                  </p>
                  <p className="label mt-3 text-muted-foreground">{m.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Talent network */}
      <section
        id="network"
        className="mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-32"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="label text-primary">{t.talent.label}</p>
            <h2 className="mt-6 font-display text-5xl uppercase leading-none tracking-tight md:text-7xl">
              <CountUp value={49} suffix="+" /> {t.talent.countSuffix}
            </h2>
          </div>
          <p className="label text-muted-foreground">{t.talent.roster}</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-x-10 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {TALENT.map((person) => (
            <div
              key={person.name}
              className="group flex items-baseline justify-between border-b border-border/70 py-4"
            >
              <span className="font-display text-lg uppercase tracking-wide transition-colors group-hover:text-primary md:text-xl">
                {person.name}
              </span>
              <span className="ml-4 text-right text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                {person.role[lang]}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs uppercase tracking-widest text-muted-foreground">
          {t.talent.footnote}
        </p>
      </section>

      <FinalCta />

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-10 px-5 py-16 md:grid-cols-4 md:px-10">
          <div>
            <Wordmark className="text-2xl" />
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
    </div>
  );
}
