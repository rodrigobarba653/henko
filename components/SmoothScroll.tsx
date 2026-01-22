"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SmoothScroll() {
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const targetScroll = useRef(0);

  useEffect(() => {
    // Initialize target scroll position
    if (typeof window !== "undefined") {
      targetScroll.current = window.pageYOffset;
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Kill any existing animation
      if (scrollTween.current) {
        scrollTween.current.kill();
      }

      // Update target scroll position with multiplier
      targetScroll.current += e.deltaY * 1.8;
      targetScroll.current = Math.max(
        0,
        Math.min(
          targetScroll.current,
          document.documentElement.scrollHeight - window.innerHeight
        )
      );

      // Get current scroll position
      const currentScroll = window.pageYOffset;

      // Create smooth scroll animation with ease-in-out
      scrollTween.current = gsap.to(
        { value: currentScroll },
        {
          value: targetScroll.current,
          duration: 0.6,
          ease: "sine.inOut",
          onUpdate: function () {
            const scrollValue = this.targets()[0].value;
            window.scrollTo(0, scrollValue);
          },
        }
      );
    };

    // Listen to wheel events
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Sync with programmatic scrolls (like nav clicks)
    const handleScroll = () => {
      if (!scrollTween.current || !scrollTween.current.isActive()) {
        const newScroll = window.pageYOffset;
        targetScroll.current = newScroll;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTween.current) {
        scrollTween.current.kill();
      }
    };
  }, []);

  return null;
}
