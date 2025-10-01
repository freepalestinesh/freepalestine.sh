import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FlagCube from "../components/FlagCube";
import { getAllPosts, Post as PostType } from "@/lib/posts";

/* Konstante Abstände – unabhängig von Sprache/RTL */
const CUBE_MARGIN_TOP = 56;      // Abstand nach Tagline
const CUBE_MARGIN_BOTTOM = 48;   // Abstand vor erstem Artikel / Teaser
const TEASER_MAX_CHARS = 360;    // Kürze der Beschreibung

function toPlainText(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function Index() {
  const { lang = "en" } = useParams();
  const [postsData, setPostsData] = useState<PostType[]>([]);

  useEffect(() => {
    getAllPosts(lang).then(setPostsData);
  }, [lang]);

  const first = postsData[0];

  const teaser = (() => {
    if (!first) return "";
    const base = toPlainText(first.html || first.excerpt || "");
    if (base.length <= TEASER_MAX_CHARS) return base;
    return base.slice(0, TEASER_MAX_CHARS).trim() + "…";
  })();

  return (
    <div className="w-full">
      <header className="prose prose-zinc dark:prose-invert max-w-none">
        <h1 className="not-prose text-3xl md:text-4xl font-semibold tracking-tight">
          freepalestine.sh
        </h1>
        <p className="mt-3 text-muted-foreground max-w-prose">
          An independent, international, text-based blog. Minimal, fast, accessible.
        </p>
      </header>

      {/* Würfel – flex center, 100% Breite, unabhängig von Textausrichtung */}
      <div
        className="w-full flex justify-center"
        style={{ marginTop: CUBE_MARGIN_TOP, marginBottom: CUBE_MARGIN_BOTTOM }}
      >
        <FlagCube />
      </div>

      {/* Kurzer Teaser statt vollständigem Artikeltext */}
      {first && (
        <section className="prose prose-zinc dark:prose-invert max-w-none mb-10 border-b pb-8 md:pb-10">
          <article className="max-w-prose">
            <header className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="not-prose text-xl md:text-2xl font-semibold leading-snug">
                <Link
                  to={`/${lang}/post/${first.slug}`}
                  className="underline decoration-transparent hover:decoration-current"
                >
                  {first.title}
                </Link>
              </h2>
              <time className="text-xs md:text-sm text-muted-foreground">
                {first.date}
              </time>
            </header>
            <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-foreground/80">
              {teaser}
            </p>
            <div className="mt-4">
              <Link
                to={`/${lang}/post/${first.slug}`}
                className="text-xs uppercase tracking-wide font-medium underline decoration-dotted hover:decoration-solid"
              >
                Read full article →
              </Link>
            </div>
            {first.tags?.length ? (
              <ul className="mt-4 flex flex-wrap gap-2 text-[11px] md:text-xs">
                {first.tags.map(tg => (
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
        </section>
      )}

      {/* Restliche Posts */}
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <ul className="divide-y">
          {postsData.slice(1).map(post => {
            const short = toPlainText(post.excerpt || post.html || "").slice(0, 220) + (post.excerpt && post.excerpt.length > 220 ? "…" : "");
            return (
              <li key={post.slug} className="py-8 md:py-10">
                <article className="max-w-prose">
                  <header className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="not-prose text-lg md:text-xl font-semibold leading-snug">
                      <Link
                        to={`/${lang}/post/${post.slug}`}
                        className="underline decoration-transparent hover:decoration-current"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <time className="text-xs md:text-sm text-muted-foreground">
                      {post.date}
                    </time>
                  </header>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                    {short}
                  </p>
                  {post.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] md:text-xs">
                      {post.tags.map(t => (
                        <span
                          key={t}
                          className="rounded border px-2 py-0.5 text-muted-foreground"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
