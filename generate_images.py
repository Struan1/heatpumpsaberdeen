import os
from google import genai
from google.genai import types

API_KEY = "AIzaSyDr4TOtFTj-vlwNw5pEtEdQSjmqaIdDtJ0"
MODEL = "imagen-4.0-generate-001"
OUTPUT_DIR = "/Users/struanbaird/heatpumpsaberdeen/assets/images"

client = genai.Client(api_key=API_KEY)

images_to_generate = [
    {
        "filename": "blog-install-hero.jpg",
        "aspect": "16:9",
        "prompt": "Professional heat pump engineers installing an air source heat pump unit on the exterior wall of a traditional Scottish granite stone house, Aberdeen, overcast sky, professional photography"
    },
    {
        "filename": "blog-install-content.jpg",
        "aspect": "16:9",
        "prompt": "Two engineers working inside a modern Scottish home installing heat pump pipework and a hot water cylinder in a utility room, professional photography, natural light"
    },
    {
        "filename": "blog-vs-hero.jpg",
        "aspect": "16:9",
        "prompt": "Wide landscape view of a traditional Scottish rural farmhouse in Aberdeenshire with an air source heat pump unit visible beside the building, green fields, overcast Scottish sky, professional photography"
    },
    {
        "filename": "blog-vs-content.jpg",
        "aspect": "3:4",
        "prompt": "Close up comparison of an air source heat pump outdoor unit on the left and ground source heat pump pipes being laid in a garden trench on the right, split scene, professional photography"
    },
]

aspect_ratio_map = {
    "16:9": "16:9",
    "3:4": "3:4",
}

for i, img in enumerate(images_to_generate, 1):
    print(f"[{i}/4] Generating: {img['filename']} ({img['aspect']})...")
    try:
        response = client.models.generate_images(
            model=MODEL,
            prompt=img["prompt"],
            config=types.GenerateImagesConfig(
                aspect_ratio=aspect_ratio_map[img["aspect"]],
                number_of_images=1,
            ),
        )

        if response.generated_images:
            image_data = response.generated_images[0].image.image_bytes
            output_path = os.path.join(OUTPUT_DIR, img["filename"])
            with open(output_path, "wb") as f:
                f.write(image_data)
            print(f"  Saved to: {output_path}")
        else:
            print(f"  ERROR: No image returned for {img['filename']}")

    except Exception as e:
        print(f"  ERROR generating {img['filename']}: {e}")

print("\nDone.")
