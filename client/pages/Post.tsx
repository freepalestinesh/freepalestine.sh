import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostBySlug, Post as PostType } from "@/lib/posts";
import { useI18n } from "@/i18n";

export default function Post() {
  const { slug, lang } = useParams<{ slug: string; lang: string }>();
  const { t, formatDate } = useI18n();
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    if (!slug || !lang) return;
    getPostBySlug(slug, lang).then(setPost);
  }, [slug, lang]);

  if (!post) return <div>Loading…</div>;

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <p className="not-prose text-sm mb-4">
        <Link to={`/${lang}/`} className="underline underline-offset-4">{t("back")}</Link>
      </p>

      <h1 className="not-prose text-3xl font-semibold tracking-tight">{post.title}</h1>
      <time className="text-sm text-muted-foreground">{formatDate(post.date || "")}</time>

      <div className="mt-6">
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </article>
  );
}
