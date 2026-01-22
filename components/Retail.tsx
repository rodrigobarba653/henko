"use client";

import { useRef } from "react";
import { useScrollTrigger, AnimationConfig } from "@/hooks/useScrollTrigger";

export default function Retail() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cards = [
    {
      heading: "Elements (Shop)",
      subheading: "Curated Longevity",
      body: "Take the Henko experience home. From physician-grade supplements to clean-beauty skincare, every product in our retail shop is vetted for purity and efficacy.",
      icon: "/images/retail-1.svg",
    },
    {
      heading: "Fuel Bar",
      subheading: "Alchemy in a Glass",
      body: "Nourish your recovery at our Juice & Frappé Bar. We blend organic, nutrient-dense ingredients with biohacking boosters like collagen, adaptogens, and clean protein to fuel your transformation.",
      icon: "/images/retail-2.svg",
    },
  ];

  // Setup function that prepares ScrollTrigger animations
  const setupAnimations = (): AnimationConfig[] => {
    if (!headingRef.current || !bodyRef.current) return [];

    const animations: AnimationConfig[] = [
      {
        element: headingRef.current,
        from: { opacity: 0, y: 30 },
        to: {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
        position: "-=0.4",
      },
    ];

    // Add card animations - scale + fade from bottom
    const validCardRefs = cardRefs.current
      .slice(0, cards.length)
      .filter((ref) => ref !== null && ref !== undefined);
    
    if (validCardRefs.length > 0) {
      validCardRefs.forEach((cardRef, index) => {
        animations.push({
          element: cardRef,
          from: { 
            opacity: 0,
            y: 40,
            scale: 0.95,
          },
          to: {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
          },
          position: index === 0 ? "-=0.3" : "+=0.2", // Staggered
        });
      });
    }

    // Add icon animations - rotate + scale
    const validIconRefs = iconRefs.current
      .slice(0, cards.length)
      .filter((ref) => ref !== null && ref !== undefined);
    
    if (validIconRefs.length > 0) {
      validIconRefs.forEach((iconRef, index) => {
        animations.push({
          element: iconRef,
          from: { 
            opacity: 0,
            scale: 0,
            rotation: -180,
          },
          to: {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
          },
          position: index === 0 ? "-=0.8" : "-=0.6", // Start with card animation
        });
      });
    }

    return animations;
  };

  // Use the reusable hook
  useScrollTrigger(
    {
      trigger: sectionRef,
      start: "top 50%", // Start animation later (when section is more in view)
      end: "top 0%", // End when section is near top of viewport
      scrub: 0.3, // Small deceleration
    },
    setupAnimations
  );

  return (
    <section ref={sectionRef} id="fuel-shop" className="py-8 lg:py-12 bg-bg-beige">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading and Body */}
        <div className="md:max-w-[50%] mx-auto md:text-center mb-12">
          <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1a1a1a] font-heading mb-4">
            Retail & Fuel Bar
          </h2>
          <p ref={bodyRef} className="text-lg text-[#1a1a1a] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="bg-main-green rounded-[2rem] p-8 md:p-10 flex flex-col"
            >
              {/* Icon Circle - Aligned Left */}
              <div 
                ref={(el) => {
                  iconRefs.current[index] = el;
                }}
                className="w-20 h-20 bg-main-beige rounded-full flex items-center justify-center mb-6 self-start"
              >
                <img
                  src={card.icon}
                  alt={card.heading}
                  className="w-11 h-11 md:w-12 md:h-12 object-contain"
                />
              </div>

              {/* Content - Aligned Left */}
              <div className="w-full text-left">
                {/* Heading */}
                <h3 className="text-2xl md:text-3xl font-semibold text-main-beige font-heading mb-3">
                  {card.heading}
                </h3>

                {/* Subheading */}
                <p className="text-sm md:text-base font-medium text-main-beige uppercase mb-4 font-body tracking-wider">
                  {card.subheading}
                </p>

                {/* Body */}
                <p className="text-base md:text-lg text-main-beige leading-relaxed font-body">
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
