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
  CalendarDays,
  Target,
  MonitorSmartphone,
  Share2,
  Zap,
  Presentation,
  Hammer,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

// Indexed to t.scene360.caps fixed order:
// EVENTS, MARKETING, DIGITAL, SOCIAL,
// AI & MOTION, PR, PRODUCTION
//
// The same icon language is reused from Services.jsx.
const CAP_ICONS = [
  CalendarDays,
  Target,
  MonitorSmartphone,
  Share2,
  Zap,
  Presentation,
  Hammer,
];

/* -------------------------------------------------------------------------- */
/* 360° TIMELINE                                                              */
/* -------------------------------------------------------------------------- */

const ENTRY_END = 0.1;

const CAPS_START = 0.1;
const CAPS_END = 0.85;

const COMPLETE_START = 0.85;
const COMPLETE_END = 0.9;

const COMPLETE_MID = (COMPLETE_START + COMPLETE_END) / 2;

/**
 * Creates a stepped rotation timeline.
 *
 * Each capability represents one precise movement of the mechanism.
 *
 * 7 capabilities
 * → 360° / 7 per step
 * → after the final capability the ring completes exactly 360°.
 */
function buildClickTimeline(count, totalDegrees) {
  const width = (CAPS_END - CAPS_START) / count;

  const input = [CAPS_START];
  const output = [0];

  for (let i = 0; i < count; i++) {
    const start = CAPS_START + i * width;
    const snapEnd = start + width * 0.15;

    const angle = ((i + 1) / count) * totalDegrees;

    if (i > 0) {
      input.push(start);
      output.push(output[output.length - 1]);
    }

    input.push(snapEnd);
    output.push(angle);
  }

  return {
    input,
    output,
  };
}

/* -------------------------------------------------------------------------- */
/* ORBIT TRACE                                                                */
/* -------------------------------------------------------------------------- */

function OrbitTrace({ cap, i, count, p, rm }) {
  const width = (CAPS_END - CAPS_START) / count;

  const start = CAPS_START + i * width;
  const end = start + width;
  const enter = start + width * 0.15;

  const opacity = useTransform(
    p,
    rm
      ? [0, 1]
      : [start, enter, end, COMPLETE_START, COMPLETE_MID, COMPLETE_END, 1],
    rm ? [1, 1] : [0, 0.9, 0.55, 0.55, 0.8, 0.5, 0],
  );

  /*
   * Position each capability around the primary orbit.
   */
  const angle = (i / count) * Math.PI * 2 - Math.PI / 2;

  const orbit = 42;

  const left = `${50 + Math.cos(angle) * orbit}%`;
  const top = `${50 + Math.sin(angle) * orbit}%`;

  return (
    <motion.h3
      style={{
        left,
        top,
        x: "-50%",
        y: "-50%",
        opacity,
      }}
      className="
        absolute
        z-30
        whitespace-nowrap
        rounded-full
        border
        border-primary/30
        bg-background/85
        px-3
        py-1.5
        font-display
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.12em]
        text-foreground
        shadow-sm
        backdrop-blur-md
        md:px-4
        md:py-2
        md:text-xs
      "
    >
      {cap}
    </motion.h3>
  );
}

/* -------------------------------------------------------------------------- */
/* ACTIVE CAPABILITY                                                           */
/* -------------------------------------------------------------------------- */

