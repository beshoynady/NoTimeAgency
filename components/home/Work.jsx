"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import CountUp from "@/components/CountUp";
import { IMG } from "@/lib/images";

/*
 * WORK / PROOF
 *
 * Cinematic scroll stage:
 *
 * Scene 1 — Partnership
 *        ↓
 * overlapping transition
 *        ↓
 * Scene 2 — Social Media & Content
 *        ↓
 * overlapping transition
 *        ↓
 * Scene 3 — Digital Platform
 *
 * IMPORTANT:
 * - Existing layout is preserved.
 * - Existing section height is preserved.
 * - Existing content/assets are preserved.
 * - Only scene transition behavior is redesigned.
 */

const SCENE = {
  one: {
    start: 0,
    enter: 0,
    exitStart: 0.22,
    end: 0.36,
  },

  two: {
    start: 0.27,
    enter: 0.32,
    exitStart: 0.62,
    end: 0.7,
  },

  three: {
    start: 0.6,
    enter: 0.67,
    holdEnd: 0.94,
    end: 1,
  },
};

function useSmoothScrollProgress(progress) {
  return useSpring(progress, {
    stiffness: 130,
    damping: 28,
    mass: 0.25,
  });
}

/**
 * Generic cinematic scene transition.
 *
 * The important difference from the previous implementation:
 *
 * 1. Scene A does not disappear before Scene B starts.
 * 2. Scene B enters while Scene A is leaving.
 * 3. Movement is intentionally small.
 * 4. Scale adds depth without making the UI feel like a slideshow.
 */
function useSceneTransition(progress, reducedMotion, config, options = {}) {
  const {
    enterY = 22,
    exitY = -18,
    enterScale = 0.985,
    exitScale = 0.985,
  } = options;

  const opacity = useTransform(
    progress,
    reducedMotion
      ? [0, 1]
      : [config.start, config.enter, config.exitStart, config.end],
    reducedMotion ? [1, 1] : [0, 1, 1, 0],
  );

  const y = useTransform(
    progress,
    reducedMotion
      ? [0, 1]
      : [config.start, config.enter, config.exitStart, config.end],
    reducedMotion ? [0, 0] : [enterY, 0, 0, exitY],
  );

  const scale = useTransform(
    progress,
    reducedMotion
      ? [0, 1]
      : [config.start, config.enter, config.exitStart, config.end],
    reducedMotion ? [1, 1] : [enterScale, 1, 1, exitScale],
  );

  return {
    opacity,
    y,
    scale,
  };
}

/* ---------- WORK / PROOF ---------- */

