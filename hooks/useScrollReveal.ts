"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type AnimationPreset = 
  | "fadeUp" 
  | "fadeDown" 
  | "fadeLeft" 
  | "fadeRight" 
  | "fadeScale" 
  | "fadeScaleUp"
  | "clipPathLeft"
  | "rotateScale";

export interface RevealElement {
  ref: React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement | null> | React.MutableRefObject<(HTMLElement | null)[]>;
  preset?: AnimationPreset;
  duration?: number;
  delay?: number;
  stagger?: number; // For word/letter splitting or array elements
  splitWords?: boolean; // Automatically split heading into words
  splitLetters?: boolean; // Automatically split heading into letters (preserves word structure)
  customFrom?: gsap.TweenVars;
  customTo?: gsap.TweenVars;
  position?: string | number; // Timeline position
}

export interface ScrollRevealConfig {
  trigger: React.RefObject<HTMLElement>;
  start?: string; // When to trigger the animation (default: "top 80%")
  once?: boolean; // Whether to play animation only once (default: true)
  elements: RevealElement[];
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

// Animation presets
const PRESETS: Record<AnimationPreset, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  fadeUp: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
  },
  fadeDown: {
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
  },
  fadeRight: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
  },
  fadeScale: {
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1 },
  },
  fadeScaleUp: {
    from: { opacity: 0, y: 50, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1 },
  },
  clipPathLeft: {
    from: { clipPath: "inset(0% 100% 0% 0%)" },
    to: { clipPath: "inset(0% 0% 0% 0%)" },
  },
  rotateScale: {
    from: { opacity: 0, scale: 0, rotation: -180 },
    to: { opacity: 1, scale: 1, rotation: 0 },
  },
};

/**
 * Splits text into word spans for staggered animation
 */
function splitIntoWords(element: HTMLElement): NodeListOf<HTMLElement> {
  const text = element.textContent || "";
  const words = text.split(" ");

  element.innerHTML = words
    .map((word) => {
      const wordSpan = `<span style="display: inline-block; white-space: nowrap;">${word}</span>`;
      return wordSpan;
    })
    .join(" ");

  return element.querySelectorAll("span") as NodeListOf<HTMLElement>;
}

/**
 * Splits text into letter spans (preserves word structure) for letter-by-letter animation
 */
function splitIntoLetters(element: HTMLElement): NodeListOf<HTMLElement> {
  const text = element.textContent || "";
  const words = text.split(" ");

  element.innerHTML = words
    .map((word) => {
      const wordSpan = `<span style="display: inline-block; white-space: nowrap;">${word
        .split("")
        .map((char) => `<span style="display: inline-block;">${char}</span>`)
        .join("")}</span>`;
      return wordSpan;
    })
    .join(" ");

  // Return letter spans (span > span) - the inner spans are the letters
  return element.querySelectorAll("span > span") as NodeListOf<HTMLElement>;
}

/**
 * Hook for scroll reveal animations with declarative API.
 * Supports animation presets, automatic word splitting, and staggered arrays.
 * 
 * @example
 * ```tsx
 * useScrollReveal({
 *   trigger: sectionRef,
 *   elements: [
 *     { ref: headingRef, preset: "fadeUp", splitWords: true, stagger: 0.1 },
 *     { ref: bodyRef, preset: "fadeUp", duration: 0.8, position: "-=0.3" },
 *     { ref: cardRefs, preset: "fadeScaleUp", stagger: 0.2 }, // Array of refs
 *   ],
 * });
 * ```
 */
