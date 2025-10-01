import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FlagCube from "../components/FlagCube";
import { getAllPosts, Post as PostType } from "@/lib/posts";
import { useI18n } from "@/i18n";
import "./global-mobile.css";

export { default } from "../../client/pages/Index";
export default function Index() {
  const { lang = "en" } = useParams();
  const { t, formatDate } = useI18n();
  const [postsData, setPostsData] = useState<PostType[]>([]);

  useEffect(() => {
    getAllPosts(lang).then(setPostsData);
  }, [lang]);

  const first = postsData[0];

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
      <section className="mb-10">
        <h1 className="not-prose text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
          {t("site.title") || "freepalestine.sh"}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground max-w-prose">
          {t("site.tagline")}
        </p>

        <div className="mt-10 md:mt-32 flex justify-center px-2">
            <FlagCube />
        </div>
      </section>

      {first && (
        <article className="relative z-10 pb-10 border-b">
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

      <ul className="divide-y">
        {postsData.slice(1).map((post) => (
          <li key={post.slug} className="py-6">
            <article>
              <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <h3 className="not-prose text-lg font-medium">
                  <Link
                    to={`/${lang}/post/${post.slug}`}
                    className="underline decoration-transparent hover:decoration-current"
                  >
                    {post.title}
                  </Link>
                </h3>
                <time className="text-xs text-muted-foreground">
                  {formatDate(post.date || "")}
                </time>
              </header>
              <div
                className="mt-2 text-sm leading-relaxed text-foreground/75"
                dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
              />
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
