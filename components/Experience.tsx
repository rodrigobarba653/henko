"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useScrollTrigger, AnimationConfig } from "@/hooks/useScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Experience() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  // Initialize as false (desktop) to match server-side render
  // Will be updated on client mount
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Set mounted flag and check mobile on client
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Check on mount to ensure it's correct
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  // Setup function that prepares ScrollTrigger animations
  const setupAnimations = (): AnimationConfig[] => {
    if (!headingRef.current || !bodyRef.current) return [];

    const animations: AnimationConfig[] = [
      {
        element: headingRef.current,
        from: { opacity: 0, x: -50 },
        to: {
          opacity: 1,
          x: 0,
          duration: 0.4,
        },
      },
      {
        element: bodyRef.current,
        from: { opacity: 0, x: -50 },
        to: {
          opacity: 1,
          x: 0,
          duration: 0.8,
        },
        position: "-=0.4",
      },
    ];

    // Add card intro animations - fade in and slide up from bottom, staggered
    const validCardRefs = cardWrapperRefs.current
      .slice(0, images.length)
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
            duration: 0.8,
          },
          position: index === 0 ? "-=0.2" : "+=0.2", // Staggered spacing
        });
      });
    }

    return animations;
  };

  // Use the reusable hook
  useScrollTrigger(
    {
      trigger: sectionRef,
      start: "top 40%", // Start animation later (when section is more in view)
      end: "top 20%", // End when section is near top of viewport
      scrub: 0.3, // Small deceleration - animation follows scroll with slight lag (stops when scroll stops)
    },
    setupAnimations
  );

  const images = [
    {
      src: "/images/biohacking.jpg",
      alt: t.experience.cards.biohacking.alt,
      href: "/services/biohacking",
      card: {
        heading: t.experience.cards.biohacking.heading,
        subheading: t.experience.cards.biohacking.subheading,
        body: t.experience.cards.biohacking.body,
      },
    },
    {
      src: "/images/fitness.jpg",
      alt: t.experience.cards.fitness.alt,
      href: "/services/fitness",
      card: {
        heading: t.experience.cards.fitness.heading,
        subheading: t.experience.cards.fitness.subheading,
        body: t.experience.cards.fitness.body,
      },
    },
    {
      src: "/images/spa.jpg",
      alt: t.experience.cards.spaBeauty.alt,
      href: "/services/spa-beauty",
      card: {
        heading: t.experience.cards.spaBeauty.heading,
        subheading: t.experience.cards.spaBeauty.subheading,
        body: t.experience.cards.spaBeauty.body,
      },
    },
  ];


  const handleImageHover = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <section ref={sectionRef} id="experience" className="py-16 lg:py-12 bg-bg-beige">
      <div className="max-w-7xl mx-auto px-4">
        <div className="md:max-w-[50%] mb-12">
          <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1a1a1a] font-heading mb-4">
            {t.experience.heading}
          </h2>
          <p ref={bodyRef} className="text-lg text-[#1a1a1a] leading-relaxed">
            {t.experience.body}
          </p>
        </div>

        {/* Desktop: Horizontal Accordion | Mobile: Stacked Cards */}
        <div
          className={`${
            isMobile ? "flex flex-col gap-4" : "flex gap-4 h-[500px] relative"
          }`}
        >
          {images.map((image, index) => (
            <div
              key={index}
              onMouseEnter={() => {
                if (!isMobile && activeIndex !== index) {
                  handleImageHover(index);
                }
              }}
              onClick={() => {
                if (isMobile && image.href) {
                  // On mobile, navigate to service page on click
                  router.push(image.href);
                }
              }}
              ref={(el) => {
                // Set both refs
                cardWrapperRefs.current[index] = el;
                imageRefs.current[index] = el;
              }}
              className={`${
                isMobile
                  ? "h-[400px] w-full cursor-pointer"
                  : "cursor-pointer relative transition-all duration-[400ms] ease-in-out"
              } flex flex-col rounded-[2rem] overflow-hidden relative`}
              style={
                !isMobile
                  ? {
                      width: activeIndex === index ? "50%" : "25%",
                      backgroundImage: `url(${image.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }
                  : {
                      backgroundImage: `url(${image.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      width: "100%",
                    }
              }
            >
              {/* Oxide box - Always visible with headline and arrow, body shows when accordion is open */}
              <div
                key={`card-${index}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`absolute bottom-0 left-0 right-0 bg-oxide/70 backdrop-blur-md text-main-beige rounded-[2rem] border border-main-beige/20 shadow-lg transition-all overflow-hidden max-h-[266px] ${
                  isMobile
                    ? "p-6 mx-4 mb-4"
                    : activeIndex === index
                    ? "p-8 md:p-10 mx-6 mb-6"
                    : "p-6 mx-6 mb-6"
                }`}
                style={{
                  maxWidth: isMobile
                    ? "calc(100% - 2rem)"
                    : "calc(100% - 3rem)",
                }}
              >
                {/* Arrow Circle Button */}
                <Link
                  href={image.href || "#"}
                  onClick={(e) => {
                    // Stop propagation so parent link doesn't fire
                    e.stopPropagation();
                  }}
                  className={`absolute ${
                    isMobile ? "top-4 right-4" : "top-6 right-6"
                  } w-10 h-10 bg-main-beige rounded-full flex items-center justify-center text-oxide hover:bg-main-beige/90 transition-colors shadow-md z-10`}
                  aria-label={t.experience.viewMore}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-oxide"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                <h3
                  className={`font-semibold text-main-beige font-heading pr-14 ${
                    isMobile ? "text-xl" : "text-2xl md:text2xl mb-2"
                  }`}
                >
                  {image.card.heading}
                </h3>

                {/* Subheading and Body - Always rendered, visibility controlled by CSS */}
                {!isMobile && (
                  <p 
                    className={`text-sm md:text-sm font-medium text-main-beige uppercase mb-3 font-body tracking-wider transition-all duration-300 ${
                      activeIndex === index 
                        ? "opacity-100 h-auto mb-3 delay-[400ms]" 
                        : "opacity-0 h-0 mb-0 overflow-hidden"
                    }`}
                  >
                    {image.card.subheading}
                  </p>
                )}
                <p 
                  className={`text-base md:text-lg text-main-beige leading-relaxed font-body transition-all duration-500 ${
                    (!isMobile && activeIndex === index) || isMobile 
                      ? "opacity-100 h-auto delay-[500ms]" 
                      : "opacity-0 h-0 overflow-hidden"
                  }`}
                >
                  {image.card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
