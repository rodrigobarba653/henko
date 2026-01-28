"use client";

import { useRef, useEffect } from "react";
import Button from "./ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface HomeHeroProps {
  heading?: string;
  subheading?: string;
  showButtons?: boolean;
}

export default function HomeHero({
  heading,
  subheading,
  showButtons = true,
}: HomeHeroProps = {}) {
  const { t } = useLanguage();
  const { openModal } = useBookingModal();
  const heroHeading = heading || t.hero.heading;
  const heroSubheading = subheading || t.hero.subheading;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageElementRef = useRef<HTMLImageElement>(null);
  const glassOverlayRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const textElementsRef = useRef<(HTMLElement | null)[]>([]);

  // Populate text elements array after refs are mounted
  useEffect(() => {
    textElementsRef.current = [];
    if (subheadingRef.current) {
      textElementsRef.current.push(subheadingRef.current);
    }
    if (showButtons && buttonsRef.current) {
      textElementsRef.current.push(buttonsRef.current);
    }
  }, [showButtons]);

  useScrollReveal({
    trigger: heroSectionRef,
    start: "top 95%", // Trigger early since it's the hero section
    elements: [
      { ref: headingRef, preset: "fadeUp", splitLetters: true, stagger: 0.03, duration: 0.6 },
      { 
        ref: imageWrapperRef, 
        preset: "fadeScale", 
        duration: 1.2,
        customFrom: { scale: 0.9, opacity: 0, filter: "blur(10px)" },
        customTo: { scale: 1, opacity: 1, filter: "blur(0px)" },
        // Start image animation very shortly after heading begins (while letters are still animating)
        // Heading duration = 0.6s, position "-=0.5" => image starts at ~0.1s into heading animation
        position: "-=0.5",
      },
      { 
        ref: imageElementRef, 
        preset: "fadeScale", 
        duration: 1.2,
        customFrom: { scale: 1.111 }, // 1 / 0.9 (counterScale)
        customTo: { scale: 1 },
        position: "<", // Start with image wrapper
      },
      { 
        ref: glassOverlayRef, 
        preset: "fadeUp", 
        duration: 1.2,
        customFrom: { opacity: 1, backdropFilter: "blur(20px) saturate(180%)" },
        customTo: { opacity: 0, backdropFilter: "blur(0px) saturate(100%)" },
        position: "<", // Start with image wrapper
      },
      // Text fades in slightly after heading, while image is already animating
      { ref: textElementsRef, preset: "fadeUp", stagger: 0.2, duration: 0.8 },
    ],
  });

  return (
    <section ref={heroSectionRef} className="min-h-screen md:pt-12 pt-20">
      <div className="max-w-7xl mx-auto p-4 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-12 items-center">
          {/* Left side - 40% - Text content */}
          <div className="sm:col-span-5">
            <h1
              ref={headingRef}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1a1a1a] font-heading mb-6"
            >
              {heroHeading}
            </h1>
            <p ref={subheadingRef} className="text-lg text-[#2a2a2a] mb-8">
              {heroSubheading}
            </p>
            {showButtons && (
              <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" onClick={openModal}>{t.hero.buttonPrimary}</Button>
                <Button variant="secondary">{t.hero.buttonSecondary}</Button>
              </div>
            )}
          </div>

          {/* Right side - 70% - Image */}
          <div className="sm:col-span-5">
            <div
              ref={imageWrapperRef}
              className="relative w-full md:aspect-[11/12] aspect-[3/2] rounded-[2rem] overflow-hidden"
            >
              <img
                ref={imageElementRef}
                src="/images/hero.jpg"
                alt={t.hero.imageAlt}
                className="w-full h-full object-cover"
              />
              {/* Glass overlay that fades to solid */}
              <div
                ref={glassOverlayRef}
                className="absolute inset-0 bg-white/30"
                style={{
                  backdropFilter: "blur(20px) saturate(180%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
