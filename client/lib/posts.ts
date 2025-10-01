// ERWEITERTE VERSION mit Übersetzungs-Mapping
export type Post = {
  slug: string;
  title: string;
  date?: string;
  tags?: string[];
  html: string;
  lang?: string;
  excerpt?: string;
  translations?: Record<string, string>; // z.B. { de: "gaza-belagerung" }
  origin?: string; // inverse Verweis (falls Datei eine Übersetzung ist)
};

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function simpleMarkdownToHtml(md: string) {
  const lines = md.split(/\r?\n/);
  let out = "";
  let inList = false;
  for (let line of lines) {
    if (/^#/.test(line)) {
      const m = line.match(/^(#+)\s*(.*)$/);
      if (m) {
        const level = Math.min(6, m[1].length);
        out += `<h${level}>${escapeHtml(m[2])}</h${level}>`;
        continue;
      }
    }
    if (/^[-*+]\s+/.test(line)) {
      if (!inList) {
        out += "<ul>";
        inList = true;
      }
      out += `<li>${escapeHtml(line.replace(/^[-*+]\s+/, ""))}</li>`;
      continue;
    }
    if (inList) {
      out += "</ul>";
      inList = false;
    }
    if (line.trim() === "") {
      out += "<p></p>";
      continue;
    }
    const linked = line.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_, a, b) => `<a href="${escapeHtml(b)}">${escapeHtml(a)}</a>`
    );
    out += `<p>${linked}</p>`;
  }
  if (inList) out += "</ul>";
  return out;
}

function parseFrontmatter(raw: string) {
  const fmMatch = raw.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
  if (!fmMatch) return { meta: {}, body: raw };
  const metaRaw = fmMatch[1];
  const body = fmMatch[2];
  const meta: any = {};
  for (const line of metaRaw.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (/^\[.*\]$/.test(val)) {
      meta[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^"|"$/g, ""));
    } else if (/^{.*}$/.test(val)) {
      // primitive mini object parser: translations: { de: slug-de, fr: slug-fr }
      const inner = val.slice(1, -1).trim();
      const map: Record<string, string> = {};
      inner.split(",").forEach((p) => {
        const kv = p.split(":");
        if (kv.length >= 2) {
          const k = kv[0].trim();
            const v = kv.slice(1).join(":").trim().replace(/^"|"$/g, "");
          map[k] = v;
        }
      });
      meta[key] = map;
    } else {
      meta[key] = val.replace(/^"|"$/g, "");
    }
  }
  return { meta, body };
}

// Alle Sprach-Posts laden
const modules = import.meta.glob("../content/*/posts/*.md", { as: "raw" }) as Record<
  string,
  () => Promise<string>
>;

interface InternalPostMap {
  [lang: string]: Post[];
}

let cache: { ts: number; data: InternalPostMap; index: TranslationIndex } | null = null;

interface TranslationIndex {
  // Key = lang:slug → Post
  posts: Map<string, Post>;
  // Key = canonical key (root slug in origin lang) → Map<lang, slug>
  groups: Map<string, Map<string, string>>;
}

// Ermittlung eines "Kanonischen Keys":
// - Wenn Post.origin gesetzt: origin + "::origin"
// - Sonst slug + "::self"
function canonicalKey(post: Post): string {
  if (post.origin) return post.origin + "::origin";
  return post.slug + "::self";
}

