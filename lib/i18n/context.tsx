"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import es from "./es.json";
import en from "./en.json";

type Locale = "es" | "en";
type Translations = typeof es;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const translations: Record<Locale, Translations> = { es, en };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Detect browser language
function detectLanguage(): Locale {
  if (typeof window === "undefined") return "es";
  
  const stored = localStorage.getItem("pentair-locale");
  if (stored === "en" || stored === "es") return stored;
  
  const browserLang = navigator.language.split("-")[0];
  return browserLang === "en" ? "en" : "es";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(detectLanguage());
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("pentair-locale", newLocale);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: "es", setLocale, t: translations.es }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

// Language toggle component
export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className="flex items-center bg-gray-100 rounded-full text-xs font-medium overflow-hidden"
      role="group"
      aria-label="Language selection"
    >
      <button
        onClick={() => setLocale("en")}
        className={`px-2.5 py-1.5 transition-colors ${
          locale === "en"
            ? "bg-[#0D274D] text-white"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("es")}
        className={`px-2.5 py-1.5 transition-colors ${
          locale === "es"
            ? "bg-[#0D274D] text-white"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
        }`}
        aria-pressed={locale === "es"}
      >
        ES
      </button>
    </div>
  );
}
