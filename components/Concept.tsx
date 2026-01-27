"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useScrollTrigger, AnimationConfig } from "@/hooks/useScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Concept() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  // Setup function that prepares animations
  const setupAnimations = (): AnimationConfig[] => {
    // TODO: Re-enable bodyRef check when body animation is needed
    // if (!imageWrapperRef.current || !headingRef.current || !bodyRef.current) return [];
    if (!imageWrapperRef.current || !headingRef.current) return [];

    return [
      {
        element: imageWrapperRef.current,
        from: { clipPath: "inset(0% 100% 0% 0%)" },
        to: {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5, // Scroll distance needed: higher = slower animation
        },
        // No position/delay = starts immediately
      },
      {
        element: headingRef.current,
        from: { opacity: 0, x: 50 },
        to: {
          opacity: 1,
          x: 0,
          duration: 0.8, // Scroll distance needed: higher = slower animation
        },
        position: "+=0.2", // Start 0.2s after previous animation ends
      },
      // TODO: Re-enable body text animation when needed
      // {
      //   element: bodyRef.current,
      //   from: { opacity: 0, x: 50 },
      //   to: {
      //     opacity: 1,
      //     x: 0,
      //     duration: 0.6, // Scroll distance needed: higher = slower animation
      //   },
      //   position: "-=0.3", // Start 0.3s before previous animation ends (overlap)
      // },
    ];
  };

  // Set body text to final visible state (bypassed animation)
  useEffect(() => {
    if (bodyRef.current) {
      gsap.set(bodyRef.current, {
        opacity: 1,
        x: 0,
      });
    }
  }, []);

  // Use the reusable hook
  useScrollTrigger(
    {
      trigger: sectionRef,
      start: "top 60%", // Start animation later (when section is more in view)
      end: "top 20%", // End when section is near top of viewport
      scrub: 1,
    },
    setupAnimations
  );

  return (
    <section ref={sectionRef} id="concept" className="py-8 lg:py-12 bg-bg-beige px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-center">
          {/* Left side - 80% - Image */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div ref={imageWrapperRef} className="relative w-full h-[400px] rounded-[2rem] overflow-hidden">
              <img
                src="/images/concept.jpg"
                alt={t.conceptSection.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - 20% - Text content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <h2 ref={headingRef} className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] font-heading mb-4">
              {t.conceptSection.heading}
            </h2>
            <p ref={bodyRef} className="text-lg text-[#1a1a1a] leading-relaxed">
              {t.conceptSection.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
