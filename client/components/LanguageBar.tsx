import React from 'react';
import { LANGUAGES } from '@/i18n/languages';
import { useParams } from 'react-router-dom';

export default function LanguageBar() {
  const { lang } = useParams();
  const active = lang || 'en';
  return (
    <nav className="text-xs font-medium tracking-wide">
      <ul className="flex flex-wrap items-center gap-2">
        {LANGUAGES.map((l, idx) => {
          const isActive = l.code === active;
          return (
            <li key={l.code} className="flex items-center">
              <a
                href={`/${l.code}/`}
                className={
                  isActive
                    ? "underline underline-offset-4 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
                }
              >
                {l.label || l.code.toUpperCase()}
              </a>
              {idx < LANGUAGES.length - 1 && (
                <span className="mx-1 text-muted-foreground select-none">|</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}