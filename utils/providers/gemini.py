import os
import time

from dotenv import load_dotenv
from google import genai
from google.genai import types


load_dotenv()


client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY")
)


MODEL = os.getenv(
    "GEMINI_MODEL",
    "gemini-3.1-flash-lite"
)


def generate(prompt):

    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
    )

    return response.text



def generate_structured(prompt, schema):

    config = types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=schema,
        temperature=0.2,
    )


    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=config,
    )

    return response.parsed