"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Language, translations } from "@/data/i18n";
import { servicesTranslations } from "@/data/services-i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  services: typeof servicesTranslations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = translations[language];
  const services = servicesTranslations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, services }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