export function useScrollReveal(config: ScrollRevealConfig) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // NOTE: This hook is intentionally initialized once per trigger ref.
    // Many components recreate the config object on re-render (e.g., hover state),
    // and we don't want to re-run gsap.set(from) each time (it causes "flashing").
    if (!config.trigger.current) return;

    // Build ScrollTrigger config
    const scrollTriggerConfig: ScrollTrigger.Vars = {
      trigger: config.trigger.current,
      start: config.start || "top 80%",
      once: config.once !== undefined ? config.once : true,
      toggleActions: "play none none none",
      onEnter: config.onEnter,
      onLeave: config.onLeave,
      onEnterBack: config.onEnterBack,
      onLeaveBack: config.onLeaveBack,
    };

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
    });

    timelineRef.current = tl;

    // Track previous animation duration for automatic overlap calculation
    let previousDuration = 0;

    // Process each element
    config.elements.forEach((elementConfig, index) => {
      // Check if ref holds an array (MutableRefObject with array)
      const refValue = elementConfig.ref.current;
      const isArrayRef = Array.isArray(refValue);
      
      if (isArrayRef) {
        // Handle ref that holds an array of elements (for cards, items, etc.)
        const elements = refValue.filter((el) => el !== null && el !== undefined) as HTMLElement[];
        
        if (elements.length === 0) return;

        const preset = elementConfig.preset || "fadeUp";
        const presetAnim = PRESETS[preset];
        const from = { ...presetAnim.from, ...elementConfig.customFrom };
        const duration = elementConfig.duration || 0.8;
        const to = { 
          ...presetAnim.to, 
          ...elementConfig.customTo,
          duration: duration,
          ease: "power2.out",
        };

        // Calculate position: if not specified, start when previous animation is halfway through
        let position = elementConfig.position;
        if (!position && index > 0) {
          // Start when previous animation is 50% complete (halfway point)
          const overlapTime = previousDuration / 2;
          position = `-=${overlapTime}`;
        }

        // Set initial state for the whole group, then animate as a single tween with stagger.
        // This avoids unintended "time between" animations caused by adding one tween per element.
        gsap.set(elements, from);
        tl.fromTo(
          elements,
          from,
          {
            ...to,
            delay: elementConfig.delay,
            stagger: elementConfig.stagger ?? 0.2,
          },
          position
        );
        
        // Update previous duration for next iteration
        previousDuration = duration;
        return;
      }

      // Single ref
      const element = refValue as HTMLElement | null;
      if (!element) return;

      // Determine animation preset
      const preset = elementConfig.preset || "fadeUp";
      const presetAnim = PRESETS[preset];
      
      // Merge custom overrides
      const duration = elementConfig.duration || 0.8;
      const from = { ...presetAnim.from, ...elementConfig.customFrom };
      const to = { 
        ...presetAnim.to, 
        ...elementConfig.customTo,
        duration: duration,
        ease: "power2.out",
      };

      // Calculate position: if not specified, start when previous animation is halfway through
      let position = elementConfig.position;
      if (!position && index > 0) {
        // Start when previous animation is 50% complete (halfway point)
        const overlapTime = previousDuration / 2;
        position = `-=${overlapTime}`;
      }

      // Handle letter splitting (letter-by-letter animation)
      if (elementConfig.splitLetters && element instanceof HTMLElement) {
        const letterSpans = splitIntoLetters(element);
        if (letterSpans.length > 0) {
          gsap.set(letterSpans, from);
          tl.fromTo(
            letterSpans,
            from,
            {
              ...to,
              stagger: elementConfig.stagger ?? 0.03,
            },
            position
          );
          // Update previous duration for next iteration
          previousDuration = duration;
          return;
        }
      }

      // Handle word splitting
      if (elementConfig.splitWords && element instanceof HTMLElement) {
        const wordSpans = splitIntoWords(element);
        if (wordSpans.length > 0) {
          gsap.set(wordSpans, from);
          tl.fromTo(
            wordSpans,
            from,
            {
              ...to,
              stagger: elementConfig.stagger ?? 0.1,
            },
            position
          );
          // Update previous duration for next iteration
          previousDuration = duration;
          return;
        }
      }

      // Single element
      gsap.set(element, from);
      tl.fromTo(
        element,
        from,
        {
          ...to,
          delay: elementConfig.delay,
        },
        position
      );
      
      // Update previous duration for next iteration
      previousDuration = duration;
    });

    // Store ScrollTrigger instance
    scrollTriggerRef.current = tl.scrollTrigger || null;

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.trigger]);
}
