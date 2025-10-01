import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug, Post as PostType } from "@/lib/posts";
import { useI18n } from "@/i18n";

export default function Post() {
  const { slug = "", lang = "en" } = useParams();
  const { formatDate, t } = useI18n();
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    getPostBySlug(slug, lang).then((p) => setPost(p || null));
  }, [slug, lang]);

  if (!post) {
    return <div className="text-sm text-muted-foreground">Loading…</div>;
  }

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <header className="mb-6">
        <h1 className="mb-2">{post.title}</h1>
        <time className="block text-sm text-muted-foreground">
          {formatDate(post.date || "")}
        </time>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.html || "" }} />
      <div className="mt-10 text-xs">
        <Link
          to={`/${lang}/`}
          className="underline decoration-dotted hover:decoration-solid"
        >
          {t("nav.backHome") || "Back to home"}
        </Link>
      </div>
    </article>
  );
}
