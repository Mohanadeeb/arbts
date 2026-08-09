import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../../i18n/i18n';
import { SupportedLanguage } from '../../i18n/translations';
import { Globe, ChevronDown, Check } from './Icons';

export const LanguageSelector: React.FC = () => {
  const { currentLanguageConfig, languages, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition text-sm font-medium shadow-sm"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-blue-600" />
        <span className="text-base leading-none">{currentLanguageConfig.flag}</span>
        <span className="hidden sm:inline">{currentLanguageConfig.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
            Välj språk / Language
          </div>
          <div className="max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as SupportedLanguage);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-blue-50 transition ${
                  lang.code === currentLanguageConfig.code ? 'bg-blue-50/70 font-semibold text-blue-700' : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{lang.flag}</span>
                  <div>
                    <div className="font-medium text-slate-900">{lang.nativeName}</div>
                    <div className="text-[11px] text-slate-400">{lang.name} {lang.dir === 'rtl' ? '(RTL)' : ''}</div>
                  </div>
                </div>
                {lang.code === currentLanguageConfig.code && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
