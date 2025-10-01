export type Post = {
  slug: string;
  title: string;
  date?: string;
  tags?: string[];
  html: string;
};

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function simpleMarkdownToHtml(md: string) {
  // Very small converter: headings, paragraphs, lists, links
  const lines = md.split(/\r?\n/);
  let out = '';
  let inList = false;
  for (let line of lines) {
    if (/^#/ .test(line) || line.startsWith('#')) {
      const m = line.match(/^(#+)\s*(.*)$/);
      if (m) {
        const level = Math.min(6, m[1].length);
        out += `<h${level}>${escapeHtml(m[2])}</h${level}>`;
        continue;
      }
    }
    if (/^[-*+]\s+/.test(line)) {
      if (!inList) { out += '<ul>'; inList = true; }
      out += `<li>${escapeHtml(line.replace(/^[-*+]\s+/, ''))}</li>`;
      continue;
    }
    if (inList) { out += '</ul>'; inList = false; }
    if (line.trim() === '') { out += '<p/>'; continue; }
    // links [text](url)
    const linked = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    out += `<p>${linked}</p>`;
  }
  if (inList) out += '</ul>';
  return out;
}

// Parse optional YAML-like frontmatter (very small)
function parseFrontmatter(raw: string) {
  const fmMatch = raw.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
  if (!fmMatch) return { meta: {}, body: raw };
  const metaRaw = fmMatch[1];
  const body = fmMatch[2];
  const meta: any = {};
  for (const line of metaRaw.split(/\r?\n/)) {
    const kv = line.split(':');
    if (!kv[0]) continue;
    const key = kv[0].trim();
    let val = kv.slice(1).join(':').trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      // parse simple array: [a, b, c]
      const arr = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^"|"$/g, ''));
      meta[key] = arr;
    } else {
      meta[key] = val.replace(/^"|"$/g, '');
    }
  }
  return { meta, body };
}

// Vite glob import: read all md files under client/content/<lang>/posts
// We'll load all language variants and filter by language later
const modules = import.meta.glob('../content/*/posts/*.md', { as: 'raw' }) as Record<string, () => Promise<string>>;

export async function getAllPosts(lang: string = 'en'): Promise<Post[]> {
  const posts: Post[] = [];
  
  // Try to load posts for the requested language, fall back to English
  for (const path in modules) {
    const pathLang = path.split('/')[2]; // Extract lang from path like ../content/en/posts/file.md
    
    // Skip if not the requested language and not English (fallback)
    if (pathLang !== lang && pathLang !== 'en') continue;
    
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    
    // Check if we already have this slug (prefer requested lang over fallback)
    const existingIndex = posts.findIndex((p) => p.slug === slug);
    
    // @ts-ignore
    const raw = await modules[path]();
    const { meta, body } = parseFrontmatter(raw as string);
    
    const post = {
      slug,
      title: meta.title || slug.replace(/-/g, ' '),
      date: meta.date,
      tags: meta.tags,
      html: simpleMarkdownToHtml(body),
    };
    
    if (existingIndex >= 0) {
      // If we found the post in the requested language, replace the fallback
      if (pathLang === lang) {
        posts[existingIndex] = post;
      }
      // Otherwise keep the existing one (it's either the same or already in the requested lang)
    } else {
      posts.push(post);
    }
  }
  
  // sort by date desc if available
  posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return posts;
}

export async function getPostBySlug(slug: string, lang: string = 'en'): Promise<Post | null> {
  const posts = await getAllPosts(lang);
  return posts.find((p) => p.slug === slug) || null;
}
