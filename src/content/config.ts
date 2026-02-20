import { defineCollection, z } from 'astro:content';

const eventsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        location: z.string().optional(),
        coverImage: z.string().optional(),
        paymentLink: z.string().url().optional(),
        isPublished: z.boolean().default(true),
    }),
});

export const collections = {
    'events': eventsCollection,
};
