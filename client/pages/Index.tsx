import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import FlagCube from "../components/FlagCube";
import { getAllPosts, Post as PostType } from "@/lib/posts";
import { useI18n } from "@/i18n";
import "../global-mobile.css";

const MIN_TOP = 80;
const MIN_BOTTOM = 48;
const DEPTH_BIAS = 0.62; // >0.5 = tiefer
const MAX_TOP = 260;
const MAX_BOTTOM = 200;

export default function Index() {
  const { lang = "en" } = useParams();
  const { t, formatDate } = useI18n();
  const [postsData, setPostsData] = useState<PostType[]>([]);
  useEffect(() => { getAllPosts(lang).then(setPostsData); }, [lang]);

  const first = postsData[0];

  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const cubeWrapRef = useRef<HTMLDivElement | null>(null);
  const articleRef = useRef<HTMLElement | null>(null);

  const [margins, setMargins] = useState({ mt: 160, mb: 64 });

  const recompute = useCallback(() => {
    const tl = taglineRef.current;
    const cw = cubeWrapRef.current;
    const art = articleRef.current;
    if (!tl || !cw || !art) return;

    // Temporär neutralisieren
    const prevT = cw.style.marginTop;
    const prevB = cw.style.marginBottom;
    cw.style.marginTop = "0px";
    cw.style.marginBottom = "0px";

    const tagRect = tl.getBoundingClientRect();
    const cubeRect = cw.getBoundingClientRect();
    const artRect = art.getBoundingClientRect();

    const total = artRect.top - tagRect.bottom;
    const free = total - cubeRect.height;
    const usable = Math.max(free, 0);

    let top = usable * DEPTH_BIAS;
    let bottom = usable - top;

    top = Math.max(MIN_TOP, Math.min(top, MAX_TOP));
    bottom = Math.max(MIN_BOTTOM, Math.min(bottom, MAX_BOTTOM));

    if (top + bottom > usable && usable > 0) {
      // Rebalance falls clamps zu groß
      const scale = usable / (top + bottom);
      top = Math.round(top * scale);
      bottom = Math.round(bottom * scale);
    }

    setMargins({ mt: Math.round(top), mb: Math.round(bottom) });

    // Restore (Transition greift erst beim Re-Render)
    cw.style.marginTop = prevT;
    cw.style.marginBottom = prevB;
  }, []);

  // Initial & re-run bei Content/Größenwechsel
  useLayoutEffect(() => {
    recompute();
  }, [recompute, postsData.length, first?.slug]);

  useEffect(() => {
    const onResize = () => recompute();
    window.addEventListener("resize", onResize);
    const fontTimeout = setTimeout(recompute, 120);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(fontTimeout);
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
    <div className="prose prose-zinc dark:prose-invert max-w-none relative">
      <section className="mb-0 flex flex-col items-start">
        <header>
          <h1 className="not-prose text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
            {t("site.title") || "freepalestine.sh"}
          </h1>
          <p
            ref={taglineRef}
            className="mt-3 text-[15px] leading-relaxed text-muted-foreground max-w-prose"
          >
            {t("site.tagline")}
          </p>
        </header>

        <div
          ref={cubeWrapRef}
            style={{
              marginTop: `${margins.mt}px`,
              marginBottom: `${margins.mb}px`,
              transition: "margin 220ms ease",
            }}
            className="w-full flex justify-center"
        >
          <FlagCube />
        </div>

        {first && (
          <article
            ref={articleRef}
            className="relative z-10 pb-8 md:pb-10 border-b max-w-prose"
          >
            <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
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
            <div className="mt-4">
              <Link
                to={`/${lang}/post/${first.slug}`}
                className="text-xs uppercase tracking-wide font-medium underline decoration-dotted hover:decoration-solid"
              >
                {t("post.readFull") || "Read full article →"}
              </Link>
            </div>
            {first.tags?.length ? (
              <ul className="mt-4 flex flex-wrap gap-2 text-[11px] md:text-xs">
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
      </section>

      {postsData.slice(1).map((post) => (
        <article
          key={post.slug}
          className="py-8 md:py-10 border-b last:border-b-0 max-w-prose"
        >
          <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
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
            <ul className="mt-4 flex flex-wrap gap-2 text-[11px] md:text-xs">
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
  );
}
