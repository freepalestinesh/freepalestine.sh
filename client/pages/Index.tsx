import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import FlagCube from "../components/FlagCube";
import { getAllPosts, Post as PostType } from "@/lib/posts";

/**
 * Zentrierter Cube (Flow-basiert), sprachunabhängig (flex justify-center).
 * Nur erster Absatz (oder Excerpt) des ersten Posts + Tags.
 */

const TEASER_MAX_CHARS = 400;

function extractFirstParagraph(html: string): string {
  if (!html) return "";
  const match = html.match(/<p[\s\S]*?<\/p>/i);
  if (match) return match[0];
  // fallback: plain shorten
  const plain = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const cut = plain.slice(0, TEASER_MAX_CHARS);
  return `<p>${cut}${plain.length > cut.length ? "…" : ""}</p>`;
}

export default function Index() {
  const { lang = "en" } = useParams();
  const [postsData, setPostsData] = useState<PostType[]>([]);
  useEffect(() => {
    getAllPosts(lang).then(setPostsData);
  }, [lang]);

  const first = postsData[0];

  const firstParagraphHTML = useMemo(() => {
    if (!first) return "";
    return extractFirstParagraph(first.html || first.excerpt || "");
  }, [first]);

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <section className="mb-0 flex flex-col">
        <header>
          <h1 className="not-prose text-3xl md:text-4xl font-semibold tracking-tight">
            freepalestine.sh
          </h1>
          <p className="mt-3 text-muted-foreground max-w-prose">
            An independent, international, text-based blog. Minimal, fast, accessible.
            Colors: Black, White, Red, Green.
          </p>
        </header>

        {/* Würfel – zentriert, Abstand oben/unten anpassbar */}
        <div className="w-full flex justify-center mt-12 md:mt-14 mb-12">
          <FlagCube />
        </div>

        {first && (
          <article className="relative z-10 pb-8 md:pb-10 border-b max-w-prose">
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
            <div
              className="mt-3 text-sm md:text-[15px] leading-relaxed text-foreground/80"
              dangerouslySetInnerHTML={{ __html: firstParagraphHTML }}
            />
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

      <ul className="divide-y">
        {postsData.slice(1).map((post) => (
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
              <div
                className="mt-3 text-sm leading-relaxed text-foreground/80"
                dangerouslySetInnerHTML={{
                  __html: extractFirstParagraph(post.html || post.excerpt || ""),
                }}
              />
              {post.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] md:text-xs">
                  {post.tags.map((t) => (
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
        ))}
      </ul>
    </div>
  );
}
