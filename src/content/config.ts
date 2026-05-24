import { defineCollection, z } from "astro:content";

const bio = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    role: z.string(),
    blurb: z.string(),
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),
    contacts: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          // if set, the button copies this value to the clipboard (with a toast)
          // instead of navigating
          copy: z.string().optional(),
          // if set, the button opens the popover/dialog with this id
          // instead of navigating
          popover: z.string().optional(),
          // if set, the link downloads href with this filename (or empty string for default)
          download: z.union([z.boolean(), z.string()]).optional(),
        }),
      )
      .default([]),
    apps: z
      .array(
        z.object({
          name: z.string(),
          icon: z.string(),
          rating: z.number().optional(),
          url: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

const caseStudies = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    company: z.string().optional(),
    year: z.number().int().optional(),
    role: z.string().optional(),
    href: z.string().url().optional(),
    comingSoon: z.boolean().optional(),
    order: z.number().int().default(0),
  }),
});

const books = defineCollection({
  type: "content",
  schema: z.object({
    challengeYear: z.number().int(),
    challengeGoal: z.number().int(),
    read: z.number().int(),
    currentlyReading: z
      .object({ title: z.string(), author: z.string() })
      .optional(),
  }),
});

const music = defineCollection({
  type: "content",
  schema: z.object({
    embedCode: z.string(),
    width: z.string().default("340px"),
  }),
});

const links = defineCollection({
  type: "content",
  schema: z.object({
    items: z.array(
      z.object({
        key: z.string(),
        label: z.string(),
        href: z.string().url(),
      }),
    ),
  }),
});

const colophon = defineCollection({
  type: "content",
  schema: z.object({
    tools: z.array(
      z.object({
        name: z.string(),
        href: z.string().url().optional(),
        note: z.string().optional(),
      }),
    ),
  }),
});

const practice = defineCollection({
  type: "content",
  schema: z.object({
    label: z.string(),
    repoUrl: z.string().url(),
    tree: z.array(
      z.object({
        depth: z.number().int().min(0),
        icon: z.string(),
        name: z.string(),
      }),
    ),
  }),
});

const references = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    role: z.string(),
    quote: z.string(),
    avatar: z.string(),
    order: z.number().int().default(0),
  }),
});

export const collections = { bio, caseStudies, books, music, links, colophon, practice, references };
