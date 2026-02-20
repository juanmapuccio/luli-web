import { z, defineCollection } from 'astro:content';

const galleryCollection = defineCollection({
    type: 'data',
    schema: ({ image }) => z.object({
        title: z.string(),
        order: z.number().default(0),
        image: image(),
    }),
});

const eventsCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.coerce.date(),
        coverImage: image(),
        externalLink: z.string().nullable().optional(),
    }),
});

export const collections = {
    'gallery': galleryCollection,
    'events': eventsCollection,
};
