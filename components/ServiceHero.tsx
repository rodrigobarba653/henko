"use client";

interface ServiceHeroProps {
  heading: string;
  subheading?: string;
  imageUrl: string;
}

export default function ServiceHero({
  heading,
  subheading,
  imageUrl,
}: ServiceHeroProps) {
  return (
    <section className="relative w-full py-8 md:py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="relative w-full h-[40vh] lg:h-[70vh] md:min-h-[500px] rounded-[2rem] overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Content overlay */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-main-beige font-heading mb-4">
                {heading}
              </h1>
              {subheading && (
                <p className="text-lg md:text-xl text-main-beige">
                  {subheading}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
