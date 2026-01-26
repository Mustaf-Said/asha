"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LangCode = 'en' | 'so' | 'ar';

interface LanguageContextType {
  language: LangCode;
  setLanguage: (lang: LangCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'globalnurse_language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LangCode>('en');
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'so' || stored === 'ar') {
      setLanguageState(stored);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: LangCode) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  // Prevent hydration mismatch by rendering children only after mount
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
