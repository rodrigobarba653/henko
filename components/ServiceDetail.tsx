"use client";

interface ServiceDetailProps {
  service: {
    headline: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
    sectionTitle: string;
  };
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <section className="py-8 bg-bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline and Description */}
        <div className="max-w-[50%] mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1a1a1a] font-heading mb-6">
            {service.headline}
          </h1>
          <p className="text-lg text-[#1a1a1a] leading-relaxed font-body">
            {service.description}
          </p>
        </div>

        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] font-heading">
            {service.sectionTitle}
          </h2>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {service.items.map((item, index) => (
            <div
              key={index}
              className="bg-main-green rounded-[2rem] p-8 text-main-beige"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-main-beige font-heading mb-4">
                {item.title}
              </h3>
              <p className="text-base md:text-lg text-main-beige leading-relaxed font-body">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
