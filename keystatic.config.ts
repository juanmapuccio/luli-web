import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'github',
        repo: 'juanmapuccio/luli-web'
    },
    ui: {
        brand: { name: 'Luli Web Portfolio' },
    },
    collections: {
        gallery: collection({
            label: 'Galería',
            slugField: 'title',
            path: 'src/content/gallery/*',
            format: { data: 'json' },
            schema: {
                title: fields.slug({ name: { label: 'Título' } }),
                order: fields.integer({ label: 'Orden', description: 'Orden de aparición (menor = primero)', defaultValue: 0 }),
                image: fields.image({
                    label: 'Imagen',
                    directory: 'src/assets/gallery',
                    publicPath: '@/assets/gallery',
                }),
            },
        }),
        events: collection({
            label: 'Eventos & Workshops',
            slugField: 'title',
            path: 'src/content/events/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título' } }),
                date: fields.date({ label: 'Fecha' }),
                coverImage: fields.image({
                    label: 'Imagen de portada',
                    directory: 'src/assets/events',
                    publicPath: '@/assets/events',
                }),
                externalLink: fields.url({ label: 'Enlace de inscripción (opcional)' }),
                content: fields.markdoc({ label: 'Descripción' }),
            },
        }),
    },
});
