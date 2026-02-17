# Sugerencias de Mejora y Optimización

Este documento detalla áreas de oportunidad para mejorar la calidad del código, el rendimiento y el SEO del proyecto luli-web.

## 1. SEO (Search Engine Optimization)

### A. Metadatos Dinámicos
- **Problema**: `Layout.astro` tiene una descripción hardcodeada ("Lucia Puccio Fotografia Portfolio").
- **Solución**: Pasar `description` y `image` (para Open Graph) como props al componente `Layout`, permitiendo que cada página defina su propio contenido.
- **Acción**: Actualizar `Props` en `Layout.astro` y usar `<meta property="og:..." />`.

### B. Sitemap y Robots
- **Problema**: No se detectó configuración automática de sitemap.
- **Solución**: Instalar `@astrojs/sitemap`.
- **Comando**: `npx astro add sitemap`.
- **Beneficio**: Genera automáticamente `sitemap-index.xml` y `sitemap-0.xml` para indexación en buscadores.

### C. HTML Semántico
- **Observación**: El uso de `section`, `article` y `main` parece correcto, pero se debe revisar que cada página tenga un único `h1`.
- **Acción**: Auditar cada página en `src/pages` para asegurar la jerarquía de encabezados Correcta.

## 2. Rendimiento (Performance)

### A. Fuentes Web
- **Problema**: Se cargan fuentes desde Google Fonts (CDN) en `Layout.astro`, lo que puede bloquear el renderizado.
- **Solución**: Usar `@fontsource` para alojar las fuentes localmente.
- **Beneficio**: Elimina peticiones DNS externas y mejora métricas de Core Web Vitals (LCP/CLS).

### B. Carga de Scripts
- **Observación**: El script de `Lenis` está inline en `Layout.astro`.
- **Mejora**: Mover a un archivo separado (ej. `src/scripts/smoothScroll.ts`) e importarlo, o encapsularlo en un componente Astro/React si requiere estado complejo.

### C. Optimización de Imágenes
- **Estado**: Se usa `OptimizedImage.astro` con formato `avif`. ¡Excelente!
- **Sugerencia**: Asegurar que todas las imágenes "above the fold" (como el Hero) tengan `loading="eager"` y las demás `loading="lazy"`.

## 3. Calidad del Código y Organización

### A. Scripts de Utilidad
- **Observación**: `Scripts/classify_images.py` y `classify_images.py` (en raíz) parecen duplicados o desorganizados.
- **Acción**: Mover todos los scripts de mantenimiento a la carpeta `Scripts/` y documentar su uso en un `README.md` dentro de esa carpeta.

### B. Tipado Estricto
- **Observación**: `env.d.ts` es básico.
- **Mejora**: Agregar definiciones para variables de entorno en `env.d.ts` (Interface `ImportMetaEnv`) para tener autocompletado y validación de `import.meta.env.PUBLIC_SITE_URL`.

### C. Limpieza de Archivos
- **Acción**: Revisar si `classify_images.py` en la raíz es necesario o si se debe eliminar en favor del que está en `Scripts/`.
- **Corrección**: Renombrar carpeta `public/videos/optimizated-videos` a `public/videos/optimized-videos` (corregir error tipográfico).

## 4. Próximos Pasos Recomendados

1.  **Instalar Sitemap**: `npx astro add sitemap`
2.  **Refactorizar Layout**: Hacer dinámicos los metadatos SEO.
3.  **Localizar Fuentes**: Migrar a `@fontsource`.
4.  **Limpieza**: Organizar scripts y corregir typos en carpetas públicas.
