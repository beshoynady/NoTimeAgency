'use client';

import { useLang } from "@/i18n/LanguageContext";
import CountUp from "@/components/CountUp";

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

/* ---------- Talent network ---------- */
export default function Talents() {
  const { t, lang } = useLang();

  return (
    <section
      id="network"
      data-chapter="reach"
      className="mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="label text-primary">{t.talent.label}</p>
          <h2 className="mt-6 text-balance font-display text-5xl uppercase leading-none tracking-tight md:text-7xl">
            <span className="tabular-nums"><CountUp value={49} suffix="+" /></span> {t.talent.countSuffix}
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
  );
}
