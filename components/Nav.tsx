"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import Button from "./ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBookingModal } from "@/contexts/BookingModalContext";

export default function Nav() {
  const { t, language, setLanguage } = useLanguage();
  const { openModal } = useBookingModal();
  const pathname = usePathname();
  const router = useRouter();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pendingScrollTarget = useRef<string | null>(null);
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll to section when navigating from another page or when page loads with hash
  useEffect(() => {
    if (isHomepage && typeof window !== "undefined") {
      const targetId = pendingScrollTarget.current || window.location.hash.substring(1);
      
      if (targetId) {
        // Wait for the page to fully render and all components to mount
        const scrollToSection = () => {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const navHeight = 64;
            const targetPosition = targetElement.offsetTop - navHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            // Clear the pending scroll target after scrolling
            pendingScrollTarget.current = null;
          } else {
            // If element not found yet, try again after a short delay
            setTimeout(scrollToSection, 50);
          }
        };
        // Initial delay to ensure page is rendered
        setTimeout(scrollToSection, 300);
      }
    }
  }, [isHomepage, pathname]);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isMenuOpen) {
      // Open menu
      gsap.fromTo(
        menuRef.current,
        { x: "100%" },
        {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        }
      );
      document.body.style.overflow = "hidden";
    } else {
      // Close menu
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power2.in",
      });
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  const navItems = [
    { label: t.common.nav.concept, href: "#concept" },
    { label: t.common.nav.services, href: "#experience" },
    { label: t.common.nav.fuelShop, href: "#fuel-shop" },
    { label: t.common.nav.pilars, href: "#pilars" },
    { label: t.common.nav.packages, href: "/packages" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);
    
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      
      // If we're on the homepage, scroll directly to the section
      if (isHomepage) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navHeight = 64; // Height of fixed nav
          const targetPosition = targetElement.offsetTop - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // If we're on another page, store the target and navigate to homepage
        // The useEffect will handle scrolling after navigation completes
        pendingScrollTarget.current = targetId;
        router.push("/");
      }
    }
    // For regular page links (like /packages), let the browser handle navigation normally
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full bg-bg-beige z-50 transition-all border-b border-main-green/20 ${
          isAtTop ? "md:border-b-0" : "md:border-b"
        }`}
      >
        <div className="max-w-8xl mx-auto lg:px-16 px-4 lg:py-0">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Nav Items */}
            <div className="flex items-center lg:space-x-12 space-x-8">
              <div className="flex-shrink-0">
                <Link 
                  href="/" 
                  onClick={handleLinkClick}
                  className="flex items-center"
                >
                  <img 
                    src="/images/logo.svg" 
                    alt={t.navSection.logoAlt}
                    className={`h-8 md:h-12 w-auto transition-all duration-300 ${
                      !isAtTop ? "md:h-8 h-8" : ""
                    }`}
                  />
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="text-main-green hover:text-oxide transition-colors font-medium cursor-pointer"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === "en" ? "es" : "en")}
                className="px-4 py-2 rounded-full border-2 border-main-green text-main-green hover:bg-main-green hover:text-main-beige transition-colors font-medium text-sm"
                aria-label={language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
              >
                {language === "en" ? t.navSection.languageSpanish : t.navSection.languageEnglish}
              </button>
              {/* Booking Button */}
              <Button variant="primary" onClick={openModal}>{t.common.nav.booking}</Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
              aria-label={t.navSection.menuToggle}
            >
              <span
                className={`block w-6 h-0.5 bg-main-green transition-all ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-main-green transition-all ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-main-green transition-all ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel - Full Screen */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-full bg-oxide z-50 md:hidden"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex flex-col items-center justify-center h-full px-6 relative">
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-main-beige"
            aria-label={t.navSection.menuClose}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Nav Items - Centered */}
          <nav className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-main-beige text-3xl font-medium hover:opacity-80 transition-opacity text-center cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language Toggle */}
          <div className="mt-8">
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="px-6 py-3 rounded-full border-2 border-main-beige text-main-beige hover:bg-main-beige hover:text-oxide transition-colors font-medium text-lg"
              aria-label={language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
            >
              {language === "en" ? t.navSection.languageSpanish : t.navSection.languageEnglish}
            </button>
          </div>

          {/* Booking Button */}
          <div className="mt-8">
            <Button
              variant="secondary"
              onClick={() => {
                setIsMenuOpen(false);
                openModal();
              }}
              className="px-8 py-4 text-xl"
            >
              {t.common.nav.booking}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
