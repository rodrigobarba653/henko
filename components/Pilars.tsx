"use client";

import { useState, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Pilars() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const accordionItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const pilars = t.pilars.items.map((item, index) => ({
    ...item,
    image: "/images/pilars.jpg",
    icon: `/images/pilars-${index + 1}.svg`,
  }));

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const activeImage = openIndex !== null ? pilars[openIndex].image : pilars[0].image;

  useScrollReveal({
    trigger: sectionRef,
    elements: [
      { ref: headingRef, preset: "fadeUp", duration: 0.8 },
      { ref: bodyRef, preset: "fadeUp", duration: 0.8 },
      { ref: imageWrapperRef, preset: "fadeScale", duration: 1 },
      // Start accordion items 20% after the image animation begins:
      // image duration = 1s, so '-=0.8' => accordion starts 0.2s after image start
      { ref: accordionItemRefs, preset: "fadeLeft", stagger: 0.1, duration: 0.8, position: "-=0.8" },
    ],
  });

  return (
    <section ref={sectionRef} id="pilars" className="py-8 lg:py-12 bg-bg-beige px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading and Body */}
        <div className="md:max-w-[50%] mx-auto md:text-center mb-12">
          <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1a1a1a] font-heading mb-4">
            {t.pilars.heading}
          </h2>
          <p ref={bodyRef} className="text-lg text-[#1a1a1a] leading-relaxed">
            {t.pilars.body}
          </p>
        </div>

        {/* 50/50 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side - Image */}
          <div className="lg:sticky lg:top-24">
            <div ref={imageWrapperRef} className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden">
                <img
                  key={openIndex}
                  src={activeImage}
                  alt={t.pilars.imageAlt}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
            </div>
          </div>

          {/* Right side - Accordion */}
          <div className="flex flex-col">
            {pilars.map((pilar, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    accordionItemRefs.current[index] = el;
                  }}
                  className="border-b border-[#1a1a1a] overflow-hidden bg-bg-beige"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full p-6 flex items-center justify-between hover:bg-bg-beige/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <img
                        src={pilar.icon}
                        alt={pilar.iconAlt}
                        className="w-12 h-12 md:w-14 md:h-14 object-contain flex-shrink-0"
                      />

                      {/* Heading */}
                      <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] font-heading text-left">
                        {pilar.heading}
                      </h3>
                    </div>

                    {/* Chevron */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-main-green transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* Accordion Body */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      {pilar.subheading && (
                        <p className="text-sm md:text-base font-medium text-[#1a1a1a] uppercase mb-3 font-body tracking-wider">
                          {pilar.subheading}
                        </p>
                      )}
                      <p className="text-lg text-[#1a1a1a] leading-relaxed font-body">
                        {pilar.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
