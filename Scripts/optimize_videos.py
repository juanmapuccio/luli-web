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


def optimize_video(input_path):
    if not isinstance(input_path, Path):
        input_path = Path(input_path)

    filename = input_path.name
    output_file = (
        OUTPUT_DIR / filename
    )  # Keeping same extension or forcing .mp4? NVENC usually outputs mp4/mkv.

    print(f"\n--- Optimizando con GPU (AV1): {filename} ---")

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
        # codecs: 'av1_nvenc' needs ffmpeg 6.0+ usually and RTX 40 series
        # parameters: -cq (constant quality) or -b:v (bitrate). VBR is better for size limit.
        # We use VBR with maxrate equal to target to strict limit.

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
        # codec argument in write_videofile is ignored if we pass -c:v in ffmpeg_params,
        # but moviepy requires a valid codec string or 'libx264' default.
        # We pass 'png' to avoid moviepy setting default libx264 flags if we were to use a different wrapper,
        # but here we just pass 'libx264' (dummy) and override with ffmpeg_params?
        # Actually MoviePy uses the codec arg to decide extensions/flags.
        # Best to just NOT pass codec to write_videofile if overriding fully, or pass 'h264_nvenc' if av1 not in list.
        # But 'av1_nvenc' is not in standard MoviePy codec map.
        # We can pass codec='h264_nvenc' just to be safe it doesn't error on "unknown codec" before ffmpeg.
        # However, we want AV1. Let's try passing 'av1_nvenc' directly.

        clip.write_videofile(
            str(output_file),
            codec="av1_nvenc",  # Tentative, might need to be 'libx264' + params override
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
    # Archivos específicos solicitados
    target_files = ["AboutWaves.mp4", "FooterWaves.mp4", "HeroWaves.mp4"]

    # Procesar solo estos
    found_videos = []
    for tf in target_files:
        path = INPUT_DIR / tf
        if path.exists():
            found_videos.append(path)
        else:
            print(f"No se encontró: {tf}")

    if not found_videos:
        print("No se encontraron videos objetivo.")
    else:
        print(f"Procesando {len(found_videos)} video(s)...")
        for video in found_videos:
            optimize_video(video)
