'use client';

import Image from "next/image";
import { useLang } from "@/i18n/LanguageContext";
import { LOGOS } from "@/lib/images";

/*
 * TRUSTED BY
 * ---------------------------------------------------------
 * Editorial credibility strip.
 *
 * Design principles:
 * - Fixed editorial label on desktop.
 * - Continuous monochrome logo movement.
 * - Individual logo sizing based on its actual aspect ratio.
 * - UAE Athletics Federation receives a larger visual weight.
 * - No layout shift on hover.
 * - RTL-aware marquee.
 * - Accessible non-duplicated client list.
 *
 * Marquee architecture:
 * - Each animation contains TWO identical groups.
 * - The animation moves exactly one group (-50%).
 * - Because both groups are identical, the loop reset is invisible.
 */


/* =========================================================
   REAL LOGO SOURCE DIMENSIONS
   ========================================================= */

const LOGO_DIMS = {
  uaeProLeague: {
    w: 641,
    h: 184,
  },

  uaeAthleticsFederation: {
    w: 380,
    h: 132,
  },

  egyptair: {
    w: 100,
    h: 15,
  },

  dubaiAirshow: {
    w: 147,
    h: 40,
  },

  atm: {
    w: 592,
    h: 200,
  },
};


/* =========================================================
   OPTICAL LOGO SIZES
   =========================================================
 *
 * These values are intentionally independent from the
 * source image dimensions.
 *
 * The objective is optical balance rather than mathematical
 * equality between logos.
 */

const LOGO_SIZES = {
  uaeProLeague: "h-8 md:h-10",

  uaeAthleticsFederation:
    "h-12 md:h-[4.25rem]",

  egyptair:
    "h-5 md:h-6",

  dubaiAirshow:
    "h-7 md:h-9",

  atm:
    "h-8 md:h-10",
};


/* =========================================================
   CLIENT MARK
   ========================================================= */

function ClientMark({ client }) {
  const src = client.key
    ? LOGOS[client.key]
    : null;

  const dims = client.key
    ? LOGO_DIMS[client.key]
    : null;


  /*
   * REAL LOGO
   */

  if (src && dims) {
    const sizeClass =
      LOGO_SIZES[client.key] ??
      "h-8 md:h-10";

    return (
      <div
        className="
          flex
          h-14
          min-w-[9rem]
          items-center
          justify-center
          md:h-16
          md:min-w-[11rem]
        "
      >
        <Image
          src={src}
          alt={client.name}
          width={dims.w}
          height={dims.h}
          className={`
            ${sizeClass}
            w-auto
            max-w-[12rem]
            object-contain
            grayscale
            brightness-0
            invert
            opacity-60
            transition-[opacity,transform]
            duration-500
            ease-out
            group-hover:scale-[1.04]
            group-hover:opacity-100
          `}
        />
      </div>
    );
  }


  /*
   * TEXT FALLBACK
   */

  return (
    <div
      className="
        flex
        min-w-[10rem]
        flex-col
        justify-center
        leading-none
      "
    >
      <span
        className="
          font-display
          text-xl
          uppercase
          tracking-tight
          text-foreground/70
          transition-colors
          duration-500
          group-hover:text-foreground
          md:text-2xl
        "
      >
        {client.name}
      </span>

      {client.sub && (
        <span
          className="
            label
            mt-2
            text-muted-foreground/60
          "
        >
          {client.sub}
        </span>
      )}
    </div>
  );
}


/* =========================================================
   TRUSTED CLIENT ITEM
   =========================================================
 *
 * Kept separate so both marquee groups use the exact same
 * markup and spacing.
 */

function TrustedClient({ client }) {
  return (
    <div
      className="
        group
        flex
        shrink-0
        items-center
      "
    >
      <ClientMark client={client} />


      {/* -----------------------------------------------
          EDITORIAL SEPARATOR
      ----------------------------------------------- */}

      <span
        aria-hidden="true"
        className="
          mx-5
          flex
          items-center
          gap-2
          text-primary/70
          md:mx-7
        "
      >
        <span
          className="
            h-1
            w-1
            rounded-full
            bg-primary/70
          "
        />

        <span
          className="
            font-display
            text-xl
            leading-none
            md:text-2xl
          "
        >
          /
        </span>
      </span>
    </div>
  );
}


