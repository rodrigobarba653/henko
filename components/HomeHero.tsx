"use client";

import { useRef, useEffect, useState } from "react";
import Button from "./ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const HERO_SLIDES = [
  { src: "/images/hero.jpg", alt: "Henko wellness" },
  { src: "/images/biohacking.jpg", alt: "Biohacking and recovery" },
  { src: "/images/spa.jpg", alt: "Spa and beauty" },
];

const AUTOPLAY_INTERVAL_MS = 5000;

interface HomeHeroProps {
  heading?: string;
  subheading?: string;
  showButtons?: boolean;
  slides?: Array<{ src: string; alt: string }>;
}

export default function HomeHero({
  heading,
  subheading,
  showButtons = true,
  slides = HERO_SLIDES,
}: HomeHeroProps = {}) {
  const { t } = useLanguage();
  const heroHeading = heading || t.hero.heading;
  const heroSubheading = subheading || t.hero.subheading;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const glassOverlayRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const textElementsRef = useRef<(HTMLElement | null)[]>([]);

  // Auto-advance carousel (pauses on hover)
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

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
    start: "top 95%",
    elements: [
      {
        ref: headingRef,
        preset: "fadeUp",
        splitLetters: true,
        stagger: 0.03,
        duration: 0.6,
      },
      {
        ref: imageWrapperRef,
        preset: "fadeScale",
        duration: 1.2,
        customFrom: { scale: 0.9, opacity: 0, filter: "blur(10px)" },
        customTo: { scale: 1, opacity: 1, filter: "blur(0px)" },
        position: "-=0.5",
      },
      {
        ref: glassOverlayRef,
        preset: "fadeUp",
        duration: 1.2,
        customFrom: { opacity: 1, backdropFilter: "blur(20px) saturate(180%)" },
        customTo: { opacity: 0, backdropFilter: "blur(0px) saturate(100%)" },
        position: "<",
      },
      { ref: textElementsRef, preset: "fadeUp", stagger: 0.2, duration: 0.8 },
    ],
  });

  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <section ref={heroSectionRef} className="relative w-full">
      <div
        ref={imageWrapperRef}
        className="relative w-full aspect-[3/2] md:aspect-[20/9] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides track */}
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.src + index}
              className="relative w-full flex-shrink-0 h-full"
            >
              <img
                src={slide.src}
                alt={index === 0 ? t.hero.imageAlt : slide.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
              />
            </div>
          ))}
        </div>
        {/* Glass overlay that fades out on reveal */}
        <div
          ref={glassOverlayRef}
          className="absolute inset-0 bg-white/30 pointer-events-none"
          style={{
            backdropFilter: "blur(20px) saturate(180%)",
          }}
        />
        {/* Gradient for text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none"
          aria-hidden
        />
        {/* Centered text on top */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center pointer-events-none">
          <div className="pointer-events-auto">
            <h1 className="sr-only">{heroHeading}</h1>
            <h1
              ref={headingRef}
              aria-hidden="true"
              className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white font-heading mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
            >
              {heroHeading}
            </h1>
            <p
              ref={subheadingRef}
              className="text-lg text-white/95 mb-8 max-w-2xl drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] mx-auto"
            >
              {heroSubheading}
            </p>
            {showButtons && (
              <div
                ref={buttonsRef}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button variant="primary" href="/booking">
                  {t.hero.buttonPrimary}
                </Button>
                <Button
                  variant="secondary"
                  href="https://wa.me/525535663796"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.hero.buttonSecondary}
                </Button>
              </div>
            )}
          </div>
        </div>
        {/* Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-auto">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
