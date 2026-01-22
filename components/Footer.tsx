"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-main-green text-main-beige py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          {/* Left side - Contact Section */}
          <div className="flex flex-col md:max-w-[50%]">
            {/* Contact Heading */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-main-beige font-heading">
                Contact
              </h2>
            </div>

            {/* Contact Info - Below heading */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* First part - Address */}
            <div>
              <h3 className="text-sm md:text-base font-medium text-main-beige uppercase mb-4 font-body tracking-wider">
                Address
              </h3>
              <p className="text-lg text-main-beige leading-relaxed font-heading">
                Oaxaca #96 int. 103
                <br />
                Col. Roma Norte
                <br />
                CDMX
                <br />
                C.P. 06700
              </p>
            </div>

              {/* Second part - Phone, Email, Social */}
              <div className="flex flex-col gap-6">
                {/* Phone */}
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-main-beige flex-shrink-0"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <Link
                    href="tel:+525571587284"
                    className="text-lg text-main-beige hover:opacity-80 transition-opacity font-body"
                  >
                    01 (55) 71587284
                  </Link>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-main-beige flex-shrink-0"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <Link
                    href="mailto:info@henko.mx"
                    className="text-lg text-main-beige hover:opacity-80 transition-opacity font-body"
                  >
                    info@henko.mx
                  </Link>
                </div>

                {/* Social Icons - Rounded Square */}
                <div className="flex items-center gap-4">
                  {/* Instagram */}
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-main-beige/20 rounded-lg flex items-center justify-center hover:bg-main-beige/30 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-main-beige"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </Link>

                  {/* Facebook */}
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-main-beige/20 rounded-lg flex items-center justify-center hover:bg-main-beige/30 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-main-beige"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Logo */}
          <div className="lg:flex lg:items-center lg:justify-end flex-shrink-0">
            <img 
              src="/images/logo-beige.svg" 
              alt="Henko Logo" 
              className="h-24 md:h-24 lg:h-32 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