/* =========================================================
   TRUSTED BY
   ========================================================= */

export default function TrustedBy() {
  const { t, dir } = useLang();

  const clients =
    t.trustedBy.clients;

  const isRTL =
    dir === "rtl";


  /*
   * Build ONE complete marquee group.
   *
   * Repeating the source clients inside the group makes the
   * group wide enough for large displays.
   *
   * IMPORTANT:
   * We then duplicate this COMPLETE group below.
   *
   * Therefore:
   *
   * GROUP 1 === GROUP 2
   *
   * and the animation can move exactly -50% with an invisible
   * reset.
   */

  const group = [
    ...clients,
    ...clients,
    ...clients,
  ];


  return (
    <section
      data-chapter="proof"
      aria-label={t.trustedBy.label}
      className="
        relative
        overflow-hidden
        border-y
        border-border
        bg-background
      "
    >


      {/* =================================================
          TOP ACCENT
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-primary/30
          to-transparent
        "
      />


      {/* =================================================
          MAIN ROW
      ================================================= */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-stretch
        "
      >


        {/* =================================================
            LABEL
        ================================================= */}

        <div
          className="
            relative
            flex
            shrink-0
            items-center
            border-b
            border-border
            px-5
            py-4
            md:w-[12rem]
            md:border-b-0
            md:border-e
            md:px-8
            md:py-0
            lg:w-[14rem]
            lg:px-10
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-primary
              "
            />

            <p
              className="
                label
                whitespace-nowrap
                text-muted-foreground
              "
            >
              {t.trustedBy.label}
            </p>
          </div>
        </div>


        {/* =================================================
            LOGO VIEWPORT
        ================================================= */}

        <div
          className="
            relative
            min-w-0
            flex-1
            overflow-hidden
          "
        >


          {/* -----------------------------------------------
              LEFT FADE
          ----------------------------------------------- */}

          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-0
              z-20
              w-12
              bg-gradient-to-r
              from-background
              to-transparent
              md:w-24
            "
          />


          {/* -----------------------------------------------
              RIGHT FADE
          ----------------------------------------------- */}

          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              right-0
              z-20
              w-12
              bg-gradient-to-l
              from-background
              to-transparent
              md:w-24
            "
          />


          {/* =================================================
              SEAMLESS MARQUEE TRACK

              IMPORTANT:
              dir="ltr" is intentional.

              We control the actual movement using the
              RTL/LTR animation instead of allowing CSS RTL
              to alter flex ordering.
          ================================================= */}

          <div
            className={`
              marquee-track
              ${
                isRTL
                  ? "animate-marquee-rtl"
                  : "animate-marquee"
              }
            `}
            dir="ltr"
          >


            {/* =============================================
                GROUP 1
            ============================================= */}

            <div
              className="
                marquee-group
              "
            >
              {group.map(
                (client, index) => (
                  <TrustedClient
                    key={`group-1-${client.name}-${index}`}
                    client={client}
                  />
                )
              )}
            </div>


            {/* =============================================
                GROUP 2
                EXACT DUPLICATE OF GROUP 1

                aria-hidden prevents duplicate content from
                being announced to assistive technologies.
            ============================================= */}

            <div
              className="
                marquee-group
              "
              aria-hidden="true"
            >
              {group.map(
                (client, index) => (
                  <TrustedClient
                    key={`group-2-${client.name}-${index}`}
                    client={client}
                  />
                )
              )}
            </div>


          </div>
        </div>
      </div>


      {/* =================================================
          ACCESSIBLE CLIENT LIST

          The visual marquee is hidden from accessibility
          because it is decorative/duplicated.

          This list contains each client exactly once.
      ================================================= */}

      <ul className="sr-only">
        {clients.map((client) => (
          <li key={client.name}>
            {client.name}
          </li>
        ))}
      </ul>


      {/* =================================================
          BOTTOM ACCENT
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-primary/20
          to-transparent
        "
      />


    </section>
  );
}