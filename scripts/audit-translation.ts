import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "client", "content");
const LANGS = ["en","de","fr","zh","ru","ar","fa"];

interface PostMeta {
  slug: string;
  file: string;
  translations?: Record<string,string>;
  origin?: string;
}

function readFrontmatter(file: string) {
  const raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\s*([\s\S]*?)\s*---/);
  if (!m) return {};
  const meta: any = {};
  m[1].split(/\r?\n/).forEach(line => {
    const i = line.indexOf(":");
    if (i === -1) return;
    const key = line.slice(0,i).trim();
    let val = line.slice(i+1).trim();
    if (/^{.*}$/.test(val)) {
      const inner = val.slice(1,-1);
      const map: Record<string,string> = {};
      inner.split(",").forEach(p=>{
        const kv = p.split(":");
        if (kv.length>=2) {
          const k = kv[0].trim();
          const v = kv.slice(1).join(":").trim().replace(/^"|"$/g,"");
          map[k]=v;
        }
      });
      meta[key]=map;
    } else {
      meta[key]=val.replace(/^"|"$/g,"");
    }
  });
  return meta;
}

function collect(lang: string): PostMeta[] {
  const dir = path.join(ROOT, lang, "posts");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f=>f.endsWith(".md"))
    .map(f=>{
      const fm = readFrontmatter(path.join(dir,f));
      return {
        slug: f.replace(/\.md$/,""),
        file: path.join(dir,f),
        translations: fm.translations,
        origin: fm.origin
      };
    });
}

function main() {
  const byLang: Record<string, PostMeta[]> = {};
  LANGS.forEach(l => byLang[l] = collect(l));

  const enSlugs = new Set(byLang.en.map(p=>p.slug));

  const report: string[] = [];
  for (const slug of enSlugs) {
    report.push(`EN base: ${slug}`);
    for (const lang of LANGS.filter(l=>l!=="en")) {
      const exact = byLang[lang].find(p => p.slug === slug);
      const alt = byLang[lang].find(p => p.origin === slug);
      const enPost = byLang.en.find(p=>p.slug===slug);
      let viaTranslations = false;
      if (enPost?.translations && enPost.translations[lang]) {
        const mappedSlug = enPost.translations[lang];
        const existsMapped = byLang[lang].some(p=>p.slug===mappedSlug);
        if (existsMapped) viaTranslations = true;
      }
      if (exact || alt || viaTranslations) {
        report.push(`  ✔ ${lang} ok (${exact ? "same-slug" : alt ? "origin-ref" : "mapped"})`);
      } else {
        report.push(`  ✖ ${lang} MISSING`);
      }
    }
  }

  console.log(report.join("\n"));
  const missing = report.filter(l=>l.includes("MISSING")).length;
  process.exitCode = missing > 0 ? 1 : 0;
}

main();
