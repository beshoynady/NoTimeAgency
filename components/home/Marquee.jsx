'use client';

import { useLang } from "@/i18n/LanguageContext";

export default function Marquee() {
  const { t, dir } = useLang();

  /*
   * We render three copies instead of two.
   * This gives the animation enough content to remain seamless
   * on very wide screens without exposing an empty gap.
   */
  const row = [...t.marquee, ...t.marquee, ...t.marquee];

  const isRTL = dir === "rtl";

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
      {/* -------------------------------------------------
          SUBTLE TOP ACCENT
      ------------------------------------------------- */}

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

      {/* -------------------------------------------------
          MARQUEE
      ------------------------------------------------- */}

      <div
        className="
          relative
          overflow-hidden
          py-5
          sm:py-6
          md:py-7
        "
      >
        <div
          className={`
            marquee-track
            flex
            w-max
            items-center
            ${
              isRTL
                ? "animate-marquee-rtl"
                : "animate-marquee"
            }
            group-hover:[animation-play-state:paused]
          `}
        >
          {row.map((txt, i) => (
            <span
              key={`${txt}-${i}`}
              className="
                flex
                shrink-0
                items-center
                whitespace-nowrap
              "
            >
              {/* Main statement */}

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
                {txt}
              </span>

              {/* Precision separator */}

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
          ))}
        </div>
      </div>

      {/* -------------------------------------------------
          BOTTOM ACCENT
      ------------------------------------------------- */}

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
