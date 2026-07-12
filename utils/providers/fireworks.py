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

MODEL = os.getenv(
    "FIREWORKS_MODEL",
    "accounts/fireworks/models/gemma3-27b-it",
)


def generate(prompt: str) -> str:

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.3,
    )

    return response.choices[0].message.content


def generate_structured(prompt, schema):

    response = client.chat.completions.create(
        model=MODEL,
        response_model=schema,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.3,
    )

    return response
