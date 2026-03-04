"use client";

interface ServiceHeroProps {
  heading: string;
  subheading?: string;
  imageUrl: string;
  imageUrlMobile?: string;
}

export default function ServiceHero({
  heading,
  subheading,
  imageUrl,
  imageUrlMobile,
}: ServiceHeroProps) {
  return (
    <section className="relative w-full py-8 md:py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative w-full h-[40vh] lg:h-[500px] md:min-h-[500px] rounded-[2rem] overflow-hidden bg-cover bg-center bg-no-repeat">
          {/* Mobile hero (only when imageUrlMobile provided) */}
          {imageUrlMobile && (
            <div
              className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${imageUrlMobile})` }}
              aria-hidden
            />
          )}
          {/* Desktop hero (or single hero when no mobile image) */}
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${imageUrlMobile ? "hidden md:block" : ""}`}
            style={{ backgroundImage: `url(${imageUrl})` }}
            aria-hidden={!!imageUrlMobile}
          />
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
