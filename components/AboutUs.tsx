"use client";

import { useRef } from "react";
import { useScrollTrigger, AnimationConfig } from "@/hooks/useScrollTrigger";

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  // Setup function that prepares animations
  const setupAnimations = (): AnimationConfig[] => {
    if (!headingRef.current || !bodyRef.current) return [];

    const headingText = headingRef.current.textContent || "Evolution Starts Within.";
    const words = headingText.split(" ");

    // Split heading into words, preserving line breaks
    headingRef.current.innerHTML = words
      .map((word) => {
        // Wrap each word in a span to keep it together (prevents word breaking)
        const wordSpan = `<span style="display: inline-block; white-space: nowrap;">${word}</span>`;
        return wordSpan;
      })
      .join(" "); // Add space between words

    const wordSpans = headingRef.current.querySelectorAll("span") as NodeListOf<HTMLElement>;

    return [
      {
        element: wordSpans,
        from: { opacity: 0, y: -30 },
        to: {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        },
      },
      {
        element: bodyRef.current,
        from: { opacity: 0, y: 20 },
        to: {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        position: "-=0.3",
      },
    ];
  };

  // Use the reusable hook
  useScrollTrigger(
    {
      trigger: sectionRef,
      start: "top 50%", // Start animation later (when section is more in view)
      end: "top 0%", // End when section is near top of viewport
      scrub: 1,
    },
    setupAnimations
  );

  return (
    <section ref={sectionRef} className="py-8 lg:py-12 px-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-16 bg-main-green rounded-[2rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side - 50% - Heading */}
          <div>
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-5xl font-semibold text-main-beige font-heading"
            >
              Evolution Starts Within.
            </h2>
          </div>

          {/* Right side - 50% - Body text */}
          <div>
            <p ref={bodyRef} className="text-lg text-main-beige leading-relaxed">
              Welcome to Henko, a sanctuary where ancient wisdom meets
              cutting-edge biohacking. From high-performance fitness to deep
              cellular recovery, we provide the tools to master your biology and
              elevate your spirit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
