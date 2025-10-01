import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlagCube from "../components/FlagCube";
import { getAllPosts, Post as PostType } from "@/lib/posts";

/* Statische Offsets */
const CUBE_TOP = 140;        // px vom Anfang des Inhaltsbereichs
const SPACER_HEIGHT = 420;   // Platzhalterhöhe (Cube + Luft)

export default function Index() {
  const [postsData, setPostsData] = useState<PostType[]>([]);
  useEffect(() => {
    getAllPosts().then(setPostsData);
  }, []);

  const first = postsData[0];

  // Falls du nur einen Auszug willst, hier anpassen:
  const firstHTML = first?.html || "";

  return (
    <div className="relative">
      {/* Absolut platzierter, immer identischer Cube */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none"
        style={{
          top: CUBE_TOP,
          width: 520,
          maxWidth: "90vw",
          zIndex: 5
        }}
        aria-hidden="true"
      >
        <FlagCube />
      </div>

      {/* Gesamter Text-Content */}
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

          {/* Platzhalter reserviert Raum damit Artikel unterhalb des Cubes beginnt */}
          <div aria-hidden="true" style={{ height: SPACER_HEIGHT }} />

          {first && (
            <article className="relative z-10 pb-8 md:pb-10 border-b max-w-prose">
              <header className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="not-prose text-xl md:text-2xl font-semibold">
                  <Link
                    to={`/post/${first.slug}`}
                    className="underline decoration-transparent hover:decoration-current"
                  >
                    {first.title}
                  </Link>
                </h2>
                <time className="text-sm text-muted-foreground">
                  {first.date}
                </time>
              </header>
              <div
                className="mt-3 text-sm leading-relaxed text-foreground/80"
                dangerouslySetInnerHTML={{ __html: firstHTML }}
              />
            </article>
          )}
        </section>

        <ul className="divide-y">
          {postsData.slice(1).map((post) => (
            <li key={post.slug} className="py-8 md:py-10">
              <article>
                <header className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="not-prose text-xl font-semibold">
                    <Link
                      to={`/post/${post.slug}`}
                      className="underline decoration-transparent hover:decoration-current"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <time className="text-sm text-muted-foreground">
                    {post.date}
                  </time>
                </header>
                <div
                  className="mt-3 text-sm leading-relaxed text-foreground/80"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
                {post.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
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
    </div>
  );
}
