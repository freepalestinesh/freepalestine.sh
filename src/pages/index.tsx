import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlagCube from "../components/FlagCube";
import { getAllPosts, Post as PostType } from "@/lib/posts";

export default function Index() {
  const [postsData, setPostsData] = useState<PostType[]>([]);
  useEffect(() => {
    getAllPosts().then(setPostsData);
  }, []);

  const first = postsData[0];

  return (
    <>
      {/* HERO (separat von prose, damit Typographie-Stile den Cube nicht beeinflussen) */}
      <section className="w-full px-4 pt-10 md:pt-14 flex flex-col items-center text-center">
        <h1 className="not-prose text-3xl md:text-5xl font-semibold tracking-tight">freepalestine.sh</h1>
        <p className="mt-3 text-muted-foreground max-w-prose">
          An independent, international, text-based blog. Minimal, fast, accessible. Colors: Black, White, Red, Green.
        </p>
        <div className="relative mt-10 md:mt-14 w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] md:w-[380px] md:h-[380px]">
          <FlagCube x="50%" y="50%" anchor="center" offsetX="6px" offsetY="4px" />
        </div>
      </section>

      {/* CONTENT */}
      <div className="prose prose-zinc dark:prose-invert max-w-none px-4 md:px-0 mt-12">
        {first && (
          <article className="relative z-10 pb-8 md:pb-10 border-b max-w-prose mx-auto">
            <header className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="not-prose text-xl md:text-2xl font-semibold">
                <Link
                  to={`/post/${first.slug}`}
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
              dangerouslySetInnerHTML={{ __html: first.html || "" }}
            />
          </article>
        )}

        <ul className="divide-y">
          {postsData.slice(1).map((post) => (
            <li key={post.slug} className="py-8 md:py-10">
              <article className="max-w-prose mx-auto">
                <header className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="not-prose text-lg md:text-xl font-semibold">
                    <Link
                      to={`/post/${post.slug}`}
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
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
                {post.tags && post.tags.length > 0 ? (
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
    </>
  );
}
