"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  Gem,
  Target,
  Share2,
  MonitorSmartphone,
  Presentation,
  ArrowUpRight,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { IMG } from "@/lib/images";

const EASE = [0.16, 1, 0.3, 1] ;

const SERVICES = [
  {
    n: "01",
    icon: CalendarDays,
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
    icon: Gem,
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
    icon: Target,
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
    icon: Share2,
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
    icon: MonitorSmartphone,
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
    icon: Presentation,
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

function ServiceImage({ service, lang, reduceMotion }) {
  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              scale: 1.08,
              x: 24,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
      }}
      exit={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 1.03,
              x: -18,
            }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        ease: EASE,
      }}
      className="absolute inset-0"
    >
      <Image
        src={service.img}
        alt={service.title[lang]}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />

      {!reduceMotion && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.75,
            delay: 0.05,
            ease: EASE,
          }}
          className="absolute inset-x-0 top-0 h-px origin-left bg-primary"
        />
      )}
    </motion.div>
  );
}

function ServiceRow({
  service,
  index,
  active,
  setActive,
  lang,
  dir,
  reduceMotion,
}) {
  const Icon = service.icon;
  const isActive = active === index;

  return (
    <motion.button
      type="button"
      onMouseEnter={() => setActive(index)}
      onFocus={() => setActive(index)}
      onClick={() => setActive(index)}
      aria-pressed={isActive}
      aria-label={service.title[lang]}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        margin: "-8%",
      }}
      transition={{
        duration: 0.55,
        delay: reduceMotion ? 0 : index * 0.045,
        ease: EASE,
      }}
      className={[
        "group relative block w-full border-b border-border/70 py-7 text-left",
        "focus-visible:outline focus-visible:outline-2",
        "focus-visible:outline-primary focus-visible:outline-offset-[-4px]",
        "md:py-8",
      ].join(" ")}
    >
      {/* Active indicator */}
      <motion.span
        initial={false}
        animate={{
          scaleY: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          duration: 0.45,
          ease: EASE,
        }}
        className={[
          "absolute inset-y-0 w-px origin-center bg-primary",
          dir === "rtl" ? "right-0" : "left-0",
        ].join(" ")}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center md:gap-6">
        {/* Number / icon */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <motion.span
              animate={{
                rotate: isActive ? 45 : 0,
                scale: isActive ? 1 : 0.9,
              }}
              transition={{
                duration: 0.45,
                ease: EASE,
              }}
              className="text-primary"
            >
              <Icon
                size={16}
                strokeWidth={1.35}
                aria-hidden="true"
              />
            </motion.span>

            <span
              className={[
                "label transition-colors duration-300",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground/60",
              ].join(" ")}
            >
              {service.n}
            </span>
          </div>
        </div>

        {/* Main title */}
        <div className="md:col-span-7">
          <motion.h3
            animate={{
              x: isActive ? 8 : 0,
              color: isActive ? "hsl(var(--primary))" : undefined,
            }}
            transition={{
              duration: 0.5,
              ease: EASE,
            }}
            className="font-display text-4xl uppercase leading-[0.92] tracking-tight md:text-6xl lg:text-[4.2rem]"
          >
            {service.title[lang]}
          </motion.h3>
        </div>

        {/* Tags */}
        <div className="md:col-span-4">
          <p
            className={[
              "label max-w-sm transition-colors duration-300",
              isActive
                ? "text-foreground"
                : "text-muted-foreground",
            ].join(" ")}
          >
            {service.tags[lang]}
          </p>
        </div>
      </div>

      {/* Expandable description */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    height: 0,
                  }
            }
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    height: 0,
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              ease: EASE,
            }}
            className="overflow-hidden"
          >
            <motion.p
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 10,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                delay: reduceMotion ? 0 : 0.08,
                ease: EASE,
              }}
              className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:ml-[8.333%] md:text-base"
            >
              {service.copy[lang]}
            </motion.p>

            {/* Mobile image */}
            <div className="relative mt-6 aspect-[16/9] overflow-hidden border border-border lg:hidden">
              <AnimatePresence mode="wait">
                <ServiceImage
                  service={service}
                  lang={lang}
                  reduceMotion={reduceMotion}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Services() {
  const { t, lang, dir } = useLang();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const activeService = SERVICES[active];

  return (
    <section
      id="services"
      data-chapter="system"
      className="relative mx-auto max-w-[90rem] px-5 py-15 md:px-10 md:py-15"
    >
      {/* Section boundary */}
      <motion.div
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1 }}
        viewport={{
          once: true,
          margin: "-10%",
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.9,
          ease: EASE,
        }}
        style={{
          transformOrigin: dir === "rtl" ? "right" : "left",
        }}
        className="h-px bg-border"
      />

      {/* Header */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 24,
              }
        }
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
              }
        }
        viewport={{
          once: true,
          margin: "-10%",
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.65,
          ease: EASE,
        }}
        className="mt-16 flex flex-col justify-between gap-6 md:mt-20 md:flex-row md:items-end"
      >
        <div>
          <p className="label mb-4 text-primary">NO TIME / SERVICES</p>

          <h2 className="text-balance font-display text-5xl uppercase leading-[0.88] tracking-tight md:text-8xl">
            {t.services.heading}
          </h2>
        </div>

        <p className="label max-w-xs text-muted-foreground">
          <span className="md:hidden">{t.services.tapHint}</span>
          <span className="hidden md:inline">
            {t.services.hoverHint}
          </span>
        </p>
      </motion.div>

      {/* Main layout */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-14">
        {/* Navigator */}
        <div className="lg:col-span-7">
          <div className="border-t border-border">
            {SERVICES.map((service, index) => (
              <ServiceRow
                key={service.n}
                service={service}
                index={index}
                active={active}
                setActive={setActive}
                lang={lang}
                dir={dir}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>

        {/* Desktop visual stage */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-[calc(var(--header-h)+2rem)]">
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
              {/* subtle framing grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                  backgroundSize: "25% 25%",
                }}
              />

              <AnimatePresence mode="wait">
                <ServiceImage
                  key={activeService.n}
                  service={activeService}
                  lang={lang}
                  reduceMotion={reduceMotion}
                />
              </AnimatePresence>

              {/* Image treatment */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/95 via-background/15 to-transparent" />

              {/* Image metadata */}
              <motion.div
                key={`meta-${activeService.n}`}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  ease: EASE,
                }}
                className="absolute inset-x-0 bottom-0 z-20 p-7 md:p-8"
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="label text-primary">
                      {activeService.n}
                    </p>

                    <p className="mt-2 max-w-[18rem] font-display text-3xl uppercase leading-[0.92] tracking-tight text-foreground md:text-4xl">
                      {activeService.title[lang]}
                    </p>
                  </div>

                  <motion.div
                    animate={{
                      rotate: active === 0 ? 0 : 45,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: EASE,
                    }}
                    className="grid h-10 w-10 shrink-0 place-items-center border border-primary/60 text-primary"
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={17} strokeWidth={1.25} />
                  </motion.div>
                </div>

                {/* Active progress */}
                <div className="mt-6 flex gap-1">
                  {SERVICES.map((service, index) => (
                    <motion.span
                      key={service.n}
                      animate={{
                        scaleX: index === active ? 1 : 0.45,
                        opacity: index === active ? 1 : 0.35,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: EASE,
                      }}
                      className="h-px flex-1 origin-left bg-primary"
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Stage caption */}
            <motion.div
              key={`caption-${activeService.n}`}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 8,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                ease: EASE,
              }}
              className="mt-4 flex items-center justify-between gap-4"
            >
              <p className="label text-muted-foreground">
                {activeService.tags[lang]}
              </p>

              <p className="label shrink-0 text-primary">
                {activeService.n} / 0{SERVICES.length}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
