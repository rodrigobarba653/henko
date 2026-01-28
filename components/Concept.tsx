"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Concept() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useScrollReveal({
    trigger: sectionRef,
    elements: [
      { ref: imageWrapperRef, preset: "clipPathLeft", duration: 1.5 },
      // Start heading at 20% of image animation (0.3s into 1.5s animation)
      { ref: headingRef, preset: "fadeLeft", duration: 0.8, position: "-=1.2" },
      { ref: bodyRef, preset: "fadeLeft", duration: 0.8 },
    ],
  });

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
                loading="lazy"
                decoding="async"
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
