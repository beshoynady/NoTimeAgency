'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { useLang } from '@/i18n/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Per-chapter background target (HSL H/S/L) and its Arabic label for the
// reduced-motion text fallback. Hues are limited to ones already defined in
// the brand palette (0° neutral, 216° grey-mid) — the copper hue (31°) is
// deliberately never used here, since the color system's own rule is
// "never [copper] on backgrounds" (NO_TIME_Color_Palette.html). Lightness
// carries the cinematic arc instead: 10 -> 15 -> 14(cool) -> 8(darkest,
// Proof) -> 18(Craft, warmth left to the photography, not the color) -> 15
// -> 10(bookends Arrival) -> 15(Footer, settled).
const CHAPTERS = [
  { key: 'arrival', h: 0, s: 0, l: 10 },
  { key: 'understanding', h: 0, s: 0, l: 15 },
  { key: 'system', h: 216, s: 3, l: 14 },
  { key: 'proof', h: 0, s: 0, l: 8 },
  { key: 'craft', h: 0, s: 0, l: 18 },
  { key: 'reach', h: 0, s: 0, l: 15 },
  { key: 'action', h: 0, s: 0, l: 10 },
  { key: 'footer', h: 0, s: 0, l: 15 },
];

const LABELS = {
  arrival: { en: 'Arrival', ar: 'الوصول' },
  understanding: { en: 'Understanding', ar: 'الفهم' },
  system: { en: 'The System', ar: 'النظام' },
  proof: { en: 'Proof', ar: 'الدليل' },
  craft: { en: 'Craft', ar: 'الحرفية' },
  reach: { en: 'Reach', ar: 'الوصول الجغرافي' },
  action: { en: 'Action', ar: 'الفعل' },
  footer: { en: 'Footer', ar: 'التذييل' },
};

/**
 * Two independent GSAP mechanisms sharing one set of chapter boundaries:
 *  - a scrubbed ScrollTrigger drives --rail-progress (0..1) for the
 *    persistent rail fill, 1:1 with scroll (a progress indicator should
 *    track scroll exactly).
 *  - one onEnter/onEnterBack ScrollTrigger per chapter *tweens* the shared
 *    background CSS vars toward that chapter's target — eased, not
 *    scrubbed, so the page doesn't hue-shift continuously as you scroll,
 *    only settles into each chapter's tone as it becomes current.
 * Both only touch CSS custom properties + a transform, never layout
 * properties (width/height/top/left) — see the web-design-guidelines audit
 * in the implementation plan.
 */
export default function TickRail() {
  const { dir } = useLang();
  const rm = useReducedMotion();
  const railRef = useRef(null);
  const bgRef = useRef(null);
  const [activeLabel, setActiveLabel] = useState(LABELS.arrival[dir === 'rtl' ? 'ar' : 'en']);

  useEffect(() => {
    bgRef.current = document.getElementById('top');
  }, []);

  useEffect(() => {
    const chapterEls = CHAPTERS.map((c) => ({
      ...c,
      els: Array.from(document.querySelectorAll(`[data-chapter="${c.key}"]`)),
    })).filter((c) => c.els.length > 0);

    if (chapterEls.length === 0) return undefined;

    const setActiveChapter = (key) => {
      setActiveLabel(LABELS[key]?.[dir === 'rtl' ? 'ar' : 'en'] ?? key);
    };

    // Reduced motion: no scrub, no color tweening — just track which
    // chapter is on screen (cheap IntersectionObserver, not scroll-linked)
    // and expose it as a static text label. Background stays the base
    // Charcoal the whole page.
    if (rm) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) {
            const key = visible.target.dataset.chapter;
            if (key) setActiveChapter(key);
          }
        },
        { threshold: 0.5 },
      );
      chapterEls.forEach((c) => observer.observe(c.els[0]));
      return () => observer.disconnect();
    }

    const triggers = [];

    // Rail fill: one scrub from the first chapter's top to the last
    // chapter's bottom.
    const first = chapterEls[0].els[0];
    const last = chapterEls[chapterEls.length - 1].els.at(-1);
    triggers.push(
      ScrollTrigger.create({
        trigger: first,
        start: 'top top',
        endTrigger: last,
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          if (railRef.current) {
            railRef.current.style.setProperty('--rail-progress', self.progress.toFixed(4));
          }
        },
      }),
    );

    // Background: one eased tween per chapter, fired on entering it (either
    // direction), targeting the shared CSS vars on the #top wrapper.
    chapterEls.forEach((c) => {
      const el = c.els[0];
      const goTo = () => {
        setActiveChapter(c.key);
        if (bgRef.current) {
          gsap.to(bgRef.current, {
            '--chapter-h': c.h,
            '--chapter-s': `${c.s}%`,
            '--chapter-l': `${c.l}%`,
            duration: 0.9,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      };
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: goTo,
          onEnterBack: goTo,
        }),
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, [rm, dir]);

  return (
    <div
      ref={railRef}
      className="tick-rail"
      style={{ '--rail-progress': 0 }}
      aria-hidden={!rm}
    >
      {rm ? (
        <span className="tick-rail-label label">{activeLabel}</span>
      ) : (
        <span className="tick-rail-fill" />
      )}
    </div>
  );
}
