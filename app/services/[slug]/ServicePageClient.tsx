"use client";

import ServiceHero from "@/components/ServiceHero";
import ServiceDetail from "@/components/ServiceDetail";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServicePageClientProps {
  slug: string;
}

export default function ServicePageClient({ slug }: ServicePageClientProps) {
  const { services } = useLanguage();
  const service = services.find((s) => s.slug === slug);

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
      />
    </>
  );
}
