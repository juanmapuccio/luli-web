import os
import shutil
from PIL import Image
from transformers import CLIPProcessor, CLIPModel
import torch

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_DIR = os.path.join(BASE_DIR, "src", "images")
TARGET_DIR = os.path.join(SOURCE_DIR, "nature-img")

# Create target directory if it doesn't exist
if not os.path.exists(TARGET_DIR):
    os.makedirs(TARGET_DIR)

# Load model and processor
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# Classification candidates
labels = [
    "nature, landscape, trees, ocean, beach, flowers, forest",
    "city, building, indoor, text, screenshot, urban",
]


def is_nature_image(image_path):
    try:
        image = Image.open(image_path)
        inputs = processor(text=labels, images=image, return_tensors="pt", padding=True)
        outputs = model(**inputs)
        probs = outputs.logits_per_image.softmax(dim=1)
        # Check if the "nature" label (index 0) has higher probability
        return probs[0][0].item() > probs[0][1].item()
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return False


# Iterate over images
for filename in os.listdir(SOURCE_DIR):
    if filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
        file_path = os.path.join(SOURCE_DIR, filename)

        # Skip if it's already in a subdirectory (though listdir only does top level)
        if os.path.isdir(file_path):
            continue

        print(f"Analyzing {filename}...")
        if is_nature_image(file_path):
            print(f"-> Classified as Nature. Moving to {TARGET_DIR}")
            shutil.move(file_path, os.path.join(TARGET_DIR, filename))
        else:
            print(f"-> Not Nature.")

print("Done!")
