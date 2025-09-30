export type LangCode = 'en' | 'ar' | 'de' | 'fr' | 'zh' | 'ru' | 'fa';

export interface LanguageMeta {
  code: LangCode;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  label?: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', nativeName: 'English', dir: 'ltr', label: 'EN' },
  { code: 'de', nativeName: 'Deutsch', dir: 'ltr', label: 'DE' },
  { code: 'fr', nativeName: 'Français', dir: 'ltr', label: 'FR' },
  { code: 'zh', nativeName: '中文', dir: 'ltr', label: 'ZH' },
  { code: 'ru', nativeName: 'Русский', dir: 'ltr', label: 'RU' },
  { code: 'ar', nativeName: 'العربية', dir: 'rtl', label: 'AR' },
  { code: 'fa', nativeName: 'فارسی', dir: 'rtl', label: 'FA' }
];

export const isRTL = (code: LangCode) =>
  LANGUAGES.find(l => l.code === code)?.dir === 'rtl';