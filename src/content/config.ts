import { defineCollection, z } from 'astro:content';

const recipes = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    cook_id: z.string().optional(),
    tags: z.array(z.string()).default([]),
    servings: z.number().optional(),
    prep_time: z.string().optional(),
    cook_time: z.string().optional(),
    total_time: z.string().optional(),
    difficulty: z.enum(['fácil', 'media', 'difícil']).default('media'),
    image: image().optional(),
    image_alt: z.string().optional(),
    region: z.string().optional(),
    date: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    ingredients: z.array(z.string()).optional(),
  }),
});

const cooks = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    origin: z.string(),
    region: z.string().optional(),
    bio: z.string().optional(),
    picture_profile_link: image().optional(),
    born: z.string().optional(),
  }),
});

export const collections = { recipes, cooks };
