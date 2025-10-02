# Copilot Instructions for freepalestine.sh

## Architecture Overview

This is a **multilingual content site** built on Fusion Starter (React + Express fullstack). The unique architecture centers around:

1. **Language-first routing**: `/[lang]/` patterns with automatic fallbacks
2. **Markdown-based content system** with frontmatter and translation linking
3. **Unified development server** (Vite + Express on port 8080)

## Key Patterns

### Multilingual Routing System
- Routes follow `/:lang/` pattern (e.g., `/en/`, `/ar/`, `/de/`)
- Root `/` redirects to `/en/`
- Language context provided via `I18nProvider` wrapping route layouts
- See `client/App.tsx` for the routing structure with `LangLayout` component

### Content & Translation Management
- Posts live in `client/content/[lang]/posts/*.md`
- Frontmatter supports `translations: { de: "german-slug", ar: "arabic-slug" }` for cross-linking
- Translation detection in `client/lib/posts.ts` handles both explicit mappings and same-slug assumptions
- `LanguageBar` component dynamically shows available translations per post

### I18n System
- Custom hook-based system in `client/i18n/`
- RTL support for Arabic/Farsi via `isRTL()` detection
- Dictionary files in `client/i18n/locales/[lang].json`
- Context automatically sets `html[lang]` and `html[dir]` attributes

### Development Workflow
```bash
pnpm dev         # Single-port dev server (client + API)
pnpm build       # Builds both client and server
pnpm typecheck   # Essential - strict TypeScript throughout
```

### Path Aliases
- `@/*` → `client/`
- `@shared/*` → `shared/` (types shared between client/server)

### Component Architecture
- UI components from `client/components/ui/` (Radix + TailwindCSS)
- Custom components like `FlagCube`, `LanguageBar` in `client/components/`
- Use `cn()` utility for conditional Tailwind classes

### API Integration
- Express routes in `server/routes/` prefixed with `/api/`
- Shared TypeScript interfaces in `shared/api.ts`
- Development: unified Vite server via `expressPlugin()`
- Production: Netlify Functions deployment via `netlify/functions/api.ts`

## Critical Files
- `client/App.tsx` - Main routing and language layout setup
- `client/i18n/index.tsx` - I18n context and language detection
- `client/lib/posts.ts` - Content loading and translation resolution
- `server/index.ts` - Express server configuration
- `vite.config.ts` - Development server integration

## Deployment
- Netlify-optimized with redirects in `netlify.toml`
- API routes become Netlify Functions automatically
- SPA build outputs to `dist/spa/`

## Working with Content
When adding posts:
1. Create `.md` files in appropriate `client/content/[lang]/posts/`
2. Use frontmatter for `title`, `date`, `translations` object
3. Test translation linking via `LanguageBar` component
4. Slugs should match across languages unless explicit `translations` mapping provided