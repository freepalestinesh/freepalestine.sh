import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { Link, useParams } from "react-router-dom";
import FlagCube from "../components/FlagCube";
import { getAllPosts, Post as PostType } from "@/lib/posts";
import { useI18n } from "@/i18n";
import "../global-mobile.css";

// Konfiguration für Positionierung
const TOP_RATIO_DESKTOP = 0.68; // Anteil des freien Raums über dem Würfel (je höher, desto weiter unten der Würfel erscheint)
const TOP_RATIO_MOBILE = 0.55;

const MIN_TOP = 96;
const MIN_BOTTOM = 40;
const MAX_TOP = 300;
const MAX_BOTTOM = 220;

const EXTRA_RERUN_DELAYS = [60, 140, 260, 500]; // ms – mehrfache Nachmessung (Font / RTL Layout Stabilisierung)

const RTL_LANGS = ["ar", "fa", "he", "ur"];

export default function Index() {
  const { lang = "en" } = useParams();
  const isRTL = RTL_LANGS.includes(lang);
  const { t, formatDate } = useI18n();
  const [postsData, setPostsData] = useState<PostType[]>([]);

  useEffect(() => {
    getAllPosts(lang).then(setPostsData);
  }, [lang]);

  const first = postsData[0];

  // Refs
  const titleWrapperRef = useRef<HTMLElement | null>(null);   // Gemeinsamer Hero-Bereich
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const cubeWrapperRef = useRef<HTMLDivElement | null>(null);
  const firstArticleRef = useRef<HTMLElement | null>(null);

  const [margins, setMargins] = useState<{ mt: number; mb: number }>({
    mt: 140,
    mb: 64,
  });

  const recompute = useCallback(() => {
    const tag = taglineRef.current;
    const cubeWrap = cubeWrapperRef.current;
    const article = firstArticleRef.current;

    if (!tag || !cubeWrap || !article) return;

    // Temporär zurücksetzen für echte Messung
    const prevTop = cubeWrap.style.marginTop;
    const prevBottom = cubeWrap.style.marginBottom;
    cubeWrap.style.marginTop = "0px";
    cubeWrap.style.marginBottom = "0px";

    const tagRect = tag.getBoundingClientRect();
    const cubeRect = cubeWrap.getBoundingClientRect();
    const articleRect = article.getBoundingClientRect();

    // Raum zwischen Ende Tagline und Beginn Artikel
    const totalSpace = articleRect.top - tagRect.bottom;
    // Davon abzüglich der Cube-Höhe
    const free = totalSpace - cubeRect.height;
    const usable = Math.max(free, 0);

    // Verhältnis wählen (Desktop tiefer)
    const ratio =
      (typeof window !== "undefined" && window.innerWidth < 640)
        ? TOP_RATIO_MOBILE
        : TOP_RATIO_DESKTOP;

    // Würfel bewusst tiefer als Mitte
    let top = usable * ratio;
    let bottom = usable - top;

    // Clamp
    top = Math.max(MIN_TOP, Math.min(top, MAX_TOP));
    bottom = Math.max(MIN_BOTTOM, Math.min(bottom, MAX_BOTTOM));

    // Falls Clamps die Summe sprengen → neu balancieren
    if (top + bottom > usable && usable > 0) {
      bottom = Math.max(MIN_BOTTOM, usable - top);
    }

    // Fallback bei sehr kleinem Raum
    if (usable < 40) {
      top = Math.max(MIN_TOP, 120);
      bottom = MIN_BOTTOM;
    }

    setMargins({
      mt: Math.round(top),
      mb: Math.round(bottom),
    });

    // Ursprungswerte zurück (Transition greift beim nächsten Frame)
    cubeWrap.style.marginTop = prevTop;
    cubeWrap.style.marginBottom = prevBottom;
  }, []);

  // Erstberechnung & Re-Runs wenn Daten/FIRST verfügbar
  useLayoutEffect(() => {
    recompute();
  }, [recompute, postsData.length, first?.slug, isRTL]);

  // Mehrfache verzögerte Re-Messung (Fonts, RTL Layout shifts)
  useEffect(() => {
    EXTRA_RERUN_DELAYS.forEach((d) => {
      const id = setTimeout(() => recompute(), d);
      return () => clearTimeout(id);
    });
  }, [recompute, postsData.length, first?.slug, isRTL]);

  // Resize / Orientation / Font Loading
  useEffect(() => {
    const onResize = () => recompute();
    window.addEventListener("resize", onResize);
    // Noch ein späterer Check
    const id = setTimeout(recompute, 900);
    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(() => setTimeout(recompute, 50)).catch(() => {});
    }
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(id);
    };
  }, [recompute]);

  const firstParagraphHTML = (() => {
    if (!first) return "";
    const html = first.html || "";
    if (html.includes("</p>")) {
      const p = html.split(/<\/p>/i)[0];
      return p.endsWith("</p>") ? p : p + "</p>";
    }
    const raw = first.excerpt || html;
    return `<p>${raw.substring(0, 320)}${raw.length > 320 ? "…" : ""}</p>`;
  })();

  return (
    <div className={`relative ${isRTL ? "rtl" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Bereich (Titel + Tagline) */}
      <section
        ref={titleWrapperRef}
        className={`hero-layout mb-0 flex flex-col prose prose-zinc dark:prose-invert max-w-prose ${
          isRTL ? "items-center text-center" : ""
        }`}
      >
        <header>
          <h1
            className={`not-prose text-3xl md:text-4xl font-semibold tracking-tight leading-tight ${
              isRTL ? "text-center" : ""
            }`}
          >
            {t("site.title") || "freepalestine.sh"}
          </h1>
          <p
            ref={taglineRef}
            className={`mt-3 text-[15px] leading-relaxed text-muted-foreground ${
              isRTL ? "text-center" : "max-w-prose"
            }`}
          >
            {t("site.tagline")}
          </p>
        </header>
      </section>

      {/* Würfel – jetzt Full Width und tiefer positioniert */}
      <div
        ref={cubeWrapperRef}
        style={{
          marginTop: `${margins.mt}px`,
          marginBottom: `${margins.mb}px`,
          transition: "margin 200ms ease",
        }}
        className="w-full flex justify-center"
      >
        <FlagCube />
      </div>

      {/* Content Bereich (zurück zur typografischen Breite) */}
      <div
        className={`prose prose-zinc dark:prose-invert max-w-prose ${
          isRTL ? "text-right" : ""
        }`}
      >
        {first && (
          <article
            ref={firstArticleRef}
            className={`relative z-10 pb-8 md:pb-10 border-b ${
              isRTL ? "text-right" : ""
            }`}
          >
            <header
              className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 ${
                isRTL ? "sm:flex-row-reverse" : ""
              }`}
            >
              <h2 className="not-prose text-xl md:text-2xl font-semibold leading-snug">
                <Link
                  to={`/${lang}/post/${first.slug}`}
                  className="underline decoration-transparent hover:decoration-current"
                >
                  {first.title}
                </Link>
              </h2>
              <time className="text-xs md:text-sm text-muted-foreground">
                {formatDate(first.date || "")}
              </time>
            </header>
            <div
              className="mt-3 text-sm md:text-[15px] leading-relaxed text-foreground/80"
              dangerouslySetInnerHTML={{ __html: firstParagraphHTML }}
            />
            <div className={`mt-4 ${isRTL ? "text-left sm:text-right" : ""}`}>
              <Link
                to={`/${lang}/post/${first.slug}`}
                className="text-xs uppercase tracking-wide font-medium underline decoration-dotted hover:decoration-solid"
              >
                {t("post.readFull") || "Read full article →"}
              </Link>
            </div>
            {first.tags?.length ? (
              <ul
                className={`mt-4 flex flex-wrap gap-2 text-[11px] md:text-xs ${
                  isRTL ? "justify-end" : ""
                }`}
              >
                {first.tags.map((tg) => (
                  <li
                    key={tg}
                    className="rounded border px-2 py-0.5 text-muted-foreground"
                  >
                    #{tg}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        )}

        {postsData.slice(1).map((post) => (
            <article
              key={post.slug}
              className={`py-8 md:py-10 border-b last:border-b-0 ${
                isRTL ? "text-right" : ""
              }`}
            >
              <header
                className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 ${
                  isRTL ? "sm:flex-row-reverse" : ""
                }`}
              >
                <h2 className="not-prose text-lg md:text-xl font-semibold leading-snug">
                  <Link
                    to={`/${lang}/post/${post.slug}`}
                    className="underline decoration-transparent hover:decoration-current"
                  >
                    {post.title}
                  </Link>
                </h2>
                <time className="text-xs md:text-sm text-muted-foreground">
                  {formatDate(post.date || "")}
                </time>
              </header>
              <div
                className="mt-3 text-sm md:text-[15px] leading-relaxed text-foreground/80"
                dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
              />
              {post.tags?.length ? (
                <ul
                  className={`mt-4 flex flex-wrap gap-2 text-[11px] md:text-xs ${
                    isRTL ? "justify-end" : ""
                  }`}
                >
                  {post.tags.map((tg) => (
                    <li
                      key={tg}
                      className="rounded border px-2 py-0.5 text-muted-foreground"
                    >
                      #{tg}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
      </div>
    </div>
  );
}
