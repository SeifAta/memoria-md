from openai import OpenAI
import instructor
import os
from pathlib import Path
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent

load_dotenv(PROJECT_ROOT / ".env")

client = instructor.from_openai(
    OpenAI(
        api_key=os.getenv("FIREWORKS_API_KEY"),
        base_url=os.getenv(
            "FIREWORKS_BASE_URL",
            "https://api.fireworks.ai/inference/v1",
        ),
    ),
    mode=instructor.Mode.JSON,
)

MODEL = os.getenv("FIREWORKS_MODEL")


def generate(prompt):
    raise NotImplementedError(
        "Fireworks provider will be enabled later."
    )


def generate_structured(prompt, schema):
    raise NotImplementedError(
        "Fireworks provider will be enabled later."
    )