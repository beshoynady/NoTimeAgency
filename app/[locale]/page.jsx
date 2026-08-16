import SiteNav from "@/components/site/SiteNav";
import TickRail from "@/components/motion/TickRail";
import CursorGlow from "@/components/motion/CursorGlow";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Process from "@/components/home/Process";
import Scene360 from "@/components/home/Scene360";
import Services from "@/components/home/Services";
import TrustedBy from "@/components/home/TrustedBy";
import Work from "@/components/home/Work";
import AiMotion from "@/components/home/AiMotion";
import Capabilities from "@/components/home/Capabilities";
import Markets from "@/components/home/Markets";
import Talents from "@/components/home/Talents";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
import { translations } from "@/i18n/translations";
import { IMG } from "@/lib/images";

const SITE_URL = "https://notime.agency";

export async function generateMetadata({ params }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "ar" ? "ar" : "en";
  const t = translations[locale].seo;
  const ogLocale = locale === "ar" ? "ar_AR" : "en_US";

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      url: `${SITE_URL}/${locale}`,
      siteName: "NO TIME",
      locale: ogLocale,
      type: "website",
      images: [IMG.hero],
    },
    twitter: {
      card: "summary_large_image",
      title: t.ogTitle,
      description: t.ogDescription,
      images: [IMG.hero],
    },
  };
}

// Homepage composition root. Every section below owns its own content,
// motion and (where needed) 'use client' boundary — this file only
// assembles them in order.
export default function Page() {
  return (
    <div id="top" className="grain relative min-h-screen">
      <SiteNav />
      <TickRail />
      <CursorGlow />

      <main>
        <Hero />
        <Marquee />
        <Process />
        <Scene360 />
        <Services />
        <TrustedBy />
        <Work />
        <AiMotion />
        <Capabilities />
        <Markets />
        <Talents />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