export default function Work() {
  const { t, dir } = useLang();
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
    // See Hero.jsx's comment on this option — defers measurement past the
    // layout-effect phase, fixing a real "ref not yet hydrated" console
    // warning observed on first load.
    layoutEffect: false,
  });

  /*
   * One smooth progress source for the entire Work stage.
   *
   * This prevents each scene from feeling like it has its own
   * independent animation clock.
   */
  const progress = useSmoothScrollProgress(scrollYProgress);

  /*
   * -------------------------------------------------------------
   * BACKGROUND
   * -------------------------------------------------------------
   *
   * The stadium is the permanent visual stage.
   *
   * It should NOT behave like a scene.
   * It stays present while content transitions above it.
   */

  const backgroundScale = useTransform(
    progress,
    [0, 1],
    reducedMotion ? [1, 1] : [1.025, 1.055],
  );

  const backgroundY = useTransform(
    progress,
    [0, 1],
    reducedMotion ? ["0%", "0%"] : ["0%", "-1.5%"],
  );

  /*
   * Extremely subtle overlay evolution.
   *
   * This gives the scenes slightly different visual depth
   * without changing the actual background.
   */
  const backgroundOverlay = useTransform(
    progress,
    [0, 0.32, 0.68, 1],
    [0.38, 0.34, 0.4, 0.42],
  );

  /*
   * -------------------------------------------------------------
   * SCENE 1
   * -------------------------------------------------------------
   */

  const scene1 = useSceneTransition(progress, reducedMotion, SCENE.one, {
    enterY: 0,
    exitY: -26,
    enterScale: 1,
    exitScale: 0.975,
  });

  /*
   * Scene 1 internal depth.
   *
   * The image has a slightly different movement from the text.
   * This creates depth without moving the entire scene aggressively.
   */
  const scene1ImageY = useTransform(
    progress,
    [0, 0.22, 0.36],
    reducedMotion ? ["0%", "0%", "0%"] : ["0%", "-2%", "-8%"],
  );

  const scene1ImageScale = useTransform(
    progress,
    [0, 0.22, 0.36],
    reducedMotion ? [1, 1, 1] : [1, 1.015, 1.035],
  );

  /*
   * -------------------------------------------------------------
   * SCENE 2
   * -------------------------------------------------------------
   *
   * This scene overlaps Scene 1.
   *
   * It does NOT wait for Scene 1 to disappear.
   */

  const scene2 = useSceneTransition(progress, reducedMotion, SCENE.two, {
    enterY: 20,
    exitY: -20,
    enterScale: 0.975,
    exitScale: 0.985,
  });

  /*
   * Metrics get their own very small movement.
   *
   * They should feel alive, not like separate animations.
   */
  const metricsY = useTransform(
    progress,
    [0.3, 0.36, 0.6, 0.7],
    reducedMotion ? ["0%", "0%", "0%", "0%"] : ["10%", "0%", "0%", "-5%"],
  );

  const metricsScale = useTransform(
    progress,
    [0.3, 0.36, 0.6, 0.7],
    reducedMotion ? [1, 1, 1, 1] : [0.97, 1, 1, 0.985],
  );

  /*
   * -------------------------------------------------------------
   * SCENE 3
   * -------------------------------------------------------------
   */

  const scene3 = useSceneTransition(
    progress,
    reducedMotion,
    {
      start: SCENE.three.start,
      enter: SCENE.three.enter,
      exitStart: SCENE.three.holdEnd,
      end: SCENE.three.end,
    },
    {
      enterY: 24,
      exitY: -14,
      enterScale: 0.965,
      exitScale: 0.985,
    },
  );

  /*
   * Digital platform visual has a slightly different depth curve.
   */
  const platformScale = useTransform(
    progress,
    [0.62, 0.68, 0.78, 0.94],
    reducedMotion ? [1, 1, 1, 1] : [0.96, 1, 1.015, 1],
  );

  const platformY = useTransform(
    progress,
    [0.62, 0.68, 0.94],
    reducedMotion ? ["0%", "0%", "0%"] : ["12%", "0%", "-2%"],
  );

  /*
   * -------------------------------------------------------------
   * TRANSITION ACCENT
   * -------------------------------------------------------------
   *
   * A very subtle horizontal line creates continuity between scenes.
   */
  const lineOpacity = useTransform(
    progress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0.35],
  );

  /*
   * -------------------------------------------------------------
   * HANDOFF
   * -------------------------------------------------------------
   */

  const handoffScale = useTransform(progress, [0.9, 0.98], [0, 1]);

  const handoffOpacity = useTransform(progress, [0.9, 0.94, 1], [0, 1, 0.8]);

  const metrics = [
    {
      aria: `487K ${t.caseStudy.metrics.views}`,
      node: <CountUp value={487} suffix="K" />,
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

  const textAlign = dir === "rtl" ? "md:text-right" : "md:text-left";

  /*
   * -------------------------------------------------------------
   * REDUCED MOTION
   * -------------------------------------------------------------
   */

  if (reducedMotion) {
    return (
      <section
        id="work"
        data-chapter="proof"
        className="relative border-y border-border"
      >
        <div className="relative h-[55vh] w-full">
          <Image src={IMG.stadium} alt="" fill sizes="100vw" className="object-cover" />
        </div>

        <div className="absolute inset-0 h-[55vh] bg-background/55" />

        <div className="relative mx-auto max-w-[72rem] px-5 py-16 md:px-10 md:py-24">
          <p className="label text-primary">{t.caseStudy.label}</p>

          <h2 className="mt-6 max-w-4xl text-balance font-display text-[10vw] uppercase leading-[0.85] tracking-tight text-foreground md:text-[6vw]">
            {t.caseStudy.title}
          </h2>

          <p className="label mt-5 text-muted-foreground">
            {t.caseStudy.partner}
          </p>

          <div className="mt-16 border-t border-border pt-10 md:mt-20">
            <p className="label text-primary">{t.caseStudy.act1Label}</p>

            <div className="relative mt-6 h-64 w-full md:h-80">
              <Image
                src={IMG.sprinter}
                alt={t.caseStudy.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/90">
              {t.caseStudy.description}
            </p>

            <p className="label mt-4 text-muted-foreground">
              {t.caseStudy.items.join(" · ")}
            </p>
          </div>

          <div className="mt-16 border-t border-border pt-10 md:mt-20">
            <p className="label text-primary">{t.caseStudy.act2.label}</p>

            <p className="label mt-4 text-primary">{t.caseStudy.snapshot}</p>

            <div className="mt-4 flex flex-wrap gap-x-10 gap-y-6">
              {metrics.map((metric) => (
                <div key={metric.label} aria-label={metric.aria}>
                  <p
                    className="font-display text-4xl tabular-nums text-primary md:text-5xl"
                    aria-hidden="true"
                  >
                    {metric.node}
                  </p>

                  <p className="label mt-2 text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="label mt-6 text-muted-foreground">
              {t.caseStudy.act2.items.join(" · ")}
            </p>
          </div>

          <div className="mt-16 border-t border-border pt-10 md:mt-20">
            <p className="label text-primary">{t.caseStudy.act3.label}</p>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/90">
              {t.caseStudy.act3.description}
            </p>

            <p className="label mt-4 text-muted-foreground">
              {t.caseStudy.act3.items.join(" · ")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  /*
   * -------------------------------------------------------------
   * CINEMATIC MODE
   * -------------------------------------------------------------
   */

  return (
    <section
      id="work"
      ref={ref}
      data-chapter="proof"
      className="relative h-[220vh] md:h-[260vh]"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Continuation line */}
        <motion.div
          style={{ opacity: lineOpacity }}
          className="absolute inset-x-0 top-0 z-30 h-px bg-border"
        />

        {/* ---------------------------------------------------------
            BACKGROUND STAGE
        --------------------------------------------------------- */}

        <motion.div
          style={{
            scale: backgroundScale,
            y: backgroundY,
          }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={IMG.stadium}
            alt=""
            fill
            priority={false}
            sizes="100vw"
            className="object-cover"
          />

          <motion.div
            style={{ opacity: backgroundOverlay }}
            className="absolute inset-0 bg-background"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-background/55" />

          {/* subtle cinematic texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </motion.div>

        <div className="relative z-10 h-full">
          {/* =========================================================
              SCENE 1 — PARTNERSHIP
          ========================================================= */}

          <motion.div
            style={{
              opacity: scene1.opacity,
              y: scene1.y,
              scale: scene1.scale,
            }}
            className="absolute inset-x-0 bottom-0 top-[var(--header-h)] flex items-center px-5 md:px-10 will-change-transform"
          >
            <div className="mx-auto grid w-full max-w-[78rem] gap-8 md:grid-cols-12 md:items-center md:gap-10">
              <div className={`text-center md:col-span-7 ${textAlign}`}>
                <p className="label text-primary">{t.caseStudy.label}</p>

                <h2 className="mt-3 text-balance font-display text-[9vw] uppercase leading-[0.92] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  {t.caseStudy.title}
                </h2>

                <p className="label mt-3 text-muted-foreground">
                  {t.caseStudy.partner}
                </p>

                <p className="label mt-6 text-primary md:mt-8">
                  {t.caseStudy.act1Label}
                </p>

                <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-foreground/90 md:mx-0 md:text-base">
                  {t.caseStudy.description}
                </p>

                <p className="mx-auto mt-4 max-w-xl label text-muted-foreground md:mx-0">
                  {t.caseStudy.items.join(" · ")}
                </p>
              </div>

              <motion.div
                style={{
                  y: scene1ImageY,
                  scale: scene1ImageScale,
                }}
                className="md:col-span-5 will-change-transform"
              >
                <div className="relative mx-auto h-32 w-full max-w-sm overflow-hidden sm:h-44 md:mx-0 md:h-[22rem] md:max-w-none lg:h-[26rem]">
                  <Image
                    src={IMG.sprinter}
                    alt={t.caseStudy.title}
                    fill
                    sizes="(min-width: 768px) 36vw, 90vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* =========================================================
              SCENE 2 — SOCIAL MEDIA & CONTENT
          ========================================================= */}

          <motion.div
            style={{
              opacity: scene2.opacity,
              y: scene2.y,
              scale: scene2.scale,
            }}
            className="absolute inset-x-0 bottom-0 top-[var(--header-h)] flex flex-col items-center justify-center px-5 text-center md:px-10 will-change-transform"
          >
            <p className="label text-primary">{t.caseStudy.act2.label}</p>

            <div className="mt-6">
              <p className="label text-primary">{t.caseStudy.snapshot}</p>

              <motion.div
                style={{
                  y: metricsY,
                  scale: metricsScale,
                }}
                className="mt-4 flex flex-wrap items-start justify-center gap-x-10 gap-y-5 will-change-transform"
              >
                {metrics.map((metric) => (
                  <div key={metric.label} aria-label={metric.aria}>
                    <p
                      className="font-display text-5xl tabular-nums text-primary md:text-6xl"
                      aria-hidden="true"
                    >
                      {metric.node}
                    </p>

                    <p className="label mt-2 text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            <p className="label mt-6 max-w-xl text-muted-foreground">
              {t.caseStudy.act2.items.join(" · ")}
            </p>
          </motion.div>

          {/* =========================================================
              SCENE 3 — DIGITAL PLATFORM
          ========================================================= */}

          <motion.div
            style={{
              opacity: scene3.opacity,
              y: scene3.y,
              scale: scene3.scale,
            }}
            className="absolute inset-x-0 bottom-0 top-[var(--header-h)] flex flex-col items-center justify-center px-5 text-center md:px-10 will-change-transform"
          >
            <p className="label text-primary">{t.caseStudy.act3.label}</p>

            <motion.div
              aria-hidden="true"
              style={{
                scale: platformScale,
                y: platformY,
              }}
              className="mt-6 flex items-end gap-4 will-change-transform md:mt-8 md:gap-6"
            >
              {/* Website / Admin Dashboard */}
              <div className="h-28 w-44 border border-primary/60 bg-background/10 backdrop-blur-[2px] md:h-36 md:w-56">
                <div className="h-2.5 border-b border-primary/60 md:h-3" />

                <div className="grid grid-cols-3 gap-1.5 p-3 opacity-50">
                  <span className="h-1.5 bg-primary/60" />
                  <span className="h-1.5 bg-primary/30" />
                  <span className="h-1.5 bg-primary/20" />
                  <span className="col-span-2 h-8 border border-primary/20" />
                  <span className="h-8 border border-primary/20" />
                </div>
              </div>

              {/* Mobile App */}
              <div className="h-28 w-14 border border-primary/60 bg-background/10 backdrop-blur-[2px] md:h-36 md:w-[4.5rem]">
                <div className="h-2.5 border-b border-primary/60 md:h-3" />

                <div className="space-y-2 p-2 opacity-50">
                  <span className="block h-10 border border-primary/20" />
                  <span className="block h-1.5 bg-primary/40" />
                  <span className="block h-1.5 bg-primary/20" />
                </div>
              </div>
            </motion.div>

            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/90 md:text-lg">
              {t.caseStudy.act3.description}
            </p>

            <p className="label mt-4 max-w-xl text-muted-foreground">
              {t.caseStudy.act3.items.join(" · ")}
            </p>
          </motion.div>
        </div>

        {/* Handoff */}
        <motion.div
          style={{
            scaleX: handoffScale,
            opacity: handoffOpacity,
            transformOrigin: "center",
          }}
          className="absolute inset-x-0 bottom-0 z-30 h-px bg-border"
        />
      </div>
    </section>
  );
}
