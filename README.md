# Personal blog

A static blog built with [Astro](https://astro.build). Markdown and MDX posts
live in the repo, get type-checked against a schema at build time, and compile
to plain HTML with no client-side framework.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
```

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Dev server with hot reload; drafts are visible |
| `npm run build`   | Production build to `dist/`                    |
| `npm run preview` | Serve the built site locally                   |
| `npm run check`   | Type-check `.astro` and `.ts` files            |

## First things to change

1. **`astro.config.mjs`** — set `site` to your real domain. Canonical URLs, the
   sitemap, and the RSS feed all derive from it.
2. **`src/consts.ts`** — your name, tagline, nav items, and social links.
3. **`public/robots.txt`** — update the sitemap URL to match your domain.
4. **`src/pages/about.astro`** — rewrite the placeholder copy.
5. **`src/content/blog/`** — delete the three sample posts once you've seen how
   they render. Keep `how-these-posts-are-written.mdx` around if you want a
   rendering test to check CSS changes against.

## Writing a post

Add a `.md` or `.mdx` file to `src/content/blog/`. The filename becomes the URL,
so `my-post.md` publishes at `/writing/my-post/`.

```markdown
---
title: 'Post title'
description: 'One sentence, used in the index and in link previews.'
pubDate: 2026-08-23
tags: ['optional']
updatedDate: 2026-08-24  # optional
draft: false             # optional
---

Body text starts here.
```

`title`, `description`, and `pubDate` are required — the build fails and names
the offending file if any are missing. Drafts render in `dev` and are excluded
from the production build, the RSS feed, and the sitemap.

Tag pages are generated automatically from whatever tags you use. There's no
list to maintain.

## Design system

All tokens live at the top of `src/styles/global.css`. Change them there rather
than in component styles.

| Token     | Light     | Role                              |
| --------- | --------- | --------------------------------- |
| `--paper` | `#FAF6F4` | Background — warm, leans pink     |
| `--ink`   | `#2A2622` | Body text — warm near-black       |
| `--moss`  | `#5C6B4A` | The single accent                 |
| `--rule`  | `#E6DDD6` | Hairlines and dividers            |

Type is Fraunces for display (using its `SOFT` and `WONK` variable axes), Karla
for body, JetBrains Mono for code and metadata — all loaded from Google Fonts in
`src/components/BaseHead.astro`. To self-host instead, install the matching
`@fontsource-variable` packages and swap the `<link>` for imports.

Dark mode follows the system preference on first visit and remembers a manual
override in `localStorage`. The theme is applied by an inline script in `<head>`
so there's no flash of the wrong theme before paint.

## What's included

- Home, writing index, per-post pages, tag archives, about, 404
- RSS feed at `/rss.xml`, sitemap at `/sitemap-index.xml`
- Open Graph and Twitter card metadata, canonical URLs
- Syntax highlighting with separate light and dark themes
- Reading time, prev/next post navigation
- Skip link, visible keyboard focus, semantic landmarks, `prefers-reduced-motion`
  respected

## Deploying

The build output is fully static, so anything that serves files will work.

**Cloudflare Pages** — connect the repo and set:

- Build command: `npm run build`
- Output directory: `dist`

**Vercel or Netlify** — both detect Astro automatically; accept the defaults.

**GitHub Pages** — add `base: '/repo-name'` to `astro.config.mjs` if the site
isn't served from the domain root, then deploy `dist/` with the official Astro
Actions workflow.

## Adding an image to a post

For images you want optimized, put them in `src/assets/` and import them:

```mdx
import cover from '../../assets/cover.jpg';
import { Image } from 'astro:assets';

<Image src={cover} alt="Describe the image" />
```

For images that should be served as-is, drop them in `public/` and reference
them by path: `![Alt text](/screenshot.png)`.
