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

  const title = `${translations.en.metadata.title} | ${service.heading}`;
  const ogImage = service.imageUrl ? `${siteUrl}${service.imageUrl}` : `${siteUrl}/images/hero.jpg`;

  return {
    title,
    description: service.description,
    alternates: {
      canonical: `${siteUrl}/services/${params.slug}`,
    },
    openGraph: {
      title,
      description: service.description,
      url: `${siteUrl}/services/${params.slug}`,
      siteName: "Henko",
      images: [{ url: ogImage, width: 1200, height: 630, alt: service.heading }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: service.description,
      images: [ogImage],
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
