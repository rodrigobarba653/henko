"use client";

import { useEffect } from "react";
import { useBookingModal } from "@/contexts/BookingModalContext";

export default function BookingModal() {
  const { isOpen, closeModal } = useBookingModal();

  // Prevent html and body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      onClick={closeModal}
    >

      {/* Modal Content */}
      <div
        className="w-full h-full flex flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo */}
        <div className="flex justify-between items-center md:py-4 py-0 px-4 bg-white border-b border-gray-200">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="h-8 md:h-12 w-auto"
          />
                {/* Close Button */}
      <button
        onClick={closeModal}
        className="z-10 p-2 text-[#1a1a1a] hover:text-main-green transition-colors"
        aria-label="Close modal"
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
        </div>

        {/* Iframe Container */}
        <div className="flex-1 w-full overflow-hidden bg-white">
          <iframe
            src="https://app.glofox.com/portal/#/branch/694429272459803e3e0d5054/classes-day-view"
            frameBorder="0"
            width="100%"
            height="100%"
            className="w-full h-full"
            title="Booking System"
          />
        </div>

        {/* Footer with Glofox attribution */}
        <div className="bg-white border-t border-gray-200 py-3 px-4 text-center">
          <a
            href="https://www.glofox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-main-green transition-colors"
          >
            powered by <b>Glofox</b>
          </a>
        </div>
      </div>
    </div>
  );
}
