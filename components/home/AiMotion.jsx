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
import {
  ArrowUpRight,
  Sparkles,
  Play,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { IMG } from "@/lib/images";

const EASE = [0.16, 1, 0.3, 1];

/* -------------------------------------------------------------------------- */
/* AI & MOTION                                                                */
/*                                                                            */
/* A cinematic editorial chapter built around one idea:                       */
/*                                                                            */
/*        CONTENT → MOTION → ATTENTION                                        */
/*                                                                            */
/* Motion is used for hierarchy, not decoration.                              */
/*                                                                            */
/* 1. Background = stable visual stage                                        */
/* 2. Heading = kinetic typography                                            */
/* 3. Capabilities = sequential activation                                   */
/* 4. Media = horizontal cinematic rail                                       */
/* 5. Scroll = subtle parallax, never aggressive                              */
/* -------------------------------------------------------------------------- */

export default function AiMotion() {
  const { t, dir } = useLang();
  const rm = useReducedMotion();

const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /*
   * Smooth scroll progress.
   *
   * Deliberately softer than Work/System.
   * This section should feel editorial and fluid,
   * not mechanical.
   */
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    mass: 0.45,
  });

  /* ------------------------------------------------------------------------ */
  /* BACKGROUND                                                               */
  /* ------------------------------------------------------------------------ */

  const backgroundScale = useTransform(
    progress,
    [0, 0.5, 1],
    rm ? [1, 1, 1] : [1.08, 1.03, 1.08],
  );

  const backgroundY = useTransform(
    progress,
    [0, 1],
    rm ? ["0%", "0%"] : ["-3%", "3%"],
  );

  const backgroundOpacity = useTransform(
    progress,
    [0, 0.2, 0.8, 1],
    [0.18, 0.3, 0.3, 0.18],
  );

  /* ------------------------------------------------------------------------ */
  /* EDITORIAL ACCENT                                                         */
  /* ------------------------------------------------------------------------ */

  const accentScale = useTransform(
    progress,
    [0.05, 0.3, 0.65, 0.95],
    [0, 1, 1, 0],
  );

  /* ------------------------------------------------------------------------ */
  /* MEDIA RAIL                                                               */
  /* ------------------------------------------------------------------------ */

  const railX = useTransform(
    progress,
    [0, 1],
    rm
      ? ["0%", "0%"]
      : dir === "rtl"
        ? ["-4%", "20%"]
        : ["4%", "-20%"],
  );

  const railRotate = useTransform(
    progress,
    [0, 0.5, 1],
    rm ? [0, 0, 0] : [1.5, 0, -1.5],
  );

  const images = [
    IMG.lighting,
    IMG.sprinter,
    IMG.stand,
    IMG.gala,
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-border"
    >
      {/* ================================================================== */}
      {/* BACKGROUND STAGE                                                   */}
      {/* ================================================================== */}

      <motion.div
        style={{
          scale: backgroundScale,
          y: backgroundY,
        }}
        className="absolute inset-[-6%]"
        aria-hidden="true"
      >
        <Image
          src={IMG.motion}
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
        />

        <motion.div
          style={{ opacity: backgroundOpacity }}
          className="absolute inset-0 bg-background"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/35 to-background/90" />

        {/* Subtle cinematic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,hsl(var(--background)/0.65)_100%)]" />
      </motion.div>

      {/* ================================================================== */}
      {/* MAIN CONTENT                                                       */}
      {/* ================================================================== */}

      <div className="relative mx-auto max-w-[90rem] px-5 py-28 md:px-10 md:py-40">

        {/* ---------------------------------------------------------------- */}
        {/* TOP CONTINUATION LINE                                            */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={rm ? false : { scaleX: 0 }}
          whileInView={rm ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 1,
            ease: EASE,
          }}
          style={{
            transformOrigin: dir === "rtl" ? "right" : "left",
          }}
          className="h-px w-full bg-border"
        />

        {/* ---------------------------------------------------------------- */}
        {/* EYEBROW                                                          */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={rm ? false : { opacity: 0, y: 20 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            ease: EASE,
          }}
          className="mt-16 flex items-center gap-3 md:mt-20"
        >
          <Sparkles
            size={15}
            strokeWidth={1.4}
            className="text-primary"
            aria-hidden="true"
          />

          <p className="label text-primary">
            {t.aiMotion.label}
          </p>

          <motion.span
            initial={rm ? false : { scaleX: 0 }}
            whileInView={rm ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.25,
              duration: 0.7,
              ease: EASE,
            }}
            style={{
              transformOrigin: dir === "rtl" ? "right" : "left",
            }}
            className="h-px w-12 bg-primary"
          />
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* HERO TYPOGRAPHY                                                  */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative mt-7 max-w-[80rem]">
          {/* Decorative kinetic line */}
          <motion.div
            style={{ scaleX: accentScale }}
            className={`absolute ${
              dir === "rtl" ? "right-0" : "left-0"
            } top-[52%] z-0 h-[0.08em] w-[42%] origin-left bg-primary/70`}
            aria-hidden="true"
          />

          <motion.h2
            initial={rm ? false : { opacity: 0, y: 45 }}
            whileInView={rm ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 1,
              ease: EASE,
            }}
            className="relative z-10 text-balance font-display text-[13vw] uppercase leading-[0.78] tracking-[-0.055em] text-foreground md:text-[8vw]"
          >
            {t.aiMotion.headingPre}{" "}

            <motion.span
              initial={rm ? false : { opacity: 0 }}
              whileInView={rm ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
              className="relative inline-block text-primary"
            >
              {t.aiMotion.headingHighlight}
            </motion.span>{" "}

            {t.aiMotion.headingPost}
          </motion.h2>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* INTRO MICRO STATEMENT                                            */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={rm ? false : { opacity: 0, y: 20 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: EASE,
          }}
          className="mt-10 flex max-w-xl items-start gap-4"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {t.aiMotion.items[0]}
          </p>
        </motion.div>

        {/* ================================================================== */}
        {/* CONTENT + MEDIA                                                   */}
        {/* ================================================================== */}

        <div className="mt-20 grid grid-cols-1 gap-16 md:mt-28 lg:grid-cols-12 lg:gap-20">

          {/* ================================================================ */}
          {/* CAPABILITIES                                                     */}
          {/* ================================================================ */}

          <div className="lg:col-span-5">
            <div className="border-t border-border">

              {t.aiMotion.items.map((txt, i) => (
                <motion.div
                  key={txt}
                  initial={
                    rm
                      ? false
                      : {
                          opacity: 0,
                          x: dir === "rtl" ? 25 : -25,
                        }
                  }
                  whileInView={
                    rm
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.35,
                  }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.75,
                    ease: EASE,
                  }}
                  className="group border-b border-border/70"
                >
                  <div className="relative flex items-center justify-between gap-5 py-6 md:py-7">

                    {/* Active line */}
                    <motion.span
                      className={`absolute bottom-0 ${
                        dir === "rtl" ? "right-0" : "left-0"
                      } h-px w-0 bg-primary`}
                      whileHover={{
                        width: "100%",
                      }}
                      transition={{
                        duration: 0.45,
                        ease: EASE,
                      }}
                    />

                    <div className="flex items-center gap-4">

                      <span className="label text-primary/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="font-display text-xl uppercase tracking-wide text-foreground transition-transform duration-500 group-hover:translate-x-1 md:text-2xl">
                        {txt}
                      </span>
                    </div>

                    <motion.div
                      whileHover={{
                        rotate: 45,
                        scale: 1.15,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: EASE,
                      }}
                    >
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.2}
                        className="shrink-0 text-primary rtl-flip"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}

            </div>
          </div>

          {/* ================================================================ */}
          {/* CINEMATIC MEDIA                                                  */}
          {/* ================================================================ */}

          <div className="relative min-w-0 lg:col-span-7">

            {/* Media heading */}
            <motion.div
              initial={rm ? false : { opacity: 0, y: 20 }}
              whileInView={rm ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                ease: EASE,
              }}
              className="mb-5 flex items-center justify-between"
            >
              <span className="label text-muted-foreground">
                MOTION / CONTENT
              </span>

              <span className="flex items-center gap-2 label text-primary">
                <Play
                  size={12}
                  fill="currentColor"
                  strokeWidth={1}
                  aria-hidden="true"
                />
                PLAY
              </span>
            </motion.div>

            {/* Media viewport */}
            <div className="relative overflow-hidden border border-border">

              {/* cinematic rail */}
              <motion.div
                style={{
                  x: railX,
                  rotate: railRotate,
                }}
                className="flex w-max gap-4 p-2 md:gap-5 md:p-3"
              >
                {images.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={
                      rm
                        ? false
                        : {
                            opacity: 0,
                            scale: 0.92,
                          }
                    }
                    whileInView={
                      rm
                        ? undefined
                        : {
                            opacity: 1,
                            scale: 1,
                          }
                    }
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      delay: 0.15 + i * 0.1,
                      duration: 0.9,
                      ease: EASE,
                    }}
                    whileHover={
                      rm
                        ? undefined
                        : {
                            scale: 1.025,
                          }
                    }
                    className="group relative h-[22rem] w-[18rem] shrink-0 overflow-hidden md:h-[28rem] md:w-[23rem]"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 23rem, 18rem"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* image gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent opacity-70" />

                    {/* index */}
                    <span className="absolute bottom-4 left-4 label text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Edge masks */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Media caption */}
            <motion.div
              initial={rm ? false : { opacity: 0 }}
              whileInView={rm ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5,
                duration: 0.8,
              }}
              className="mt-4 flex items-center justify-between"
            >
              <span className="label text-muted-foreground">
                CREATIVE SYSTEM
              </span>

              <span className="label text-primary">
                360° / 01
              </span>
            </motion.div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BOTTOM MOTION MARKER                                               */}
        {/* ================================================================== */}

        <div className="relative mt-24 overflow-hidden border-t border-border pt-5 md:mt-32">

          <motion.div
            style={{
              scaleX: accentScale,
              transformOrigin: dir === "rtl" ? "right" : "left",
            }}
            className="absolute left-0 top-0 h-px w-full bg-primary"
          />

          <div className="flex items-center justify-between">
            <span className="label text-muted-foreground">
              AI / MOTION / CONTENT
            </span>

            <motion.span
              style={{
                x: useTransform(
                  progress,
                  [0, 1],
                  rm ? ["0%", "0%"] : ["0%", dir === "rtl" ? "-30%" : "30%"],
                ),
              }}
              className="label text-primary"
            >
              NO TIME — 360°
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
