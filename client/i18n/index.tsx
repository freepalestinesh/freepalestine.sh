import React, {
  createContext, useContext, useEffect, useState,
  ReactNode, useCallback
} from 'react';
import { LANGUAGES, isRTL, LangCode } from './languages';

import en from './locales/en.json';
import ar from './locales/ar.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';
import ru from './locales/ru.json';
import fa from './locales/fa.json';

type Dictionary = Record<string,string>;
const dictionaries: Record<LangCode, Dictionary> = { en, ar, de, fr, zh, ru, fa };

interface I18nContextValue {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (k: string) => string;
  dir: 'ltr' | 'rtl';
  formatDate: (iso: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface ProviderProps {
  children: ReactNode;
  lang?: string;
  forcedLang?: string;
}

const detectInitial = (): LangCode => {
  try {
    const stored = localStorage.getItem('lang') as LangCode | null;
    if (stored && dictionaries[stored]) return stored;
  } catch {}
  const nav = typeof navigator !== 'undefined' ? navigator.language.slice(0,2) : 'en';
  const match = (Object.keys(dictionaries) as LangCode[]).find(c => c === nav);
  return match || 'en';
};

export function I18nProvider({ children, lang, forcedLang }: ProviderProps) {
  const routeLang = (forcedLang || lang) as LangCode | undefined;
  const initial = routeLang && dictionaries[routeLang] ? routeLang : detectInitial();

  const [current, setCurrent] = useState<LangCode>(initial);

  useEffect(() => {
    if (routeLang && dictionaries[routeLang]) setCurrent(routeLang);
  }, [routeLang]);

  const setLang = useCallback((l: LangCode) => {
    setCurrent(l);
    try { localStorage.setItem('lang', l); } catch {}
  }, []);

  const dir = isRTL(current) ? 'rtl' : 'ltr';

  useEffect(() => {
    const html = document.documentElement;
    html.lang = current;
    html.dir = dir;
  }, [current, dir]);

  const t = useCallback(
    (key: string) => dictionaries[current][key] || dictionaries.en[key] || key,
    [current]
  );

  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(current, {
        year: 'numeric', month: '2-digit', day: '2-digit'
      }).format(new Date(iso));
    } catch { return iso; }
  };

  return (
    <I18nContext.Provider value={{ lang: current, setLang, t, dir, formatDate }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}