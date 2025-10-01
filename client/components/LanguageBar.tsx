import React, { useEffect, useState } from "react";
import { LANGUAGES } from "@/i18n/languages";
import { useLocation, useParams, Link } from "react-router-dom";
import { getLanguageAvailability } from "@/lib/posts";

interface Availability {
  [lang: string]: string; // targetSlug
}

export default function LanguageBar() {
  const { lang, slug } = useParams();
  const location = useLocation();
  const active = lang || "en";
  const isPost = /\/post\/[^/]+/.test(location.pathname);
  const [availability, setAvailability] = useState<Availability>({});

  useEffect(() => {
    if (isPost && slug) {
      getLanguageAvailability(slug, active).then(setAvailability).catch(() => {});
    } else {
      setAvailability({});
    }
  }, [isPost, slug, active]);

  return (
    <nav className="text-xs font-medium tracking-wide" aria-label="Language selector">
      <ul className="flex flex-wrap items-center gap-2">
        {LANGUAGES.map((l, idx) => {
          const isActive = l.code === active;
            let targetPath: string;
          if (isPost && slug) {
            // Was ist die slug im Ziel?
            const targetSlug = availability[l.code] || (availability[l.code] === "" ? "" : (l.code === active ? slug : ""));
            if (l.code === active) {
              targetPath = `/${l.code}/post/${slug}`;
            } else if (availability[l.code]) {
              targetPath = `/${l.code}/post/${availability[l.code]}`;
            } else {
              // Keine Übersetzung → fallback auf Home
              targetPath = `/${l.code}/`;
            }
          } else {
            targetPath = `/${l.code}/`;
          }

          const noTranslation = isPost && !isActive && !availability[l.code];

          return (
            <li key={l.code} className="flex items-center">
              {isActive ? (
                <span
                  className="underline underline-offset-4 text-foreground"
                  aria-current="true"
                >
                  {l.label || l.code.toUpperCase()}
                </span>
              ) : (
                <Link
                  to={targetPath}
                  className={
                    noTranslation
                      ? "text-muted-foreground opacity-50 cursor-not-allowed"
                      : "text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
                  }
                  aria-disabled={noTranslation ? "true" : "false"}
                  title={
                    noTranslation
                      ? `No translation available in ${l.nativeName}`
                      : `View in ${l.nativeName}`
                  }
                >
                  {l.label || l.code.toUpperCase()}
                </Link>
              )}
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
