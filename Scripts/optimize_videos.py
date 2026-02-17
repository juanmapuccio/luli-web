import os
import sys
from pathlib import Path
from moviepy import VideoFileClip

# Configuración de rutas
BASE_DIR = Path(__file__).parent.parent
INPUT_DIR = BASE_DIR / "public" / "videos"
# Output directory requested by user (keeping typo if intended, or standardizing)
# User asked for "optimizated-videos", so let's use that.
OUTPUT_DIR = INPUT_DIR / "optimizated-videos"

# Crear carpeta de salida si no existe
if not OUTPUT_DIR.exists():
    OUTPUT_DIR.mkdir(parents=True)

# Límite de tamaño: 5 MB en bits
TARGET_SIZE_MB = 5
TARGET_SIZE_BITS = TARGET_SIZE_MB * 8 * 1024 * 1024


def optimize_video(input_path, output_filename=None):
    if not isinstance(input_path, Path):
        input_path = Path(input_path)

    filename = output_filename if output_filename else input_path.name
    output_file = OUTPUT_DIR / filename

    print(f"\n--- Optimizando con GPU (AV1): {input_path.name} -> {filename} ---")

    try:
        # Cargar clip
        clip = VideoFileClip(str(input_path))
        duration = clip.duration

        # Calcular bitrate objetivo para 5MB
        # bitrate (bps) = size (bits) / duration (s)
        # Dejamos un margen del 10% para audio/overhead (aunque quitaremos audio)
        target_bitrate_bps = (TARGET_SIZE_BITS * 0.9) / duration
        target_bitrate_kbps = int(target_bitrate_bps / 1000)

        print(f"Duración: {duration:.2f}s")
        print(f"Bitrate objetivo: {target_bitrate_kbps}k para < 5MB")

        # Configuración de redimensionado (opcional, pero ayuda a calidad/peso)
        # Si es > 1080p, bajar a 1080p
        if clip.w > 1920:
            print(f"Redimensionando de {clip.w}px a 1920px...")
            clip = clip.resized(width=1920)

        # Quitar audio (ahorra espacio y background videos no lo necesitan)
        clip = clip.without_audio()

        # Escribir archivo usando NVENC AV1
        ffmpeg_params = [
            "-c:v",
            "av1_nvenc",  # Codec GPU AV1
            "-b:v",
            f"{target_bitrate_kbps}k",  # Target Average Bitrate
            "-maxrate",
            f"{target_bitrate_kbps}k",  # Max Bitrate cap
            "-bufsize",
            f"{target_bitrate_kbps*2}k",  # Buffer size
            "-preset",
            "p7",  # Slowest/Best quality preset for NVENC
            "-rc",
            "vbr",  # Variable Bitrate
            "-pix_fmt",
            "yuv420p",  # Compatibility
        ]

        print("Iniciando codificación con NVENC...")

        clip.write_videofile(
            str(output_file),
            codec="av1_nvenc",
            audio=False,
            ffmpeg_params=ffmpeg_params,
        )

        clip.close()

        # Verificar resultado
        final_size = output_file.stat().st_size / (1024 * 1024)
        print(f"Tamaño Final: {final_size:.2f} MB")
        if final_size > TARGET_SIZE_MB:
            print(f"ADVERTENCIA: El archivo excede {TARGET_SIZE_MB}MB")
        else:
            print(f"ÉXITO: Archivo optimizado bajo {TARGET_SIZE_MB}MB")

    except Exception as e:
        print(f"Error procesando {filename}: {e}")
        print("Asegúrate de tener una GPU NVIDIA RTX 40-series y drivers actualizados.")


if __name__ == "__main__":
    # Archivos específicos y sus nombres de salida deseados
    # { "input_filename": "output_filename" }
    # Si output_filename es None, se usa el mismo nombre
    target_files = {
        "Creación_de_Video_Animado_de_Arena.mp4": "AboutSand.mp4",
        # "AboutWaves.mp4": None,
        # "FooterWaves.mp4": None,
        # "HeroWaves.mp4": None
    }

    print(f"Procesando {len(target_files)} video(s)...")

    for input_name, output_name in target_files.items():
        path = INPUT_DIR / input_name
        if path.exists():
            optimize_video(path, output_name)
        else:
            print(f"No se encontró: {path}")
