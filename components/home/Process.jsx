"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Target,
  Sparkles,
  Hammer,
  CheckCircle2,
  ArrowDown,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const PHASE_ICONS = [
  Target,
  Sparkles,
  Hammer,
  CheckCircle2,
];

const STATEMENT_END = 0.18;
const PHASE_START = 0.18;
const PHASE_END = 0.9;
const PHASE_COUNT = 4;
const PHASE_WIDTH = (PHASE_END - PHASE_START) / PHASE_COUNT;

function phaseWindow(index) {
  const start = PHASE_START + index * PHASE_WIDTH;
  const end = start + PHASE_WIDTH;

  return {
    start,
    end,
    enter: start + PHASE_WIDTH * 0.18,
    exit: end - PHASE_WIDTH * 0.18,
  };
}

/* -------------------------------------------------------------------------- */
/* PHASE                                                                      */
/* -------------------------------------------------------------------------- */

function PhaseBeat({ phase, index, progress, reducedMotion }) {
  const { start, end, enter, exit } = phaseWindow(index);
  const Icon = PHASE_ICONS[index];

  const opacity = useTransform(
    progress,
    reducedMotion ? [0, 1] : [start, enter, exit, end],
    reducedMotion ? [1, 1] : [0, 1, 1, 0],
  );

  const y = useTransform(
    progress,
    reducedMotion ? [0, 1] : [start, enter, exit, end],
    reducedMotion
      ? ["0%", "0%"]
      : ["35%", "0%", "0%", "-22%"],
  );

  const scale = useTransform(
    progress,
    reducedMotion ? [0, 1] : [start, enter, exit, end],
    reducedMotion
      ? [1, 1]
      : [0.96, 1, 1, 0.97],
  );

  const lineScale = useTransform(
    progress,
    reducedMotion ? [0, 1] : [start, enter, exit, end],
    reducedMotion
      ? [1, 1]
      : [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
      }}
      className="absolute inset-0 flex items-center justify-center px-5"
    >
      <div className="relative w-full max-w-[90rem]">

        {/* Phase number */}
        <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block">
          <span className="font-display text-[9rem] leading-none tracking-[-0.08em] text-foreground/[0.035]">
            0{index + 1}
          </span>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">

          {/* Number / icon */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.3em] text-primary">
              0{index + 1}
            </span>

            <span className="h-px w-10 bg-border" />

            <div className="grid h-10 w-10 place-items-center border border-primary/30 bg-primary/[0.04]">
              <Icon
                size={17}
                strokeWidth={1.4}
                className="text-primary"
                aria-hidden="true"
              />
            </div>

            <span className="h-px w-10 bg-border" />
          </div>

          {/* Title */}
          <h3 className="mt-8 font-display text-[clamp(3.5rem,9vw,9rem)] uppercase leading-[0.82] tracking-[-0.06em] text-foreground">
            {phase.step}
          </h3>

          {/* Description */}
          <p className="mt-8 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {phase.copy}
          </p>

          {/* Progress line */}
          <div className="relative mt-10 h-px w-32 overflow-hidden bg-border">
            <motion.div
              style={{
                scaleX: lineScale,
                transformOrigin: "left",
              }}
              className="absolute inset-0 bg-primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* OPENING STATEMENT                                                          */
/* -------------------------------------------------------------------------- */

function OpeningStatement({ t, progress }) {
  const opacity = useTransform(
    progress,
    [0, STATEMENT_END - 0.04, STATEMENT_END],
    [1, 1, 0],
  );

  const y = useTransform(
    progress,
    [0, 0.05, STATEMENT_END - 0.04, STATEMENT_END],
    ["18%", "0%", "0%", "-20%"],
  );

  const scale = useTransform(
    progress,
    [0, STATEMENT_END],
    [0.97, 1],
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
      }}
      className="
        absolute
        inset-x-0
        top-[calc(var(--header-h)+1rem)]
        z-30
        mx-auto
        max-w-[72rem]
        px-5
        text-center
        md:top-[calc(var(--header-h)+2rem)]
        md:px-10
      "
    >
      <div className="flex items-center justify-center gap-4">
        <span className="h-px w-8 bg-primary/50 md:w-12" />

        <p className="label text-primary">
          {t.brandStory.label}
        </p>

        <span className="h-px w-8 bg-primary/50 md:w-12" />
      </div>

      <h2 className="mx-auto mt-8 max-w-5xl text-balance font-editorial text-[7vw] leading-[1.12] tracking-tight md:mt-10 md:text-[3.4rem] md:leading-[1.1]">
        {t.brandStory.statement}
        <span className="text-primary">
          {t.brandStory.statementHighlight}
        </span>
      </h2>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* SIDE NAV                                                                   */
/* -------------------------------------------------------------------------- */

function PhaseRail({ progress, phases }) {
  return (
    <div
      className="
        pointer-events-none
        absolute
        bottom-10
        left-1/2
        z-40
        hidden
        -translate-x-1/2
        items-center
        gap-5
        lg:flex
      "
    >
      {phases.map((phase, index) => {
        const { start, end } = phaseWindow(index);

        const opacity = useTransform(
          progress,
          [start, start + 0.03, end - 0.03, end],
          [0.35, 1, 1, 0.35],
        );

        const width = useTransform(
          progress,
          [start, start + 0.03],
          ["1.5rem", "3rem"],
        );

        return (
          <motion.div
            key={phase.step}
            style={{ opacity }}
            className="flex items-center gap-2"
          >
            <motion.span
              style={{ width }}
              className="h-px bg-primary"
            />

            <span className="label">
              0{index + 1}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* REDUCED MOTION                                                             */
/* -------------------------------------------------------------------------- */

function StaticProcess({ t }) {
  return (
    <section
      id="about"
      data-chapter="understanding"
      className="border-y border-border px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[90rem]">

        <div className="max-w-5xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-primary" />

            <p className="label text-primary">
              {t.brandStory.label}
            </p>
          </div>

          <h2 className="mt-8 text-balance font-editorial text-[7vw] leading-[1.15] tracking-tight md:text-[3.4rem]">
            {t.brandStory.statement}

            <span className="text-primary">
              {t.brandStory.statementHighlight}
            </span>
          </h2>
        </div>

        <div className="mt-24">
          {t.brandStory.cycle.map((phase, index) => {
            const Icon = PHASE_ICONS[index];

            return (
              <article
                key={phase.step}
                className="grid border-t border-border py-8 md:grid-cols-[5rem_1fr_1fr] md:items-center md:py-12"
              >
                <span className="label text-primary">
                  0{index + 1}
                </span>

                <div className="mt-4 flex items-center gap-4 md:mt-0">
                  <Icon
                    size={18}
                    strokeWidth={1.4}
                    className="text-primary"
                  />

                  <h3 className="font-display text-[12vw] uppercase leading-none tracking-tight md:text-[7vw]">
                    {phase.step}
                  </h3>
                </div>

                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:mt-0 md:justify-self-end">
                  {phase.copy}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PROCESS                                                                    */
/* -------------------------------------------------------------------------- */

export default function Process() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.3,
  });

  const lineOpacity = useTransform(
    progress,
    [0, 0.04],
    [0, 1],
  );

  const handoffScale = useTransform(
    progress,
    [PHASE_END, 0.96],
    [0, 1],
  );

  const handoffOpacity = useTransform(
    progress,
    [PHASE_END, 0.94],
    [0, 1],
  );

  const phases = t.brandStory.cycle;

  if (reducedMotion) {
    return <StaticProcess t={t} />;
  }

  return (
    <section
      ref={ref}
      id="about"
      data-chapter="understanding"
      className="relative h-[300vh] md:h-[360vh]"
    >
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">

        {/* ---------------------------------------------------------------- */}
        {/* CONTINUATION LINE                                               */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          style={{ opacity: lineOpacity }}
          className="absolute inset-x-0 top-0 z-50 h-px bg-border"
        />

        {/* ---------------------------------------------------------------- */}
        {/* BACKGROUND TYPOGRAPHY                                           */}
        {/* ---------------------------------------------------------------- */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span className="absolute -bottom-[8%] left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[28vw] font-semibold uppercase leading-none tracking-[-0.1em] text-foreground/[0.025]">
            PROCESS
          </span>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* OPENING STATEMENT                                               */}
        {/* ---------------------------------------------------------------- */}

        <OpeningStatement
          t={t}
          progress={progress}
        />

        {/* ---------------------------------------------------------------- */}
        {/* PHASES                                                          */}
        {/* ---------------------------------------------------------------- */}

        <div className="absolute inset-0 z-20">
          {phases.map((phase, index) => (
            <PhaseBeat
              key={phase.step}
              phase={phase}
              index={index}
              progress={progress}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* PHASE RAIL                                                      */}
        {/* ---------------------------------------------------------------- */}

        <PhaseRail
          progress={progress}
          phases={phases}
        />

        {/* ---------------------------------------------------------------- */}
        {/* MOBILE SCROLL INDICATOR                                         */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          style={{
            opacity: useTransform(
              progress,
              [PHASE_START, PHASE_START + 0.05, PHASE_END],
              [0, 1, 0],
            ),
          }}
          className="
            absolute
            bottom-8
            left-1/2
            z-40
            flex
            -translate-x-1/2
            items-center
            gap-2
            lg:hidden
          "
        >
          <span className="label text-muted-foreground">
            SCROLL
          </span>

          <ArrowDown
            size={14}
            strokeWidth={1.3}
            className="text-primary"
          />
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* HANDOFF                                                         */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          style={{
            scaleX: handoffScale,
            opacity: handoffOpacity,
            transformOrigin: "center",
          }}
          className="absolute inset-x-0 bottom-0 z-50 h-px bg-border"
        />

      </div>
    </section>
  );
}