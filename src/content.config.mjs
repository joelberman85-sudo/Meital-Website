import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The four "מחשבות על..." essays, migrated out of articles.jsx.
const articles = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/articles',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    kicker: z.string(),
    lead: z.string(),
    image: z.string(),
    imageAlt: z.string().default(''),
    order: z.number(),
    sources: z.array(z.string()).optional(),
    extra: z.object({ label: z.string(), href: z.string() }).optional(),
  }),
});

// The three Scaup-written guides, migrated out of the bare root .html fragments.
const guides = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/guides',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    // The guides carry a longer <title> than their on-page <h1>.
    seoTitle: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = { articles, guides };
