"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Retail() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cards = [
    {
      heading: t.retail.cards.shop.heading,
      subheading: t.retail.cards.shop.subheading,
      body: t.retail.cards.shop.body,
      alt: t.retail.cards.shop.alt,
      icon: "/images/retail-1.svg",
    },
    {
      heading: t.retail.cards.fuelBar.heading,
      subheading: t.retail.cards.fuelBar.subheading,
      body: t.retail.cards.fuelBar.body,
      alt: t.retail.cards.fuelBar.alt,
      icon: "/images/retail-2.svg",
    },
  ];

  useScrollReveal({
    trigger: sectionRef,
    // Trigger earlier so the cards start animating sooner as you scroll down
    start: "top 95%",
    elements: [
      { ref: headingRef, preset: "fadeUp", duration: 0.8 },
      { ref: bodyRef, preset: "fadeUp", duration: 0.8 },
      // stagger: 0 => animate at the same time
      { ref: cardRefs, preset: "fadeScaleUp", stagger: 0.2, duration: 0.8, customFrom: { y: 40 } },
      // Start icons at the same time as the cards (position "<"), also no stagger.
      { ref: iconRefs, preset: "rotateScale", stagger: 0, duration: 0.8, position: "<" },
    ],
  });

  return (
    <section ref={sectionRef} id="fuel-shop" className="py-8 lg:py-12 bg-bg-beige">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading and Body */}
        <div className="md:max-w-[50%] mx-auto md:text-center mb-12">
          <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1a1a1a] font-heading mb-4">
            {t.retail.heading}
          </h2>
          <p ref={bodyRef} className="text-lg text-[#1a1a1a] leading-relaxed">
            {t.retail.body}
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
                  alt={card.alt}
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
