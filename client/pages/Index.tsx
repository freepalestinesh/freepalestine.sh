
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
    title: "Willkommen bei freepalestine.sh",
    date: "2025-01-01",
    slug: "willkommen",
    excerpt:
      "Ein unabhängiger, internationaler, textbasierter Blog. Klar. Direkt. Ohne Ablenkung.",
    tags: ["intro"],
  },
  {
    title: "Warum ein textbasierter Blog?",
    date: "2025-01-05",
    slug: "warum-text",
    excerpt:
      "Text ist barrierearm, schnell und zugänglich. Inhalte stehen im Mittelpunkt — nicht das Drumherum.",
    tags: ["gedanken"],
  },
  {
    title: "Solidarität, Stimmen, Geschichten",
    date: "2025-01-08",
    slug: "solidaritaet",
    excerpt:
      "Was zählt sind Stimmen und Erfahrungen. Dieser Ort sammelt sie — unabhängig und persönlich.",
  },
  {
    title: "Richtlinien & Transparenz",
    date: "2025-01-10",
    slug: "richtlinien",
    excerpt:
      "Keine Werbung, keine Tracking-Skripte. Inhalt zuerst. Respektvoller Umgang ist Voraussetzung.",
  },
  {
    title: "Archiv & Mitmachen (bald)",
    date: "2025-01-12",
    slug: "archiv-mitmachen",
    excerpt:
      "Offenes Archiv und Beiträge von Leser:innen sind geplant. Bis dahin: Feedback willkommen.",
  },
];

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("de-DE", {
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
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <section className="mb-10">
        <h1 className="not-prose text-3xl font-semibold tracking-tight">
          freepalestine.sh
        </h1>
        <p className="mt-2 text-muted-foreground">
          Ein unabhängiger, internationaler, textbasierter Blog. Minimal, schnell,
          barrierearm. Farben: Schwarz, Weiß, Rot, Grün.
        </p>
        <div className="mt-8 md:mt-10 flex justify-center">
          {/* Flag cube component inserted here. Add extra bottom spacing so the
              posts list starts further down and the cube stands alone visually. */}
          <div className="mb-24">
            <FlagCube />
          </div>
        </div>
      </section>

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
  );
}
