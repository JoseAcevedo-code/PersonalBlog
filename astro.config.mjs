// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Set this to your real domain. Cloudflare Pages will serve the site at
// <project-name>.pages.dev by default; swap in a custom domain when you add one.
// Used for canonical URLs, the sitemap, and the RSS feed.
export default defineConfig({
  site: 'https://personalblog.pages.dev',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      wrap: true,
    },
  },
});