async function loadAll(): Promise<{ data: InternalPostMap; index: TranslationIndex }> {
  const byLang: InternalPostMap = {};
  const postsIndex = new Map<string, Post>();

  for (const path in modules) {
    const parts = path.split("/");
    const lang = parts[2];
    const slug = parts[4].replace(/\.md$/, "");
    const raw = await modules[path]();
    const { meta, body } = parseFrontmatter(raw as string);
    const post: Post = {
      slug,
      title: meta.title || slug.replace(/-/g, " "),
      date: meta.date,
      tags: meta.tags,
      html: simpleMarkdownToHtml(body),
      lang,
      excerpt: meta.excerpt,
      translations: meta.translations,
      origin: meta.origin
    };
    byLang[lang] = byLang[lang] || [];
    byLang[lang].push(post);
    postsIndex.set(`${lang}:${slug}`, post);
  }

  // Sortierung
  Object.values(byLang).forEach((arr) =>
    arr.sort((a, b) => (b.date || "").localeCompare(a.date || ""))
  );

  // Gruppen bilden
  const groups = new Map<string, Map<string, string>>();
  for (const lang in byLang) {
    for (const p of byLang[lang]) {
      const key = canonicalKey(p);
      if (!groups.has(key)) groups.set(key, new Map());
      groups.get(key)!.set(lang, p.slug);
    }
  }

  // Forward "translations" definieren (wenn im EN Post translations: {...})
  // Falls nicht vorhanden: aus group generieren (gleiche slug)
  for (const [key, group] of groups.entries()) {
    for (const [gLang, slug] of group.entries()) {
      const ref = postsIndex.get(`${gLang}:${slug}`)!;
      if (!ref.translations) {
        // generieren: alle anderen Sprachen mit jeweils deren slug
        const tmp: Record<string, string> = {};
        for (const [otherLang, otherSlug] of group.entries()) {
          if (otherLang === gLang) continue;
          tmp[otherLang] = otherSlug;
        }
        if (Object.keys(tmp).length) ref.translations = tmp;
      }
    }
  }

  return {
    data: byLang,
    index: { posts: postsIndex, groups }
  };
}

async function getData() {
  if (cache && Date.now() - cache.ts < 30_000) return cache;
  const loaded = await loadAll();
  cache = { ts: Date.now(), ...loaded };
  return cache;
}

export async function getAllPosts(lang?: string): Promise<Post[]> {
  const { data } = await getData();
  if (lang && data[lang] && data[lang].length) return data[lang];
  return data["en"] || [];
}

export async function getPostBySlug(slug: string, lang?: string): Promise<Post | null> {
  const { data } = await getData();
  const candidates = [
    ...(lang && data[lang] ? data[lang] : []),
    ...(data["en"] || [])
  ];
  const seen = new Set<string>();
  for (const p of candidates) {
    const key = `${p.lang}:${p.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (p.slug === slug) return p;
  }
  return null;
}

// Prüfen ob Übersetzung existiert
export async function hasPostInLanguage(slug: string, fromLang: string, targetLang: string): Promise<{ exists: boolean; targetSlug?: string; }> {
  const { index } = await getData();
  const source = index.posts.get(`${fromLang}:${slug}`);
  if (!source) return { exists: false };
  // Prüfe direkte translations Map
  if (source.translations && source.translations[targetLang]) {
    const tSlug = source.translations[targetLang];
    const maybe = index.posts.get(`${targetLang}:${tSlug}`);
    if (maybe) return { exists: true, targetSlug: tSlug };
  }
  // Prüfe gleiche slug
  if (index.posts.get(`${targetLang}:${slug}`)) {
    return { exists: true, targetSlug: slug };
  }
  return { exists: false };
}

// Alle Sprachen mit Slug zurückgeben (für LanguageBar Optimierung)
export async function getLanguageAvailability(slug: string, currentLang: string) {
  const { index } = await getData();
  const src = index.posts.get(`${currentLang}:${slug}`);
  if (!src) return {};
  const result: Record<string, string> = {};
  const langs = new Set<string>();
  if (src.translations) {
    for (const k of Object.keys(src.translations)) langs.add(k);
  }
  // group-basiert
  for (const [key, group] of index.groups.entries()) {
    if (group.get(currentLang) === slug) {
      for (const [lg, s] of group.entries()) langs.add(lg);
    }
  }
  for (const lg of langs) {
    if (lg === currentLang) continue;
    // prefer translations mapping
    if (src.translations && src.translations[lg]) {
      result[lg] = src.translations[lg];
    } else if (index.posts.get(`${lg}:${slug}`)) {
      result[lg] = slug;
    }
  }
  return result;
}
