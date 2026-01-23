"use client";

import { useRef } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { useScrollTrigger, AnimationConfig } from "@/hooks/useScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PackagesPage() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    // Add card animations - scale + fade from bottom, staggered
    const validCardRefs = cardRefs.current
      .slice(0, t.packages.items.length)
      .filter((ref) => ref !== null && ref !== undefined);
    
    if (validCardRefs.length > 0) {
      validCardRefs.forEach((cardRef, index) => {
        animations.push({
          element: cardRef,
          from: { 
            opacity: 0,
            y: 50,
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

    return animations;
  };

  // Use the reusable hook
  useScrollTrigger(
    {
      trigger: sectionRef,
      start: "top 50%",
      end: "top 0%",
      scrub: 0.3,
    },
    setupAnimations
  );

  return (
    <>
      <main className="bg-bg-beige min-h-screen">
        <section ref={sectionRef} className="py-8 lg:py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* Heading */}
            <div className="md:max-w-[60%] mx-auto md:text-center mb-12 lg:mb-16">
              <h1 
                ref={headingRef}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1a1a1a] font-heading mb-4"
              >
                {t.packages.heading}
              </h1>
              <p 
                ref={bodyRef}
                className="text-lg md:text-xl text-[#2a2a2a] leading-relaxed"
              >
                {t.packages.body}
              </p>
            </div>

            {/* Package Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {t.packages.items.map((pkg, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="bg-white rounded-[2rem] p-6 md:p-8 flex flex-col border border-main-green/10 hover:border-main-green/30 hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Package Name */}
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] font-heading mb-3 group-hover:text-main-green transition-colors">
                    {pkg.name}
                  </h3>

                  {/* Design For Badge */}
                  <div className="mb-6">
                    <span className="inline-block px-4 py-1.5 bg-main-green/10 text-main-green text-sm font-medium rounded-full font-body">
                      {pkg.designFor}
                    </span>
                  </div>

                  {/* Included Services */}
                  <div className="flex-grow mb-6">
                    <h4 className="text-sm font-medium text-[#1a1a1a] uppercase mb-4 font-body tracking-wider">
                      {t.common.buttons.includedServices}
                    </h4>
                    <ul className="space-y-3">
                      {pkg.includedServices.map((service, serviceIndex) => (
                        <li 
                          key={serviceIndex}
                          className="flex items-start text-[#1a1a1a] font-body"
                        >
                          <svg
                            className="w-5 h-5 text-main-green mr-3 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-base md:text-lg leading-relaxed">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto pt-4">
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => {
                        // TODO: Add booking logic here
                        // For now, this is a placeholder
                      }}
                    >
                      {t.common.buttons.bookNow}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
