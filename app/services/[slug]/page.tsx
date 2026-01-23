import Footer from "@/components/Footer";
import { servicesTranslations } from "@/data/services-i18n";
import { notFound } from "next/navigation";
import ServicePageClient from "./ServicePageClient";

export function generateStaticParams() {
  // Return slugs for static generation (language-agnostic)
  return [
    { slug: "biohacking" },
    { slug: "fitness" },
    { slug: "spa-beauty" },
  ];
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
