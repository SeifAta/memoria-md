import os
import time

from dotenv import load_dotenv
from google import genai
from google.genai import types

from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
print("LLM PROJECT ROOT:", PROJECT_ROOT)
print("ENV EXISTS:", (PROJECT_ROOT / ".env").exists())

load_dotenv(
    PROJECT_ROOT / ".env"
)

client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY")
)

MODELS = [
    model.strip()
    for model in os.getenv("MODEL_LIST", "").split(",")
    if model.strip()
]


def _generate(model, prompt, config=None):
    return client.models.generate_content(
        model=model,
        contents=prompt,
        config=config,
    )


def _try_models(prompt, config=None):
    last_exception = None

    for model in MODELS:

        print(f"\nTrying {model}")

        for attempt in range(2):

            try:

                response = _generate(
                    model=model,
                    prompt=prompt,
                    config=config,
                )

                print(f"✓ Success using {model}")

                return response

            except Exception as e:

                last_exception = e

                print(
                    f"Attempt {attempt+1}/3 failed on {model}"
                )

                if attempt < 2:
                    time.sleep(2 * (attempt + 1))

        print(f"Switching from {model}...\n")

    raise last_exception


def generate(prompt):

    response = _try_models(prompt)

    return response.text


def generate_structured(prompt, schema):

    config = types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=schema,
        temperature=0.2,
    )

    response = _try_models(
        prompt,
        config=config,
    )

    return response.parsed