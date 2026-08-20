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
import { Sparkles, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import Reveal from "@/components/Reveal";
import { IMG } from "@/lib/images";

const EASE = [0.16, 1, 0.3, 1];

// AI & MOTION — simplified from an earlier version that animated roughly
// sixteen elements independently (eyebrow, its own underline, heading, a
// separate highlight-span fade, an intro line, five list items each on
// their own staggered delay, a media heading, four images each on their
// own staggered delay, a caption, a bottom line, a drifting label...).
// ui-ux-pro-max's own "Excessive Motion" guideline (High severity) is
// explicit: animate 1-2 key elements per view, not everything that moves —
// and next to Capabilities.jsx's now-deliberately-restrained entrance
// (content is simply there, no risky fade-in), the old version read as a
// different, busier design system rather than the next chapter of the same
// one. Down to two beats: IDENTITY (label + heading, together, no internal
// stagger) and DETAIL (list + media, together, entering once) — plus the
// ambient scroll-linked drift on the background and the media rail, which
// stay continuous because that's a different kind of motion (progressive,
// not an entrance) and is the one place this chapter still gets to feel
// distinctly "in motion", appropriate for a chapter about motion graphics.
//
// Also fixed two real defects found while simplifying, not just trimmed:
// - The old "intro micro statement" quoted t.aiMotion.items[0] verbatim
//   above a list that immediately repeats the same item as its own first
//   row — the same real sentence shown twice with no distinct purpose.
// - A "PLAY" button with a Play icon sat over the image rail with no video
//   anywhere in the project — an affordance promising playback that does
//   not exist. Removed rather than wired to nothing.
// - The media caption and the bottom marker both said "360°" — that's
//   Scene360's own signature (the ring mechanism actually completes 360°),
//   not this chapter's. Reusing it here diluted the one place it's earned.
export default function AiMotion() {
  const { t, dir } = useLang();
  const rm = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    // Defers Framer's scroll-target measurement to a regular effect instead
    // of a layout effect — avoids a real, observed console warning on first
    // hydration ("ref is not yet hydrated") that fires because the layout
    // effect can run before this ref's DOM node is committed under React
    // 19 / Next 16's render timing. Framer's own suggested fix.
    layoutEffect: false,
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    mass: 0.45,
  });

  // Ambient background — continuous, not an entrance; stays subtle so the
  // stage reads as stable while the identity/detail beats happen on top.
  const backgroundScale = useTransform(progress, [0, 1], rm ? [1, 1] : [1.06, 1.02]);
  const backgroundY = useTransform(progress, [0, 1], rm ? ["0%", "0%"] : ["-2%", "2%"]);

  // Media rail drift — continuous progressive movement, direction-aware.
  const railX = useTransform(
    progress,
    [0, 1],
    rm ? ["0%", "0%"] : dir === "rtl" ? ["-4%", "16%"] : ["4%", "-16%"],
  );

  // Handoff line at the very end of the chapter — the one place a
  // scroll-linked draw still makes sense (marks the boundary, not an
  // entrance).
  const closeLine = useTransform(progress, [0.85, 1], [0, 1]);

  const images = [IMG.lighting, IMG.sprinter, IMG.stand, IMG.gala];

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border">
      {/* Background stage */}
      <motion.div
        style={{ scale: backgroundScale, y: backgroundY }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <Image src={IMG.motion} alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,hsl(var(--background)/0.65)_100%)]" />
      </motion.div>

      <div className="relative mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-36">
        {/* Continuation line from the previous chapter */}
        <motion.div
          initial={rm ? false : { scaleX: 0 }}
          whileInView={rm ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ transformOrigin: dir === "rtl" ? "right" : "left" }}
          className="h-px w-full bg-border"
        />

        {/* Identity — label + heading, one beat, no internal stagger */}
        <Reveal className="mt-12 flex items-center gap-3 md:mt-16">
          <Sparkles size={15} strokeWidth={1.4} className="text-primary" aria-hidden="true" />
          <p className="label text-primary">{t.aiMotion.label}</p>
        </Reveal>

        <Reveal delay={0.05} className="mt-6 max-w-[80rem]">
          <h2 className="text-balance font-display text-[13vw] uppercase leading-[0.8] tracking-tighter text-foreground md:text-[8vw]">
            {t.aiMotion.headingPre}{" "}
            <span className="text-primary">{t.aiMotion.headingHighlight}</span>{" "}
            {t.aiMotion.headingPost}
          </h2>
        </Reveal>

        {/* Detail — list + media, one beat */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ul className="border-t border-border">
              {t.aiMotion.items.map((txt, i) => (
                <Reveal key={txt} as="li" delay={0.1 + i * 0.05}>
                  <div className="flex items-center justify-between gap-5 border-b border-border/70 py-6 md:py-7">
                    <span className="flex items-center gap-4">
                      <span className="label text-primary/60">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-xl uppercase tracking-wide text-foreground md:text-2xl">
                        {txt}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.2}
                      aria-hidden="true"
                      className="shrink-0 text-primary rtl-flip"
                    />
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="relative min-w-0 lg:col-span-7">
            <Reveal delay={0.1} className="mb-5">
              <span className="label text-muted-foreground">
                {t.aiMotion.mediaLabel}
              </span>
            </Reveal>

            <div className="relative overflow-hidden border border-border">
              <motion.div style={{ x: railX }} className="flex w-max gap-4 p-2 md:gap-5 md:p-3">
                {images.map((src, i) => (
                  <Reveal
                    key={src}
                    delay={0.15 + i * 0.06}
                    y={12}
                    className="group relative h-[18rem] w-[15rem] shrink-0 overflow-hidden md:h-[24rem] md:w-[19rem]"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 19rem, 15rem"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 label text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Reveal>
                ))}
              </motion.div>

              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Chapter boundary marker */}
        <div className="relative mt-20 overflow-hidden border-t border-border pt-5 md:mt-28">
          <motion.div
            style={{ scaleX: closeLine, transformOrigin: dir === "rtl" ? "right" : "left" }}
            className="absolute left-0 top-0 h-px w-full bg-primary"
          />
          <div className="flex items-center justify-between">
            <span className="label text-muted-foreground">
              {t.aiMotion.closingLabel}
            </span>
            <span className="label text-primary">NO TIME</span>
          </div>
        </div>
      </div>
    </section>
  );
}
