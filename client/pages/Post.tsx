import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostBySlug, Post as PostType } from "@/lib/posts";

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

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    if (!slug) return;
    getPostBySlug(slug).then(setPost);
  }, [slug]);

  if (!post) return <div>Loading…</div>;

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <p className="not-prose text-sm mb-4">
        <Link to="/" className="underline underline-offset-4">← Zurück</Link>
      </p>

      <h1 className="not-prose text-3xl font-semibold tracking-tight">{post.title}</h1>
      <time className="text-sm text-muted-foreground">{formatDate(post.date || "")}</time>

      <div className="mt-6">
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </article>
  );
}
