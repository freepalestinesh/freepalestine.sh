# Content Structure

This repository uses a multilingual content model.

Structure:
client/content/<lang>/posts/*.md

Supported language codes:
- en (canonical / fallback)
- de
- fr
- zh
- ru
- ar
- fa

Loader pattern in code (client/lib/posts.ts):
import.meta.glob('../content/*/posts/*.md', { as: 'raw' })

Therefore every language MUST have a posts subfolder. English is mandatory.

Fallback logic:
- If a language has zero posts, `getAllPosts(lang)` returns English posts.
- When resolving a single post slug, the system first checks the active language, then English.

Adding a new post:
1. Create English original: client/content/en/posts/<slug>.md
2. (Optional) Copy to other languages with the same slug OR create translated slug and reference it via frontmatter:
   - In EN: translations: { de: anderer-slug, fr: autre-slug }
   - In translated file: origin: <english-slug>

Minimum frontmatter:
---
title: "..."
date: "YYYY-MM-DD"
---

Optional frontmatter fields:
- tags: [tag1, tag2]
- excerpt: "Short summary"
- translations: { de: slug-de, fr: slug-fr }
- origin: english-slug

Notes:
- Avoid HTML inside markdown sources; keep them pure markdown.
- The parser is intentionally minimal – no advanced markdown extensions.
- English must remain the most up-to-date reference text.
