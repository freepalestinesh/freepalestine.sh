import React from "react";
import { Link } from "react-router-dom";
import FlagCube from "../components/FlagCube";
import { useEffect, useState } from "react";
import { getAllPosts, Post as PostType } from "@/lib/posts";

interface PostItem {
  title: string;
  date: string; // ISO
  slug: string;
  excerpt: string;
  tags?: string[];
}

const posts: PostItem[] = [
  {
    title: "Welcome to freepalestine.sh",
    date: "2025-01-01",
    slug: "welcome",
    excerpt:
      "An independent, international, text-based blog. Minimal, fast, accessible.",
    tags: ["goals"],
  },
];

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function Index() {
  const [postsData, setPostsData] = useState<PostType[]>([]);
  useEffect(() => {
    getAllPosts().then(setPostsData);
  }, []);

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none relative">
      <section className="mb-10">
        <h1 className="not-prose text-3xl font-semibold tracking-tight">
          freepalestine.sh
        </h1>
        <p className="mt-2 text-muted-foreground">
          An independent, international, text-based blog. Minimal, fast, accessible.
        </p>
        {/* Hero-Cube Block mit großzügigem vertikalem Raum */}
        <div className="mt-24 md:mt-40 flex justify-center">
          <div
            className="relative z-10 mb-56 md:mb-[22rem] lg:mb-[26rem]"
            aria-hidden="true"
          >
            <FlagCube />
          </div>
        </div>
      </section>

      {/* Postliste bewusst unterhalb der visuellen Cube-Zone gestartet */}
      <div className="relative z-20 pt-6">
        <ul className="divide-y">
          {postsData.map((post) => (
            <li key={post.slug} className="py-5">
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
                    {formatDate(post.date || '')}
                  </time>
                </header>
                <div
                  className="mt-2 text-sm leading-relaxed text-foreground/80"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
                {post.tags && post.tags.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
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