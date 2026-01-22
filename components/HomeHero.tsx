"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./ui/Button";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HomeHeroProps {
  heading?: string;
  subheading?: string;
  showButtons?: boolean;
}

export default function HomeHero({
  heading = "The Art of Living Better, Longer",
  subheading = "Where ancient wisdom meets cutting-edge biohacking.",
  showButtons = true,
}: HomeHeroProps = {}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageElementRef = useRef<HTMLImageElement>(null);
  const glassOverlayRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  // Master animation timeline controlled by scroll
  useEffect(() => {
    if (
      !headingRef.current ||
      !heroSectionRef.current ||
      !imageWrapperRef.current ||
      !imageElementRef.current ||
      !glassOverlayRef.current
    )
      return;

    // Split heading into words and letters
    const headingText = headingRef.current.textContent || heading;
    const words = headingText.split(" ");

    headingRef.current.innerHTML = words
      .map((word) => {
        const wordSpan = `<span style="display: inline-block; white-space: nowrap;">${word
          .split("")
          .map((char) => `<span style="display: inline-block;">${char}</span>`)
          .join("")}</span>`;
        return wordSpan;
      })
      .join(" ");

    const letterSpans = headingRef.current.querySelectorAll(
      "span > span"
    ) as NodeListOf<HTMLElement>;

    const elementsToAnimate: HTMLElement[] = [];
    if (subheadingRef.current) {
      elementsToAnimate.push(subheadingRef.current);
    }
    if (showButtons && buttonsRef.current) {
      elementsToAnimate.push(buttonsRef.current);
    }

    const initialScale = 0.9;
    const counterScale = 1 / initialScale;

    // Set initial states to HIDDEN - will animate to visible on load
    gsap.set(letterSpans, { opacity: 0, y: 30 });
    gsap.set(elementsToAnimate, { opacity: 0, y: 20 });
    gsap.set(imageWrapperRef.current, {
      scale: initialScale,
      opacity: 0,
      filter: "blur(10px)",
    });
    gsap.set(imageElementRef.current, { scale: counterScale });
    gsap.set(glassOverlayRef.current, {
      opacity: 1,
      backdropFilter: "blur(20px) saturate(180%)",
    });

    // Create ScrollTrigger timeline (visible → hidden) but keep it paused initially
    const scrollTl = gsap.timeline({ paused: true });

    // Add all animations to scroll timeline - going from visible to hidden
    scrollTl.to(letterSpans, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.03,
    })
      .to(
        elementsToAnimate,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.3"
      )
      .to(
        imageWrapperRef.current,
        {
          scale: initialScale,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.9"
      )
      .to(
        imageElementRef.current,
        {
          scale: counterScale,
          duration: 1.2,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        glassOverlayRef.current,
        {
          opacity: 1,
          backdropFilter: "blur(20px) saturate(180%)",
          duration: 1.2,
          ease: "power2.out",
        },
        "<"
      );

    // Create intro timeline (hidden → visible) - plays once on load
    const introTl = gsap.timeline();
    let introCompleted = false;
    let scrollTriggerInstance: ScrollTrigger | null = null;

    introTl.to(letterSpans, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.03,
    })
      .to(
        elementsToAnimate,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.3"
      )
      .to(
        imageWrapperRef.current,
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.9"
      )
      .to(
        imageElementRef.current,
        {
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        glassOverlayRef.current,
        {
          opacity: 0,
          backdropFilter: "blur(0px) saturate(100%)",
          duration: 1.2,
          ease: "power2.out",
        },
        "<"
      );

    // Create ScrollTrigger for scroll timeline (created after intro or on early scroll)
    const createScrollTrigger = () => {
      if (scrollTriggerInstance) return; // Already created
      
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        animation: scrollTl,
        onUpdate: (self) => {
          // Scroll timeline: progress 0 = visible, progress 1 = hidden
          // As you scroll down, progress increases, elements disappear
          scrollTl.progress(self.progress);
        },
      });
    };

    // Function to enable scroll control
    const enableScrollControl = () => {
      if (introCompleted) return;
      introCompleted = true;
      
      // Set scroll timeline to start at progress 0 (fully visible - start state)
      // Scroll timeline goes from visible (progress 0) to hidden (progress 1)
      scrollTl.progress(0);
      
      // Create and enable ScrollTrigger
      createScrollTrigger();
    };

    // Play intro animation
    introTl.play();

    // On intro complete, enable scroll control
    introTl.eventCallback("onComplete", () => {
      enableScrollControl();
    });

    // Detect early scrolling - if user scrolls before intro completes, cancel intro and enable scroll
    let scrollDetected = false;
    const handleScroll = () => {
      if (!introCompleted && !scrollDetected) {
        scrollDetected = true;
        // Kill intro animation and jump to final state
        introTl.kill();
        // Set all elements to final (visible) state
        gsap.set(letterSpans, { opacity: 1, y: 0 });
        gsap.set(elementsToAnimate, { opacity: 1, y: 0 });
        gsap.set(imageWrapperRef.current, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        });
        gsap.set(imageElementRef.current, { scale: 1 });
        gsap.set(glassOverlayRef.current, {
          opacity: 0,
          backdropFilter: "blur(0px) saturate(100%)",
        });
        // Enable scroll control immediately
        enableScrollControl();
        // Remove scroll listener
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("wheel", handleScroll);
        window.removeEventListener("touchmove", handleScroll);
      }
    };

    // Add scroll detection listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [heading, showButtons, subheading]);

  return (
    <section ref={heroSectionRef} className="min-h-screen md:pt-12 pt-20">
      <div className="max-w-7xl mx-auto p-4 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-12 items-center">
          {/* Left side - 40% - Text content */}
          <div className="sm:col-span-5">
            <h1
              ref={headingRef}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1a1a1a] font-heading mb-6"
            >
              {heading}
            </h1>
            <p ref={subheadingRef} className="text-lg text-[#2a2a2a] mb-8">
              {subheading}
            </p>
            {showButtons && (
              <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary">Book Now</Button>
                <Button variant="secondary">Meet Us</Button>
              </div>
            )}
          </div>

          {/* Right side - 70% - Image */}
          <div className="sm:col-span-5">
            <div
              ref={imageWrapperRef}
              className="relative w-full md:aspect-[11/12] aspect-[3/2] rounded-[2rem] overflow-hidden"
            >
              <img
                ref={imageElementRef}
                src="/images/hero.jpg"
                alt="Zen yoga and wellness"
                className="w-full h-full object-cover"
              />
              {/* Glass overlay that fades to solid */}
              <div
                ref={glassOverlayRef}
                className="absolute inset-0 bg-white/30 backdrop-blur-[20px]"
                style={{
                  backdropFilter: "blur(20px) saturate(180%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
