"use client";

import { Icon } from "@iconify/react";

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
      personalization?: {
        heading: string;
        description: string;
        bulletPoints: Array<{
          label: string;
          icon: string;
        }>;
      };
    }>;
    sectionTitle: string;
  };
  slug: string;
}

export default function ServiceDetail({ service, slug }: ServiceDetailProps) {
  const isSpaBeauty = slug === "spa-beauty";
  
  // For spa-beauty: first item goes left, rest go right
  const leftItem = isSpaBeauty ? service.items[0] : null;
  const rightItems = isSpaBeauty ? service.items.slice(1) : service.items;
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
        {isSpaBeauty ? (
          /* Split Layout for Spa & Beauty */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Side - Long Card */}
            {leftItem && (
              <div className="bg-main-green rounded-[2rem] p-8 text-main-beige h-full">
                <h3 className="text-xl md:text-2xl font-semibold text-main-beige font-heading mb-4">
                  {leftItem.title}
                </h3>
                <p className="text-base md:text-lg text-main-beige leading-relaxed font-body mb-6">
                  {leftItem.description}
                </p>
                
                {/* Personalization Section */}
                {leftItem.personalization && (
                  <div className="mt-8 pt-8 border-t border-main-beige/20">
                    <h4 className="text-xl md:text-2xl font-semibold text-main-beige font-heading mb-3">
                      {leftItem.personalization.heading}
                    </h4>
                    <p className="text-base md:text-lg text-main-beige leading-relaxed font-body mb-6">
                      {leftItem.personalization.description}
                    </p>
                    
                    {/* Bullet Points with Iconify Icons */}
                    <ul className="space-y-4">
                      {leftItem.personalization.bulletPoints.map((bullet, bulletIndex) => (
                        <li
                          key={bulletIndex}
                          className="flex items-center text-main-beige font-body"
                        >
                          <Icon
                            icon={bullet.icon}
                            className="w-6 h-6 text-main-beige mr-4 flex-shrink-0"
                          />
                          <span className="text-base md:text-lg">{bullet.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Bullet Points with Icons */}
                {leftItem.bulletPoints && leftItem.bulletPoints.length > 0 && (
                  <ul className="space-y-3 mt-6">
                    {leftItem.bulletPoints.map((bullet, bulletIndex) => (
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
            )}
            
            {/* Right Side - Stacked Cards */}
            <div className="flex flex-col gap-8 h-full">
              {rightItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-main-green rounded-[2rem] p-8 text-main-beige flex-1"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-main-beige font-heading mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-main-beige leading-relaxed font-body mb-6">
                    {item.description}
                  </p>
                  
                  {/* Personalization Section */}
                  {item.personalization && (
                    <div className="mt-8 pt-8 border-t border-main-beige/20">
                      <h4 className="text-xl md:text-2xl font-semibold text-main-beige font-heading mb-3">
                        {item.personalization.heading}
                      </h4>
                      <p className="text-base md:text-lg text-main-beige leading-relaxed font-body mb-6">
                        {item.personalization.description}
                      </p>
                      
                      {/* Bullet Points with Iconify Icons */}
                      <ul className="space-y-4">
                        {item.personalization.bulletPoints.map((bullet, bulletIndex) => (
                          <li
                            key={bulletIndex}
                            className="flex items-center text-main-beige font-body"
                          >
                            <Icon
                              icon={bullet.icon}
                              className="w-6 h-6 text-main-beige mr-4 flex-shrink-0"
                            />
                            <span className="text-base md:text-lg">{bullet.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
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
        ) : (
          /* Regular 3-column Grid for Other Services */
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
                
                {/* Personalization Section */}
                {item.personalization && (
                  <div className="mt-8 pt-8 border-t border-main-beige/20">
                    <h4 className="text-xl md:text-2xl font-semibold text-main-beige font-heading mb-3">
                      {item.personalization.heading}
                    </h4>
                    <p className="text-base md:text-lg text-main-beige leading-relaxed font-body mb-6">
                      {item.personalization.description}
                    </p>
                    
                    {/* Bullet Points with Iconify Icons */}
                    <ul className="space-y-4">
                      {item.personalization.bulletPoints.map((bullet, bulletIndex) => (
                        <li
                          key={bulletIndex}
                          className="flex items-center text-main-beige font-body"
                        >
                          <Icon
                            icon={bullet.icon}
                            className="w-6 h-6 text-main-beige mr-4 flex-shrink-0"
                          />
                          <span className="text-base md:text-lg">{bullet.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
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
        )}
      </div>
    </section>
  );
}
