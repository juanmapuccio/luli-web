# Contexto del Proyecto: Luli Web

## 1. Información General
- **Nombre**: luli-web
- **Tipo**: Portfolio Personal / Web Estática
- **Ruta Raíz**: `c:\Users\JUAN\Desktop\Proyectos\luli-web`
- **Stack Tecnológico**:
    - **Core**: Astro 5.2.0, React 18
    - **Estilos**: TailwindCSS 3.4.1 (Tema personalizado "Coastal")
    - **Lenguaje**: TypeScript 5.9.3
    - **Animaciones**: Framer Motion, GSAP 3.14.2
    - **Scroll Suave**: Lenis
    - **Estado Global**: Nanostores
    - **Iconos**: Lucide React, React Icons
    - **Despliegue**: Vercel Adapter

## 2. Estructura del Proyecto
```
luli-web/
├── src/
│   ├── components/       # Componentes UI (React y Astro) reciclablles
│   ├── layouts/          # Layout.astro (Estructura base, metadatos, fuentes)
│   ├── pages/            # Rutas de la aplicación (File-based routing)
│   │   ├── [lang]/       # Rutas dinámicas para i18n
│   ├── i18n/             # Configuración y utilidades de traducción
│   ├── store/            # Estado global con Nanostores (audio, modales)
│   ├── styles/           # CSS global y definiciones de Tailwind
│   ├── env.d.ts          # Definiciones de tipos para Astro
├── public/               # Assets estáticos (imágenes, videos, favicon)
├── Scripts/              # Scripts de utilidad (Python para procesamiento de imágenes)
├── .agent/               # Configuración y memoria del Agente AI
├── astro.config.mjs      # Configuración de Astro (Integraciones: React, Tailwind, Vercel)
├── tailwind.config.mjs   # Configuración de diseño (Colores, Fuentes)
├── tsconfig.json         # Configuración estricta de TypeScript
├── package.json          # Dependencias y scripts
└── .env.example          # Plantilla de variables de entorno (Configuración)
```

## 3. Configuración Clave

### A. Internacionalización (i18n)
- **Idiomas soportados**: Español (es, default), Inglés (en), Catalán (ca), Italiano (it).
- **Implementación**: Rutas dinámicas `src/pages/[lang]/` y utilidades en `src/i18n/`.

### B. Diseño (Tailwind)
- **Fuentes**:
    - Serif: "Playfair Display"
    - Sans: "Inter"
    - Cursive: "Allura"
- **Colores (Tema Coastal)**:
    - `coastal-white`, `coastal-sand`, `coastal-blue-pale`, `coastal-blue-deep`, etc.

### C. Estado y Lógica
- **Nanostores**: Usado para manejar el estado del reproductor de audio (`audioStore.ts`) y modales (`modalStore.ts`) de forma ligera y framework-agnostic.
- **Lenis**: Implementado en `Layout.astro` para scroll suave global.

## 4. Calidad del Código y Patrones
- **Componentes**: Mezcla de `.astro` (estáticos) y `.tsx` (interactivos con `client:load`).
- **Validación**: TypeScript en modo estricto.
- **Buenas Prácticas Observadas**:
    - Uso de `OptimizedImage.astro` para manejo de imágenes.
    - Separación de lógica de estado en `store/`.
    - Uso de variables CSS/Tailwind para consistencia de diseño.
    - Estructura de carpetas clara y semántica.

## 5. Scripts y Automatización
- Existe una carpeta `Scripts/` con código Python (`classify_images.py`), indicando procesos de automatización fuera del build de JS (posiblemente para organizar assets).

## 6. Variables de Entorno
- `PUBLIC_SITE_URL`: URL de producción.
- `VERCEL_ANALYTICS_ID`: ID para analíticas (opcional).
