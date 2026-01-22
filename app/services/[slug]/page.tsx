import ServiceHero from "@/components/ServiceHero";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import { services } from "@/data/services";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <main className="bg-bg-beige">
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
      </main>
      <Footer />
    </>
  );
}
