// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://maytaloz.com',
  build: {
    // Emit `about.html` rather than `about/index.html` so existing extension-less
    // URLs (e.g. /adhd-emotional-therapy) keep resolving exactly as they do today.
    format: 'file',
  },
  integrations: [sitemap()],
});
