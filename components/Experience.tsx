"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useScrollTrigger, AnimationConfig } from "@/hooks/useScrollTrigger";

export default function Experience() {
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
          duration: 0.8,
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

    // Add card animations (blur glass fade-in) - staggered
    // Check if refs are available (they should be after render)
    const validCardRefs = cardWrapperRefs.current
      .slice(0, images.length)
      .filter((ref) => ref !== null && ref !== undefined);
    
    if (validCardRefs.length > 0) {
      validCardRefs.forEach((cardRef, index) => {
        animations.push({
          element: cardRef,
          from: { 
            opacity: 0,
            filter: "blur(20px)",
            backdropFilter: "blur(0px)",
          },
          to: {
            opacity: 1,
            filter: "blur(0px)",
            backdropFilter: "blur(10px)",
            duration: 0.2,
          },
          position: index === 0 ? "-=0.3" : "+=0.3", // Staggered spacing
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
      scrub: 0.3, // Small deceleration - animation follows scroll with slight lag (stops when scroll stops)
    },
    setupAnimations
  );

  const images = [
    {
      src: "/images/biohacking.jpg",
      alt: "Experience 1",
      href: "/services/biohacking",
      card: {
        heading: "Biohacking (Recovery):",
        subheading: "Science-Backed Restoration",
        body: "Performance is only as good as your recovery. Our Recovery Lab uses medical-grade technology to reduce inflammation, boost mitochondrial health, and reset your nervous system.",
      },
    },
    {
      src: "/images/fitness.jpg",
      alt: "Experience 2",
      href: "/services/fitness",
      card: {
        heading: "Fitness:",
        subheading: "Mindful Movement, Powerful Results",
        body: "Forget the grind. Our classes are designed to build a body that is as functional as it is aesthetic. Guided by elite instructors, we focus on alignment, breath, and sustainable power.",
      },
    },
    {
      src: "/images/spa.jpg",
      alt: "Experience 3",
      href: "/services/spa-beauty",
      card: {
        heading: "Spa & Beauty",
        subheading: "Conscious Indulgence",
        body: "Where luxury meets therapy. Our Spa menu is curated to release deep-seated tension and restore your natural glow using premium, toxin-free products.",
      },
    },
  ];

  useEffect(() => {
    // Check viewport width directly to ensure accurate mobile detection
    const checkViewport = typeof window !== "undefined" && window.innerWidth < 1024;

    // Only animate on desktop
    if (!checkViewport) {
      imageRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.to(ref, {
            width: activeIndex === index ? "50%" : "25%",
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      });

      // Animate card appearance
      const activeCard = cardRefs.current[activeIndex];
      if (activeCard) {
        gsap.fromTo(
          activeCard,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out",
          }
        );
      }
    } else {
      // On mobile, ensure all cards are 100% width and clear any GSAP transforms
      imageRefs.current.forEach((ref) => {
        if (ref) {
          gsap.set(ref, { width: "100%", clearProps: "width" });
          ref.style.width = "100%";
          ref.style.maxWidth = "100%";
          // Clear any inline width styles that GSAP might have added
          ref.style.removeProperty("width");
          ref.style.width = "100%";
        }
      });
    }
  }, [activeIndex, isMobile]);

  const handleImageClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <section ref={sectionRef} id="experience" className="py-16 lg:py-12 bg-bg-beige">
      <div className="max-w-7xl mx-auto px-4">
        <div className="md:max-w-[50%] mb-12">
          <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1a1a1a] font-heading mb-4">
            The Henko Experience
          </h2>
          <p ref={bodyRef} className="text-lg text-[#1a1a1a] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
              onClick={() => {
                if (!isMobile && activeIndex !== index) {
                  handleImageClick(index);
                } else if (image.href) {
                  // Navigate to service page
                  router.push(image.href);
                }
              }}
              ref={(el) => {
                // Set both refs
                cardWrapperRefs.current[index] = el;
                imageRefs.current[index] = el;
                
                // Force 100% width on mobile immediately (only on client)
                if (el && isMounted) {
                  const isMobileWidth = window.innerWidth < 1024;
                  if (isMobileWidth) {
                    gsap.set(el, { width: "100%", clearProps: "width" });
                    el.style.width = "100%";
                  }
                }
              }}
              className={`${
                isMobile
                  ? "h-[400px] w-full cursor-pointer"
                  : `cursor-pointer transition-all relative ${
                      activeIndex === index ? "flex-[2]" : "flex-1"
                    }`
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
                      width: "100% !important",
                    }
              }
            >
              {/* Oxide box - Full content on desktop (when active), Simple on mobile (always visible) */}
              {(!isMobile && activeIndex === index) || isMobile ? (
                <div
                  key={`card-${index}`}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`absolute bottom-0 left-0 right-0 bg-oxide/70 backdrop-blur-md text-main-beige rounded-[2rem] border border-main-beige/20 shadow-lg ${
                    isMobile
                      ? "p-6 mx-4 mb-4"
                      : "p-8 md:p-10 mx-6 mb-6"
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
                    aria-label="View more"
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
                      isMobile ? "text-xl" : "text-2xl md:text-3xl mb-2"
                    }`}
                  >
                    {image.card.heading}
                  </h3>

                  {/* Desktop only: Subheading and Body */}
                  {!isMobile && (
                    <>
                      <p className="text-sm md:text-base font-medium text-main-beige uppercase mb-3 font-body tracking-wider">
                        {image.card.subheading}
                      </p>
                      <p className="text-base md:text-lg text-main-beige leading-relaxed font-body">
                        {image.card.body}
                      </p>
                    </>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
