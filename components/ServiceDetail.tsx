"use client";

interface ServiceDetailProps {
  service: {
    headline: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      bulletPoints?: Array<{
        label: string;
        icon?: string;
      }>;
    }>;
    sectionTitle: string;
  };
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <section className="py-8 bg-bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline and Description */}
        <div className="lg:max-w-[50%] mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1a1a1a] font-heading mb-6">
            {service.headline}
          </h1>
          <p className="text-lg text-[#1a1a1a] leading-relaxed font-body">
            {service.description}
          </p>
        </div>

        {/* Section Title */}
        <div className="lg:mb-12 mb-8">
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
              <p className="text-base md:text-lg text-main-beige leading-relaxed font-body mb-6">
                {item.description}
              </p>
              
              {/* Bullet Points with Icons */}
              {item.bulletPoints && item.bulletPoints.length > 0 && (
                <ul className="space-y-3 mt-6">
                  {item.bulletPoints.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="flex items-center text-main-beige font-body"
                    >
                      <svg
                        className="w-5 h-5 text-main-beige mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-base md:text-lg">{bullet.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
