import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { servicesTranslations } from "@/data/services-i18n";
import { translations } from "@/data/i18n";
import { notFound } from "next/navigation";
import ServicePageClient from "./ServicePageClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export function generateStaticParams() {
  // Return slugs for static generation (language-agnostic)
  return [
    { slug: "biohacking" },
    { slug: "fitness" },
    { slug: "spa-beauty" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const services = servicesTranslations.en;
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return {};
  }

  return {
    title: `${translations.en.metadata.title} | ${service.name}`,
    description: service.description,
    alternates: {
      canonical: `${siteUrl}/services/${params.slug}/`,
    },
  };
}

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  // Use English as default for static generation, client will handle language switching
  const services = servicesTranslations.en;
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <main className="bg-bg-beige">
        <ServicePageClient slug={params.slug} />
      </main>
      <Footer />
    </>
  );
}
