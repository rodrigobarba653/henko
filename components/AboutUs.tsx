"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutUs() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useScrollReveal({
    trigger: sectionRef,
    elements: [
      { ref: headingRef, preset: "fadeDown", splitWords: true, stagger: 0.1, duration: 0.5 },
      { ref: bodyRef, preset: "fadeUp", duration: 0.8 },
    ],
  });

  return (
    <section ref={sectionRef} className="py-8 lg:py-12 px-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-16 bg-main-green rounded-[2rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side - 50% - Heading */}
          <div>
            {/* SEO-friendly heading - hidden visually but accessible to screen readers and crawlers */}
            <h2 className="sr-only">
              {t.aboutUs.heading}
            </h2>
            {/* Animated heading - visible but hidden from screen readers */}
            <h2
              ref={headingRef}
              aria-hidden="true"
              className="text-4xl md:text-5xl lg:text-5xl font-semibold text-main-beige font-heading"
            >
              {t.aboutUs.heading}
            </h2>
          </div>

          {/* Right side - 50% - Body text */}
          <div>
            <p ref={bodyRef} className="text-lg text-main-beige leading-relaxed">
              {t.aboutUs.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
