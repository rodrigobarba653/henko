"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Button from "./ui/Button";

export default function Nav() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { label: "Concept", href: "#concept" },
    { label: "Services", href: "#experience" },
    { label: "Fuel & Shop", href: "#fuel-shop" },
    { label: "Pilars", href: "#pilars" },
    { label: "Packages", href: "/packages" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);
    
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navHeight = 64; // Height of fixed nav
        const targetPosition = targetElement.offsetTop - navHeight;
        const currentScrollY = window.scrollY;
        
        // If not at the top (not in hero), scroll to hero first, then to target
        if (currentScrollY > 100) {
          // First, scroll to top (hero section)
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          
          // Wait for scroll to top to complete, then scroll to target
          const scrollToTop = () => {
            const checkScroll = setInterval(() => {
              if (window.scrollY <= 10) {
                clearInterval(checkScroll);
                // Small delay to ensure we're at top, then scroll to target
                setTimeout(() => {
                  window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                  });
                }, 100);
              }
            }, 50);
            
            // Fallback timeout in case scroll detection doesn't work
            setTimeout(() => {
              clearInterval(checkScroll);
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }, 1000);
          };
          
          scrollToTop();
        } else {
          // Already at top, just scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
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
                    alt="Henko Logo" 
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

            {/* Desktop Booking Button */}
            <div className="hidden md:block flex-shrink-0">
              <Button variant="primary">Booking</Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
              aria-label="Toggle menu"
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
            aria-label="Close menu"
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

          {/* Booking Button */}
          <div className="mt-12">
            <Button
              variant="secondary"
              onClick={handleLinkClick}
              className="px-8 py-4 text-xl"
            >
              Booking
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
