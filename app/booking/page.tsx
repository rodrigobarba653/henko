"use client";

import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import { useLanguage } from "@/contexts/LanguageContext";

const GLOFOX_IFRAME_SRC =
  "https://app.glofox.com/portal/#/branch/694429272459803e3e0d5054/classes-day-view";

const BOOKING_HERO_IMAGE = "/images/hero.jpg";

export default function BookingPage() {
  const { t } = useLanguage();
  return (
    <>
      <main className="bg-bg-beige min-h-screen flex flex-col">
        <ServiceHero
          heading={t.common.bookingHeroHeading}
          subheading={t.common.bookingHeroSubheading}
          imageUrl={BOOKING_HERO_IMAGE}
          imageUrlMobile="/images/hero-mobile.jpg"
        />
        <div className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full h-[1600px] rounded-2xl border border-main-green/20 bg-white overflow-hidden">
            <iframe
              src={GLOFOX_IFRAME_SRC}
              frameBorder={0}
              width="100%"
              height="100%"
              className="w-full h-full border-0 block"
              title="Booking System"
            />
          </div>
          <div className="mt-6 text-center pb-8">
            <a
              href="https://www.glofox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#1a1a1a]/70 hover:text-main-green transition-colors"
            >
              powered by <b>Glofox</b>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
