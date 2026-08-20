"use client";

import { useLang } from "@/i18n/LanguageContext";

export default function Marquee() {
  const { t, dir } = useLang();

  const isRTL = dir === "rtl";

  /*
   * We intentionally keep each marquee group separate.
   * The animation moves exactly one complete group.
   *
   * Repeating the source items several times makes sure
   * the group is always wide enough to cover large screens.
   */
  const group = [...t.marquee, ...t.marquee, ...t.marquee];

  return (
    <section
      aria-hidden="true"
      className="
        group
        relative
        overflow-hidden
        border-y
        border-border
        bg-background
      "
    >
      {/* TOP ACCENT */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-primary/50
          to-transparent
        "
      />

      {/* MARQUEE VIEWPORT */}
      <div
        className="
          relative
          overflow-hidden
          py-5
          sm:py-6
          md:py-7
        "
        dir="ltr"
      >
        <div
          className={`
            marquee-track
            ${isRTL ? "animate-marquee-rtl" : "animate-marquee"}
          `}
        >
          {/* ==========================================
              GROUP 1
          ========================================== */}

          <div className="marquee-group">
            {group.map((txt, i) => (
              <MarqueeItem key={`group-1-${txt}-${i}`} text={txt} />
            ))}
          </div>

          {/* ==========================================
              GROUP 2 — EXACT DUPLICATE
          ========================================== */}

          <div className="marquee-group" aria-hidden="true">
            {group.map((txt, i) => (
              <MarqueeItem key={`group-2-${txt}-${i}`} text={txt} />
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM ACCENT */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-primary/30
          to-transparent
        "
      />
    </section>
  );
}

/* =====================================================
   MARQUEE ITEM
   ===================================================== */

function MarqueeItem({ text }) {
  return (
    <span
      className="
        flex
        shrink-0
        items-center
        whitespace-nowrap
      "
    >
      {/* MAIN STATEMENT */}

      <span
        className="
          font-display
          text-[clamp(1.8rem,4vw,4.5rem)]
          uppercase
          leading-none
          tracking-[-0.035em]
          text-foreground/80
          transition-colors
          duration-500
          group-hover:text-foreground
        "
      >
        {text}
      </span>

      {/* PRECISION SEPARATOR */}

      <span
        className="
          mx-7
          flex
          items-center
          gap-2
          text-primary
          sm:mx-9
          md:mx-12
        "
      >
        <span
          className="
            h-1
            w-1
            rounded-full
            bg-primary
            md:h-1.5
            md:w-1.5
          "
        />

        <span
          className="
            font-display
            text-2xl
            leading-none
            md:text-4xl
          "
        >
          /
        </span>

        <span
          className="
            h-1
            w-1
            rounded-full
            bg-primary
            md:h-1.5
            md:w-1.5
          "
        />
      </span>
    </span>
  );
}
