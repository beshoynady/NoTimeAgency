'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import Reveal from "@/components/Reveal";
import { IMG } from "@/lib/images";

const EASE = [0.16, 1, 0.3, 1];

export default function Markets() {
  const { t, dir } = useLang();

  const isRTL = dir === "rtl";

  return (
    <section
      data-chapter="reach"
      aria-label={t.markets.heading}
      className="
        relative
        isolate
        min-h-[70dvh]
        overflow-hidden
        border-b
        border-border
        bg-background
      "
    >
      {/* -------------------------------------------------
          BACKGROUND
      ------------------------------------------------- */}

      <div className="absolute inset-0 -z-20">
        <Image
          src={IMG.skyline}
          alt=""
          fill
          sizes="100vw"
          className="
            object-cover
            opacity-[0.18]
            grayscale
          "
        />
      </div>

      {/* Dark editorial overlay */}

      <div
        className="
          absolute
          inset-0
          -z-10
          bg-gradient-to-b
          from-background/80
          via-background/65
          to-background
        "
      />

      {/* Subtle vignette */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background)/0.45)_75%)]
        "
      />

      {/* -------------------------------------------------
          CONTENT
      ------------------------------------------------- */}

      <div
        className="
          mx-auto
          flex
          min-h-[70dvh]
          max-w-[90rem]
          flex-col
          px-5
          py-16
          sm:py-20
          md:px-10
          md:py-24
          lg:justify-center
          lg:py-20
        "
      >
        {/* -------------------------------------------------
            HEADER
        ------------------------------------------------- */}

        <div
          className="
            flex
            flex-col
            gap-5
            border-b
            border-border
            pb-7
            md:flex-row
            md:items-end
            md:justify-between
            md:pb-8
          "
        >
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="label text-primary">
                  06
                </span>

                <span className="h-px w-8 bg-primary/60" />

                <span className="label text-muted-foreground">
                  {isRTL ? "الانتشار" : "REACH"}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                className="
                  mt-5
                  max-w-4xl
                  text-balance
                  font-display
                  text-[clamp(2.5rem,6vw,6rem)]
                  uppercase
                  leading-[0.85]
                  tracking-tight
                "
              >
                {t.markets.heading}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p
              className="
                max-w-xs
                text-pretty
                text-sm
                leading-relaxed
                text-muted-foreground
                md:text-right
                rtl:md:text-left
              "
            >
              {isRTL
                ? "حضور إقليمي يمتد عبر أسواق ومجتمعات متعددة."
                : "A regional presence spanning markets, communities and experiences."}
            </p>
          </Reveal>
        </div>

        {/* -------------------------------------------------
            MARKETS GRID
        ------------------------------------------------- */}

        <div
          className="
            mt-10
            grid
            grid-cols-2
            gap-x-4
            gap-y-8
            sm:grid-cols-3
            sm:gap-x-6
            md:mt-12
            md:gap-x-8
            md:gap-y-10
            lg:grid-cols-6
            lg:gap-x-5
            lg:gap-y-0
          "
        >
          {t.markets.items.map((market, index) => (
            <Reveal
              key={market.code}
              delay={0.08 + index * 0.07}
            >
              <MarketItem
                market={market}
                index={index}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------
   MARKET ITEM
------------------------------------------------- */

function MarketItem({ market, index }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
      tabIndex={0}
      className="
        group
        relative
        cursor-default
        border-t
        border-border
        pt-4
        outline-none
        md:pt-5
      "
    >
      {/* Animated top line */}

      <motion.div
        variants={{
          rest: {
            scaleX: 0.35,
          },
          hover: {
            scaleX: 1,
          },
        }}
        transition={{
          duration: 0.55,
          ease: EASE,
        }}
        style={{
          transformOrigin: "left",
        }}
        className="
          absolute
          inset-x-0
          top-0
          h-px
          bg-primary
        "
      />

      {/* Index */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <span
          className="
            label
            text-muted-foreground
            transition-colors
            duration-500
            group-hover:text-primary
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <motion.span
          variants={{
            rest: {
              opacity: 0.35,
              x: 0,
            },
            hover: {
              opacity: 1,
              x: 4,
            },
          }}
          transition={{
            duration: 0.4,
            ease: EASE,
          }}
          className="
            text-primary
          "
        >
          →
        </motion.span>
      </div>

      {/* Market code */}

      <motion.p
        variants={{
          rest: {
            y: 0,
          },
          hover: {
            y: -4,
          },
        }}
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
        className="
          mt-5
          font-display
          text-[clamp(2.5rem,5vw,4.5rem)]
          uppercase
          leading-[0.8]
          tracking-tight
          text-foreground
          transition-colors
          duration-500
          group-hover:text-primary
          group-focus-visible:text-primary
        "
      >
        {market.code}
      </motion.p>

      {/* Market name */}

      <p
        className="
          mt-4
          max-w-[12rem]
          text-sm
          leading-snug
          text-muted-foreground
          transition-colors
          duration-500
          group-hover:text-foreground
          group-focus-visible:text-foreground
        "
      >
        {market.name}
      </p>

      {/* Bottom active indicator */}

      <motion.div
        variants={{
          rest: {
            width: "0%",
            opacity: 0,
          },
          hover: {
            width: "42%",
            opacity: 1,
          },
        }}
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
        className="
          mt-5
          h-px
          bg-primary
        "
      />
    </motion.div>
  );
}
