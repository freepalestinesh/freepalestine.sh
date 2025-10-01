import React, { useEffect, useState, useRef } from "react";
// ... deine restlichen Imports

export default function Index() {
  // ... dein bisheriger Code
  const tagRef = useRef<HTMLParagraphElement | null>(null);
  const cubeRef = useRef<HTMLDivElement | null>(null);
  const firstArticleRef = useRef<HTMLElement | null>(null);
  const [dynamicMargins, setDynamicMargins] = useState<{mt:number; mb:number}>({ mt: 0, mb: 0 });

  useEffect(() => {
    function recompute() {
      if (!tagRef.current || !cubeRef.current || !firstArticleRef.current) return;
      const tagRect = tagRef.current.getBoundingClientRect();
      const artRect = firstArticleRef.current.getBoundingClientRect();
      const cubeRect = cubeRef.current.getBoundingClientRect();

      // Freier Raum, den wir aufteilen wollen:
      // Abstand von Tagline-Bottom bis Article-Top minus Cube-Höhe
      const gap = artRect.top - tagRect.bottom - cubeRect.height;

      // Sicherheitskappen & Mindestwerte
      const cleanGap = Math.max(gap, 40); // nie negativ
      let top = cleanGap / 2;
      let bottom = cleanGap / 2;

      // Mindest / Max Grenzen (visuell)
      top = Math.min(Math.max(top, 64), 220);
      bottom = Math.min(Math.max(bottom, 32), 160);

      setDynamicMargins({ mt: top, mb: bottom });
    }

    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [postsData.length]);

  // Dann im JSX:
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none relative">
      <section className="mb-0 flex flex-col">
        <header>
          <h1 className="not-prose text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
            {t("site.title") || "freepalestine.sh"}
          </h1>
          <p
            ref={tagRef}
            className="mt-3 text-[15px] leading-relaxed text-muted-foreground max-w-prose"
          >
            {t("site.tagline")}
          </p>
        </header>

        <div
          ref={cubeRef}
          style={{
            marginTop: `${dynamicMargins.mt}px`,
            marginBottom: `${dynamicMargins.mb}px`,
            transition: "margin 220ms ease"
          }}
          className="self-center"
        >
          <FlagCube />
        </div>

        {first && (
          <article
            ref={firstArticleRef}
            className="relative z-10 pb-8 md:pb-10 border-b"
          >
            {/* ... Rest unverändert */}
          </article>
        )}
      </section>
      {/* Restliche Posts ... */}
    </div>
  );
}
