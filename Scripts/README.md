# Scripts de Utilidad

Esta carpeta contiene scripts de Python para automatizar tareas de mantenimiento del sitio web.

## Requisitos

- Python 3.x
- Instalar dependencias: `pip install -r requirements.txt` (si existe, o instalar librerías manualmente)

## Scripts Disponibles

### 1. `optimize_videos.py`
Optimiza archivos de video para la web usando FFmpeg y GPU (si está disponible).
- **Uso**: Ejecutar directamente. Modificar el diccionario `target_files` en el script para definir qué videos procesar.
- **Salida**: Guarda videos optimizados en `public/videos/optimized-videos/`.

### 2. `classify_images.py` (Legacy)
Script experimental para clasificar imágenes usando el modelo CLIP de OpenAI.
- **Uso**: Escanea `src/images` y mueve fotos de "naturaleza" a una subcarpeta.
