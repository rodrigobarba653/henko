"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollTriggerConfig {
  trigger: React.RefObject<HTMLElement>;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  pin?: boolean;
  onUpdate?: (self: ScrollTrigger) => void;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export interface AnimationConfig {
  element: HTMLElement | NodeListOf<HTMLElement> | null;
  from?: gsap.TweenVars;
  to: gsap.TweenVars;
  position?: string | number; // Timeline position (e.g., "+=0.5", "-=0.3", "<", "<0.5")
  delay?: number; // Delay in seconds before animation starts (added to the animation)
}

export type AnimationSetupFn = () => AnimationConfig[];

export function useScrollTrigger(
  config: ScrollTriggerConfig,
  setupAnimations: AnimationSetupFn
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!config.trigger.current) return;

    // Get animations from setup function
    const animations = setupAnimations();
    if (animations.length === 0) return;

    // Determine if we're using scrub (tied to scroll) or scroll reveal (one-time trigger)
    const useScrub = config.scrub !== undefined ? config.scrub : false;
    
    // Build ScrollTrigger config
    const scrollTriggerConfig: ScrollTrigger.Vars = {
      trigger: config.trigger.current,
      start: config.start || "top 80%",
      pin: config.pin || false,
      onUpdate: config.onUpdate,
      onEnter: config.onEnter,
      onLeave: config.onLeave,
      onEnterBack: config.onEnterBack,
      onLeaveBack: config.onLeaveBack,
    };

    // For scroll reveal (non-scrub), play once and don't reverse
    if (!useScrub) {
      scrollTriggerConfig.once = true; // Play animation once when triggered
      scrollTriggerConfig.toggleActions = "play none none none"; // Play on enter, do nothing on leave/enterBack/leaveBack
    } else {
      // For scrubbed animations, include end and scrub value
      scrollTriggerConfig.end = config.end || "top 50%";
      scrollTriggerConfig.scrub = useScrub;
    }

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
    });

    timelineRef.current = tl;

    // Set initial states
    animations.forEach((anim) => {
      if (anim.element && anim.from) {
        gsap.set(anim.element, anim.from);
      }
    });

    // Add animations to timeline
    animations.forEach((anim) => {
      if (!anim.element) return;

      // Extract duration and ease separately to ensure they're properly applied
      const { duration, ease, ...restTo } = anim.to;
      
      // Build to properties with explicit duration
      const toProps: gsap.TweenVars = {
        ...restTo,
        duration: duration !== undefined ? duration : 1, // Default to 1 if not specified
        ease: ease || "power2.out",
      };

      // Add delay if provided (from AnimationConfig, not from anim.to)
      if (anim.delay !== undefined) {
        toProps.delay = anim.delay;
      }

      if (anim.from) {
        // Use fromTo if both from and to are provided
        tl.fromTo(anim.element, anim.from, toProps, anim.position);
      } else {
        // Use to if only to is provided
        tl.to(anim.element, toProps, anim.position);
      }
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
  }, [config, setupAnimations]);

  return {
    timeline: timelineRef.current,
    scrollTrigger: scrollTriggerRef.current,
  };
}
