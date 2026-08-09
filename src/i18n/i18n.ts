import { useState, useEffect } from 'react';
import { TRANSLATIONS, LANGUAGES, SupportedLanguage, LanguageConfig } from './translations';

const STORAGE_KEY = 'arbetslyft_language';
const LANGUAGE_EVENT = 'arbetslyft_language_change';

export function getSavedLanguage(): SupportedLanguage {
  const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage;
  if (saved && TRANSLATIONS[saved]) {
    return saved;
  }
  return 'sv';
}

export function setSavedLanguage(lang: SupportedLanguage) {
  localStorage.setItem(STORAGE_KEY, lang);
  const langConfig = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  document.documentElement.dir = langConfig.dir;
  document.documentElement.lang = lang;
  if (langConfig.dir === 'rtl') {
    document.body.classList.add('rtl-layout');
  } else {
    document.body.classList.remove('rtl-layout');
  }
  // Dispatch global event to sync all mounted components
  window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: lang }));
}

export function useTranslation() {
  const [currentLang, setCurrentLangState] = useState<SupportedLanguage>(getSavedLanguage());

  useEffect(() => {
    // Initial sync
    const initialConfig = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
    document.documentElement.dir = initialConfig.dir;
    document.documentElement.lang = currentLang;

    // Listen for cross-component language change events
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<SupportedLanguage>;
      if (customEvent.detail) {
        setCurrentLangState(customEvent.detail);
      }
    };

    window.addEventListener(LANGUAGE_EVENT, handleLangChange);
    return () => window.removeEventListener(LANGUAGE_EVENT, handleLangChange);
  }, [currentLang]);

  const setLanguage = (lang: SupportedLanguage) => {
    setSavedLanguage(lang);
    setCurrentLangState(lang);
  };

  const t = (key: string, defaultText?: string): string => {
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS['sv'];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const fallbackDict = TRANSLATIONS['sv'];
    if (fallbackDict && fallbackDict[key]) {
      return fallbackDict[key];
    }
    return defaultText || key;
  };

  const currentLanguageConfig: LanguageConfig =
    LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return {
    t,
    currentLang,
    setLanguage,
    currentLanguageConfig,
    languages: LANGUAGES,
    isRTL: currentLanguageConfig.dir === 'rtl'
  };
}
