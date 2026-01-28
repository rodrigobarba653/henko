"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function ScrollSmootherSetup() {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if ScrollSmoother is available (premium plugin)
      try {
        // Register plugins
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        // Create ScrollSmoother FIRST, before any ScrollTriggers
        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2, // Smoothness: 0.8-1.2 range (1 = balanced)
          effects: true, // Enable data-speed and data-lag for parallax
          smoothTouch: false, // Disable on touch devices for better performance
          normalizeScroll: true, // Normalize scroll speed across browsers
        });

        smootherRef.current = smoother;

        // Refresh ScrollTrigger after smoother is created
        ScrollTrigger.refresh();
      } catch (error) {
        console.warn("ScrollSmoother not available. Make sure you have GSAP Club GreenSock membership and the plugin loaded.");
      }

      // Cleanup
      return () => {
        if (smootherRef.current) {
          smootherRef.current.kill();
        }
      };
    }
  }, []);

  // Refresh on window load (after images/fonts load)
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return null; // This component doesn't render anything
}
