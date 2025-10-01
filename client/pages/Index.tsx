import React from "react";
import { Link } from "react-router-dom";
import FlagCube from "../components/FlagCube";
import { useEffect, useState } from "react";
import { getAllPosts, Post as PostType } from "@/lib/posts";
import { useI18n } from "@/i18n";

export default function Index() {
  const { t, lang, formatDate } = useI18n();
  const [postsData, setPostsData] = useState<PostType[]>([]);
  
  useEffect(() => {
    getAllPosts(lang).then(setPostsData);
  }, [lang]);

  const first = postsData[0];

  // Extract only the first paragraph from the HTML of the first post.
  const firstParagraphHTML = (() => {
    if (!first) return "";
    const html = first.html || "";
    if (html.includes("</p>")) {
      const p = html.split(/<\/p>/i)[0];
      return p.endsWith("</p>") ? p : p + "</p>";
    }
    return `<p>${html.substring(0, 320)}${html.length > 320 ? "…" : ""}</p>`;
  })();

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none relative">
      <section className="mb-10">
        <h1 className="not-prose text-3xl font-semibold tracking-tight">
          {t("site.title")}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t("site.tagline")}
        </p>
        {/* Hero cube with generous vertical space (reduced on small screens) */}
        <div className="mt-12 md:mt-36 flex justify-center">
          <div
            className="relative z-10 mb-40 md:mb-[20rem] lg:mb-[24rem]"
            aria-hidden="true"
          >
            <FlagCube />
          </div>
        </div>
      </section>

      {/* Intro article (first post) shortened to first paragraph */}
      {first && (
        <article className="relative z-20 pb-8 md:pb-10 border-b">
          <header className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="not-prose text-xl font-semibold">
              <Link
                to={`/${lang}/post/${first.slug}`}
                className="underline decoration-transparent hover:decoration-current"
              >
                {first.title}
              </Link>
            </h2>
            <time className="text-sm text-muted-foreground">
              {formatDate(first.date || "")}
            </time>
          </header>
          <div
            className="mt-3 text-sm leading-relaxed text-foreground/80"
            dangerouslySetInnerHTML={{ __html: firstParagraphHTML }}
          />
          <div className="mt-3">
            <Link
              to={`/${lang}/post/${first.slug}`}
              className="text-xs uppercase tracking-wide font-medium underline decoration-dotted hover:decoration-solid"
            >
              {t("readFull")}
            </Link>
          </div>
          {first.tags && first.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {first.tags.map((t) => (
                <span
                  key={t}
                  className="rounded border px-2 py-0.5 text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </article>
      )}

      {/* Remaining posts (from index 1 onward) */}
      <ul className="divide-y">
        {postsData.slice(1).map((post) => (
          <li key={post.slug} className="py-5">
            <article>
              <header className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="not-prose text-lg font-semibold">
                  <Link
                    to={`/${lang}/post/${post.slug}`}
                    className="underline decoration-transparent hover:decoration-current"
                  >
                    {post.title}
                  </Link>
                </h3>
                <time className="text-sm text-muted-foreground">
                  {formatDate(post.date || "")}
                </time>
              </header>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {(() => {
                  // Extract text from HTML for excerpt
                  const text = post.html.replace(/<[^>]*>/g, '').substring(0, 180).replace(/\s+\S*$/, '');
                  return text + (post.html.length > 180 ? "…" : "");
                })()}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}