function ActiveBeat({ cap, i, count, p, rm, Icon }) {
  const width = (CAPS_END - CAPS_START) / count;

  const start = CAPS_START + i * width;
  const end = start + width;

  const enter = start + width * 0.15;
  const exit = end - width * 0.15;

  const opacity = useTransform(
    p,
    rm ? [0, 1] : [start, enter, exit, end],
    rm ? [1, 1] : [0, 1, 1, 0],
  );

  /*
   * Capability enters from below and exits upward.
   */
  const y = useTransform(
    p,
    rm ? [0, 1] : [start, enter, exit, end],
    rm ? ["0%", "0%"] : ["24%", "0%", "0%", "-18%"],
  );

  /*
   * Subtle scale gives the capability a physical "arrival".
   */
  const scale = useTransform(
    p,
    rm ? [0, 1] : [start, enter, exit, end],
    rm ? [1, 1] : [0.94, 1, 1, 0.97],
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
        inset-0
        flex
        flex-col
        items-center
        justify-center
      "
    >
      {/* Icon + sequence number */}
      <div className="mb-3 flex items-center gap-3">
        <span
          className="
            grid
            h-8
            w-8
            place-items-center
            rounded-full
            border
            border-primary/60
            bg-primary/10
          "
        >
          <Icon
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
            className="text-primary"
          />
        </span>

        <span
          className="
            label
            font-semibold
            tracking-[0.2em]
            text-primary
          "
        >
          0{i + 1}
        </span>
      </div>

      {/* Capability name */}
      <span
        className="
          font-display
          text-[clamp(2rem,5vw,3.5rem)]
          font-semibold
          uppercase
          leading-none
          tracking-tight
          text-foreground
        "
      >
        {cap}
      </span>

      {/* Supporting label */}
      <span
        className="
          mt-3
          text-xs
          font-medium
          uppercase
          tracking-[0.3em]
          text-muted-foreground
        "
      >
        360° capability
      </span>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* REDUCED MOTION                                                             */
/* -------------------------------------------------------------------------- */

function StaticSystem({ t }) {
  const caps = t.scene360.caps;

  return (
    <section
      data-chapter="system"
      className="
        relative
        border-y
        border-border
        bg-card/30
        px-5
        py-32
        md:px-10
        md:py-48
      "
    >
      <div className="mx-auto max-w-[72rem]">
        <p className="label text-primary">{t.scene360.integrated}</p>

        <h2
          className="
            mt-10
            font-editorial
            text-[7vw]
            leading-[1.2]
            tracking-tight
            md:text-[3.4rem]
            md:leading-[1.15]
          "
        >
          {t.scene360.copy}
        </h2>

        <div className="mt-16 flex flex-wrap gap-3 md:mt-24">
          {caps.map((cap) => (
            <h3
              key={cap}
              className="
                label
                border
                border-border
                bg-background
                px-4
                py-2
                text-foreground
              "
            >
              {cap}
            </h3>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SYSTEM — 360° PRECISION MECHANISM                                         */
/* -------------------------------------------------------------------------- */

export default function Scene360() {
  const { t } = useLang();

  const rm = useReducedMotion();

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /*
   * Same spring philosophy used throughout the site.
   *
   * Enough smoothing to make the mechanism feel physical,
   * but not so much that fast scrolling causes the animation
   * to lag behind the pinned section.
   */
  const p = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 26,
    mass: 0.3,
  });

  const caps = t.scene360.caps;

  const count = caps.length;

  /* ------------------------------------------------------------------------ */
  /* CHAPTER LINE                                                             */
  /* ------------------------------------------------------------------------ */

  const lineOpacity = useTransform(p, [0, 0.03], [0, 1]);

  /* ------------------------------------------------------------------------ */
  /* OPENING STATEMENT                                                        */
  /* ------------------------------------------------------------------------ */

  const statementOpacity = useTransform(
    p,
    [0, ENTRY_END - 0.03, ENTRY_END],
    [1, 1, 0],
  );

  const statementY = useTransform(
    p,
    [0, 0.03, ENTRY_END - 0.03, ENTRY_END],
    ["30%", "0%", "0%", "-20%"],
  );

  /* ------------------------------------------------------------------------ */
  /* CENTRAL CORE                                                             */
  /* ------------------------------------------------------------------------ */

  const coreOpacity = useTransform(
    p,
    [ENTRY_END - 0.02, ENTRY_END, COMPLETE_END, 0.96],
    [0, 1, 1, 0],
  );

  const coreScale = useTransform(
    p,
    [ENTRY_END, 0.18, CAPS_END, COMPLETE_END],
    [0.8, 1, 1.05, 1],
  );

  /* ------------------------------------------------------------------------ */
  /* RING GROUP                                                               */
  /* ------------------------------------------------------------------------ */

  const ringGroupScale = useTransform(
    p,
    [0.03, 0.09, COMPLETE_END, 0.96],
    [0, 1, 1, 0.15],
  );

  const ringGroupOpacity = useTransform(
    p,
    [0.03, 0.08, COMPLETE_END, 0.96],
    [0, 1, 1, 0],
  );

  /* ------------------------------------------------------------------------ */
  /* 360° ROTATION MECHANISM                                                  */
  /* ------------------------------------------------------------------------ */

  const ring1 = buildClickTimeline(count, 360);
  const ring2 = buildClickTimeline(count, -360);
  const ring3 = buildClickTimeline(count, 720);

  const ring1Rotate = useTransform(p, ring1.input, ring1.output);

  const ring2Rotate = useTransform(p, ring2.input, ring2.output);

  const ring3Rotate = useTransform(p, ring3.input, ring3.output);

  /*
   * Separate visual rotation for the 360° label.
   *
   * It rotates continuously around the mechanism,
   * reinforcing the 360° concept without controlling
   * the actual mechanical rings.
   */
  const orbitLabelRotate = useTransform(p, [CAPS_START, CAPS_END], [0, -360]);

  /* ------------------------------------------------------------------------ */
  /* HANDOFF                                                                  */
  /* ------------------------------------------------------------------------ */

  const handoffScale = useTransform(p, [COMPLETE_END, 0.96], [0, 1]);

  const handoffOpacity = useTransform(
    p,
    [COMPLETE_END, COMPLETE_END + 0.03],
    [0, 1],
  );

  /* ------------------------------------------------------------------------ */
  /* REDUCED MOTION                                                           */
  /* ------------------------------------------------------------------------ */

  if (rm) {
    return <StaticSystem t={t} />;
  }

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <section
      ref={ref}
      data-chapter="system"
      className="
        relative
        h-[290vh]
        md:h-[340vh]
      "
    >
      <div
        className="
          sticky
          top-0
          flex
          h-[100dvh]
          flex-col
          items-center
          justify-center
          gap-6
          overflow-hidden
          pt-[var(--header-h)]
          md:gap-8
        "
      >
        {/* ---------------------------------------------------------------- */}
        {/* CHAPTER CONTINUATION LINE                                       */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          style={{
            opacity: lineOpacity,
          }}
          className="
            absolute
            inset-x-0
            top-0
            z-20
            h-px
            bg-border
          "
        />

        {/* ---------------------------------------------------------------- */}
        {/* OPENING STATEMENT                                               */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          style={{
            opacity: statementOpacity,
            y: statementY,
          }}
          className="
            absolute
            inset-x-0
            top-[calc(var(--header-h)+1rem)]
            z-10
            mx-auto
            max-w-[72rem]
            px-5
            text-center
            md:top-[calc(var(--header-h)+1.5rem)]
            md:px-10
          "
        >
          <p className="label font-semibold text-primary">
            {t.scene360.integrated}
          </p>

          <h2
            className="
              mt-8
              text-balance
              font-editorial
              text-[7vw]
              leading-[1.15]
              tracking-tight
              text-foreground
              md:mt-10
              md:text-[3.4rem]
              md:leading-[1.1]
            "
          >
            {t.scene360.copy}
          </h2>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* 360° MECHANISM                                                  */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            relative
            flex
            h-[min(68vw,48svh,30rem)]
            w-[min(68vw,48svh,30rem)]
            items-center
            justify-center
          "
        >
          {/* ============================================================ */}
          {/* OUTER ORBIT                                                  */}
          {/* ============================================================ */}

          <motion.div
            style={{
              scale: ringGroupScale,
              opacity: ringGroupOpacity,
              rotate: ring1Rotate,
            }}
            className="
              absolute
              inset-0
              rounded-full
              border-[2px]
              border-primary/70
            "
          >
            {/* Orbit marker */}
            <span
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-0
                h-3
                w-3
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-primary
                shadow-[0_0_18px_currentColor]
              "
            />
          </motion.div>

          {/* ============================================================ */}
          {/* SECONDARY ORBIT                                               */}
          {/* ============================================================ */}

          <motion.div
            style={{
              scale: ringGroupScale,
              opacity: ringGroupOpacity,
              rotate: ring2Rotate,
            }}
            className="
              absolute
              inset-[12%]
              rounded-full
              border
              border-primary/45
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-0
                h-2
                w-2
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-primary/80
              "
            />
          </motion.div>

          {/* ============================================================ */}
          {/* INNER ORBIT                                                  */}
          {/* ============================================================ */}

          <motion.div
            style={{
              scale: ringGroupScale,
              opacity: ringGroupOpacity,
              rotate: ring3Rotate,
            }}
            className="
              absolute
              inset-[25%]
              rounded-full
              border
              border-foreground/25
            "
          />

          {/* ============================================================ */}
          {/* ROTATING 360° LABEL                                           */}
          {/* ============================================================ */}

          <motion.div
            style={{
              opacity: ringGroupOpacity,
              rotate: orbitLabelRotate,
            }}
            className="
              pointer-events-none
              absolute
              inset-[6%]
              flex
              items-start
              justify-center
            "
          >
            <span
              className="
                mt-1
                font-display
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-primary
                md:text-xs
              "
            >
              360°
            </span>
          </motion.div>

          {/* ============================================================ */}
          {/* CENTRAL CORE                                                 */}
          {/* ============================================================ */}

          <motion.div
            style={{
              opacity: coreOpacity,
              scale: coreScale,
            }}
            className="
              relative
              z-10
              flex
              h-[38%]
              w-[38%]
              flex-col
              items-center
              justify-center
              rounded-full
              border-2
              border-primary/70
              bg-background/90
              text-center
              shadow-[0_0_50px_rgba(0,132,61,0.18)]
              backdrop-blur-sm
            "
          >
            <span
              className="
                font-display
                text-[clamp(1.75rem,5vw,3.5rem)]
                font-semibold
                leading-none
                tracking-tight
                text-foreground
              "
            >
              360°
            </span>

            <span
              className="
                mt-2
                label
                font-semibold
                tracking-[0.18em]
                text-primary
              "
            >
              {t.scene360.integrated}
            </span>
          </motion.div>

          {/* ============================================================ */}
          {/* CAPABILITY ORBIT LABELS                                      */}
          {/* ============================================================ */}

          {caps.map((cap, i) => (
            <OrbitTrace key={cap} cap={cap} i={i} count={count} p={p} rm={rm} />
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* ACTIVE CAPABILITY READOUT                                      */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            relative
            h-[16vh]
            w-full
            max-w-xl
            px-5
            md:h-28
          "
          aria-hidden="true"
        >
          {caps.map((cap, i) => (
            <ActiveBeat
              key={cap}
              cap={cap}
              i={i}
              count={count}
              p={p}
              rm={rm}
              Icon={CAP_ICONS[i]}
            />
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* HANDOFF                                                        */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          style={{
            scaleX: handoffScale,
            opacity: handoffOpacity,
            transformOrigin: "center",
          }}
          className="
            absolute
            inset-x-0
            bottom-0
            z-20
            h-px
            bg-border
          "
        />
      </div>
    </section>
  );
}
