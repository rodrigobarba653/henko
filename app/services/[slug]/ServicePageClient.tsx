"use client";

import { useEffect } from "react";
import ServiceHero from "@/components/ServiceHero";
import ServiceDetail from "@/components/ServiceDetail";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollSmoother } from "gsap/ScrollSmoother";

interface ServicePageClientProps {
  slug: string;
}

export default function ServicePageClient({ slug }: ServicePageClientProps) {
  const { services } = useLanguage();
  const service = services.find((s) => s.slug === slug);

  // Scroll to top (hero) when entering the service page so we don't land at the footer
  useEffect(() => {
    const scrollToTop = () => {
      try {
        const smoother = ScrollSmoother.get();
        if (smoother && typeof smoother.scrollTo === "function") {
          smoother.scrollTo(0, false);
        } else {
          window.scrollTo(0, 0);
        }
      } catch {
        window.scrollTo(0, 0);
      }
    };
    // Run after layout so ScrollSmoother and new content are ready
    const id = requestAnimationFrame(() => {
      scrollToTop();
      setTimeout(scrollToTop, 100);
    });
    return () => cancelAnimationFrame(id);
  }, [slug]);

  if (!service) {
    return null;
  }

  return (
    <>
      <ServiceHero
        heading={service.heading}
        subheading={service.subheading}
        imageUrl={service.imageUrl}
      />
      <ServiceDetail
        service={{
          headline: service.headline,
          description: service.description,
          sectionTitle: service.sectionTitle,
          items: service.items,
        }}
        slug={service.slug}
      />
    </>
  );
}
