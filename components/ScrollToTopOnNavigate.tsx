"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scrolls to top (hero) on every route change so users land at the top of the page.
 * Works with GSAP ScrollSmoother when available.
 */
export default function ScrollToTopOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToTop = () => {
      try {
        const smoother = ScrollSmoother.get();
        if (smoother && typeof smoother.scrollTo === "function") {
          smoother.scrollTo(0, false);
        }
      } catch {
        /* ignore */
      }
      window.scrollTo(0, 0);
      if (typeof document !== "undefined") {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    scrollToTop();
    const t1 = setTimeout(scrollToTop, 50);
    const t2 = setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        /* ignore */
      }
      scrollToTop();
    }, 150);
    const t3 = setTimeout(scrollToTop, 400);
    const t4 = setTimeout(scrollToTop, 800);
    const t5 = setTimeout(scrollToTop, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [pathname]);

  return null;
}
