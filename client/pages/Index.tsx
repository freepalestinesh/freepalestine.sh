import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FlagCube from "../components/FlagCube";
import { getAllPosts, Post as PostType } from "@/lib/posts";

const CUBE_TOP = 140;
const SPACER_HEIGHT = 420;

export default function Index() {
  const { lang = "en" } = useParams();
  const [postsData, setPostsData] = useState<PostType[]>([]);

  useEffect(() => {
    getAllPosts(lang).then(setPostsData);
  }, [lang]);

  const first = postsData[0];

  return (
    <div className="relative">
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none"
        style={{ top: CUBE_TOP, width: 520, maxWidth: "90vw", zIndex: 5 }}
        aria-hidden="true"
      >
        <FlagCube />
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <section className="mb-0 flex flex-col">
          <header>
            <h1 className="not-prose text-3xl md:text-4xl font-semibold tracking-tight">
              freepalestine.sh
            </h1>
            <p className="mt-3 text-muted-foreground max-w-prose">
              {/* Hier könntest du lang-spezifische Taglines via i18n einsetzen */}
              An independent, international, text-based blog. Minimal, fast, accessible.
            </p>
          </header>

          <div aria-hidden="true" style={{ height: SPACER_HEIGHT }} />

            {first && (
              <article className="relative z-10 pb-8 md:pb-10 border-b max-w-prose">
                <header className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="not-prose text-xl md:text-2xl font-semibold">
                    <Link
                      to={`/${lang}/post/${first.slug}`}
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
                  dangerouslySetInnerHTML={{ __html: first.html || "" }}
                />
              </article>
            )}
        </section>

        <ul className="divide-y">
          {postsData.slice(1).map(post => (
            <li key={post.slug} className="py-8 md:py-10">
              <article>
                <header className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="not-prose text-xl font-semibold">
                    <Link
                      to={`/${lang}/post/${post.slug}`}
                      className="underline decoration-transparent hover:decoration-current"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <time className="text-sm text-muted-foreground">{post.date}</time>
                </header>
                <div
                  className="mt-3 text-sm leading-relaxed text-foreground/80"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
                {post.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {post.tags.map(t => (
                      <span key={t} className="rounded border px-2 py-0.5 text-muted-foreground">
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
