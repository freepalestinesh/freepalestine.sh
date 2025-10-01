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

export default function Index() {
  const { lang = "en" } = useParams();
  const { t, formatDate } = useI18n();
  const [postsData, setPostsData] = useState<PostType[]>([]);

  useEffect(() => {
    getAllPosts(lang).then(setPostsData);
  }, [lang]);

  const first = postsData[0];

  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const cubeWrapperRef = useRef<HTMLDivElement | null>(null);
  const firstArticleRef = useRef<HTMLElement | null>(null);

  const [margins, setMargins] = useState<{ mt: number; mb: number }>({
    mt: 72,
    mb: 48,
  });

  const recompute = useCallback(() => {
    const tl = taglineRef.current;
    const cw = cubeWrapperRef.current;
    const art = firstArticleRef.current;
    if (!tl || !cw || !art) return;

    // Temporär auf 0 für exakte Messung
    const prevTop = cw.style.marginTop;
    const prevBottom = cw.style.marginBottom;
    cw.style.marginTop = "0px";
    cw.style.marginBottom = "0px";

    const tagRect = tl.getBoundingClientRect();
    const cubeRect = cw.getBoundingClientRect();
    const artRect = art.getBoundingClientRect();

    const totalSpace = artRect.top - tagRect.bottom;
    const free = totalSpace - cubeRect.height;
    const usable = Math.max(free, 0);

    let top = usable / 2;
    let bottom = usable / 2;

    top = Math.max(top, 56);
    bottom = Math.max(bottom, 40);

    top = Math.min(top, 220);
    bottom = Math.min(bottom, 160);

    if (usable > 120) top += 8;

    setMargins({ mt: Math.round(top), mb: Math.round(bottom) });

    // Restore (visuell direkt)
    cw.style.marginTop = prevTop;
    cw.style.marginBottom = prevBottom;
  }, []);

  useLayoutEffect(() => {
    recompute();
  }, [recompute, postsData.length, first?.slug]);

  useEffect(() => {
    const onResize = () => recompute();
    window.addEventListener("resize", onResize);
    const id = setTimeout(recompute, 60);
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
    <div className="relative">
      <section className="mb-0 flex flex-col prose prose-zinc dark:prose-invert max-w-prose">
        <header>
          <h1 className="not-prose text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
            {t("site.title") || "freepalestine.sh"}
          </h1>
          <p
            ref={taglineRef}
            className="mt-3 text-[15px] leading-relaxed text-muted-foreground"
          >
            {t("site.tagline")}
          </p>
        </header>
      </section>

      {/* Vollbreite Cube-Zone */}
      <div
        ref={cubeWrapperRef}
        style={{
          marginTop: margins.mt,
          marginBottom: margins.mb,
          transition: "margin 180ms ease",
        }}
        className="w-full flex justify-center"
      >
        <FlagCube />
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-prose">
        {first && (
            <article
              ref={firstArticleRef}
              className="relative z-10 pb-8 md:pb-10 border-b"
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

        {postsData.slice(1).map((post) => (
          <article
            key={post.slug}
            className="py-8 md:py-10 border-b last:border-b-0"
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
    </div>
  );
}
