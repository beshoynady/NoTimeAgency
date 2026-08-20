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
import { ArrowRight, ArrowDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { IMG } from "@/lib/images";

/* ---------- CINEMATIC PINNED HERO ---------- */
export default function Hero() {
  const { t } = useLang();
  const rm = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // "end end" (not "end start"): this section's content is sticky-pinned,
    // so it visually releases once the container's bottom reaches the
    // viewport's bottom — that's exactly what "end end" measures. "end
    // start" instead waits for the whole container to pass, which is one
    // full viewport-height later, after the pin has already released — every
    // transform driven off progress in that dead zone plays out invisibly.
    offset: ["start start", "end end"],
    // Defers Framer's scroll-target measurement past the layout-effect
    // phase — fixes a real "ref not yet hydrated" console warning observed
    // on first load (React 19 / Next 16 render-timing quirk, Framer's own
    // suggested remediation). Technical fix only, no visual/behavioral
    // change — within Hero's "bug fixes only" exemption.
    layoutEffect: false,
  });
  // Stiffer than the original tuning: the spring's job is to smooth the
  // motion, not to lag behind it. With the old stiffness (80), fast/flick
  // scrolling could reach the pin's release point (governed by raw scroll,
  // not this spring) before the spring had caught up — so content kept
  // visibly settling into place after the section had already started
  // sliding away. This still smooths (no snapping/jank), just converges
  // fast enough to be done well before release under normal scroll speeds.
  const p = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 26,
    mass: 0.3,
  });

  // Background: herobg3.png — hero-bg.webp was reviewed and rejected
  // (illegible fake logo text on both stage screens, a clear AI-generation
  // artifact; see this step's report). This replacement keeps the same
  // circular-light-portal idea — which meaningfully echoes the clock/O
  // glyph in the logo — clean of any text or signage, crowd shown only as
  // silhouettes.
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

  // Handoff hairline: draws in during the hero's last stretch, finishing
  // by 0.96 — not 1.0. Framer's transforms are driven by the springed
  // value above, not raw scroll, so if the last keyframe sat exactly at
  // the pin's mathematical release point, fast scrolling could reach that
  // release (native, unsmoothed) before the spring had converged — the
  // line would then visibly finish drawing while the section was already
  // sliding away. Finishing at 0.96 gives the spring real margin to settle
  // before release under normal scroll speeds.
  const handoffScale = useTransform(
    p,
    rm ? [0, 1] : [0.82, 0.96],
    rm ? [1, 1] : [0, 1],
  );
  const handoffOpacity = useTransform(
    p,
    rm ? [0, 1] : [0.82, 0.89],
    rm ? [1, 1] : [0, 1],
  );

  return (
    <section
      ref={ref}
      data-chapter="arrival"
      className={rm ? "relative min-h-[100dvh]" : "relative h-[220vh] md:h-[260vh]"}
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
          <Image src={IMG.heroPortal} alt="" fill priority sizes="100vw" className="object-cover" />
          {/* Center darkened more than the original formula: this image's
              light burst sits dead-center, right where the "NO TIME" text
              sits — protecting contrast there, not hiding the image. */}
          <motion.div
            style={{ opacity: vignette }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.4)_30%,rgba(0,0,0,0.92)_75%)]"
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

        {/* Hero → Process handoff hairline */}
        <motion.div
          style={{ scaleX: handoffScale, opacity: handoffOpacity, transformOrigin: "center" }}
          className="absolute bottom-0 left-0 right-0 z-20 h-px bg-border"
        />
      </div>
    </section>
  );
}
