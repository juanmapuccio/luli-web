import os
import sys
import multiprocessing
from pathlib import Path
from PIL import Image

# Configuración de rutas (relativas al script para que funcione desde cualquier lado)
BASE_DIR = Path(__file__).parent.parent
INPUT_DIR = BASE_DIR / "src" / "images" / "nature-img"
OUTPUT_DIR = BASE_DIR / "src" / "images" / "img_optimized"

# Límite de tamaño: Solo optimizaremos si el archivo original pesa más de esto (en MB)
MIN_FILE_SIZE_MB = 5
MIN_FILE_SIZE_BYTES = MIN_FILE_SIZE_MB * 1024 * 1024

# Límite de tamaño final (intentaremos quedar por debajo de este peso en MB)
TARGET_SIZE_MB = 4
TARGET_SIZE_BYTES = TARGET_SIZE_MB * 1024 * 1024

# Extensiones soportadas
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".tiff"}


def get_size_mb(filepath: Path) -> float:
    """Devuelve el tamaño del archivo en Megabytes."""
    return filepath.stat().st_size / (1024 * 1024)


def optimize_image(input_path: Path):
    """Procesa y optimiza una sola imagen."""

    # Comprobar si existe la foto original
    if not input_path.exists():
        return f"ERROR: No se encontró {input_path.name}"

    original_size = get_size_mb(input_path)

    # 1. Filtro: Si pesa menos de 5MB, la ignoramos o simplemente la copiamos
    if original_size < MIN_FILE_SIZE_MB:
        return f"IGNORADA: '{input_path.name}' pesa {original_size:.2f}MB (Menor a {MIN_FILE_SIZE_MB}MB)."

    print(
        f"-> Procesando: '{input_path.name}' ({original_size:.2f}MB) en proceso PID {os.getpid()}..."
    )

    # El nuevo nombre del archivo será siempre .webp por ser el mejor formato web
    # Pero mantenemos el nombre original
    output_filename = input_path.stem + ".webp"
    output_path = OUTPUT_DIR / output_filename

    try:
        # Abrir imagen con Pillow
        with Image.open(input_path) as img:
            # Eliminar perfiles ICC innecesarios o metadata pesada si la hay
            # (Pillow por defecto pierde EXIF al guardar a menos que se fuerce, lo cual ayuda al peso)

            # Convertir a RGB si es necesario (ej: PNGs con canal Alpha a JPEG/WebP a veces dan problema)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")

            # Empezamos con una compresión y calidad muy altas.
            # WebP comprime excelentemente bien
            quality = 90

            # Bucle de compresión:
            # Si el webp resultante sigue pesando más de 4MB (muy difícil, pero por si acaso con fotos de 100MP)
            # le bajaremos la resolución progresivamente.

            # Guardado Inicial
            img.save(output_path, "WEBP", quality=quality, optimize=True)

            # Si a calidad 90 sigue superando los 4MB (TARGET_SIZE), reducimos sus dimensiones
            while get_size_mb(output_path) > TARGET_SIZE_MB and quality > 30:
                print(
                    f"   [Reajustando] {output_filename} pesa {get_size_mb(output_path):.2f}MB, reduciendo tamaño..."
                )

                # Encogemos un 20% la resolución de la imagen (manteniendo el aspecto)
                new_width = int(img.width * 0.8)
                new_height = int(img.height * 0.8)

                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

                # Guardamos de nuevo sobrescribiendo para comprobar el archivo en el disco duro
                img.save(output_path, "WEBP", quality=quality, optimize=True)

                # También bajamos la calidad del guardado webp en cada pasada (hasta tope 30)
                quality -= 10

        final_size = get_size_mb(output_path)
        return f"ÉXITO: '{input_path.name}' -> '{output_filename}' ({original_size:.2f}MB -> {final_size:.2f}MB)."

    except Exception as e:
        return f"ERROR crítico en '{input_path.name}': {e}"


def main():
    print("=" * 60)
    print("     OPTIMIZADOR MULTI-NÚCLEO DE IMÁGENES (WEBP)")
    print("=" * 60)

    # Crear carpetas si no existen
    if not INPUT_DIR.exists():
        print(f"Creando carpeta de origen: {INPUT_DIR}")
        INPUT_DIR.mkdir(parents=True, exist_ok=True)

    if not OUTPUT_DIR.exists():
        print(f"Creando carpeta de destino: {OUTPUT_DIR}")
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Leer todas las imágenes de la carpeta de entrada
    images_to_process = []

    for filename in os.listdir(INPUT_DIR):
        file_path = INPUT_DIR / filename
        if file_path.is_file() and file_path.suffix.lower() in SUPPORTED_EXTENSIONS:
            images_to_process.append(file_path)

    if not images_to_process:
        print(f"No se encontraron imágenes en {INPUT_DIR}.")
        print(f"Formatos soportados: {', '.join(SUPPORTED_EXTENSIONS)}")
        sys.exit(0)

    print(f"Se encontraron {len(images_to_process)} imágenes candidatas.")
    print(f"Solo se optimizarán las que superen los {MIN_FILE_SIZE_MB}MB.")
    print("-" * 60)

    # 2. Multiprocessing Pool
    # Usa exactamente la cantidad de núcleos/hilos lógicos del procesador del usuario (Ej: 16 o 24 hilos)
    num_cores = multiprocessing.cpu_count()
    print(
        f"Activando poder Multiproceso: Utilizando {num_cores} núcleos del CPU en paralelo.\n"
    )

    # Crear el Pool y mapear los trabajadores a la función optimize_image
    with multiprocessing.Pool(processes=num_cores) as pool:
        # pool.imap_unordered nos devuelve los resultados apenas acaban (no importa el orden de la cola)
        for result_msg in pool.imap_unordered(optimize_image, images_to_process):
            print(result_msg)

    print("-" * 60)
    print("¡PROCESO FINALIZADO!")


if __name__ == "__main__":
    # Necesario para que multiprocessing funcione correctamente en Windows
    multiprocessing.freeze_support()
    main()
