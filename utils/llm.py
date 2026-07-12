import os

provider = os.getenv(
    "LLM_PROVIDER",
    "fireworks",
).lower()

if provider == "fireworks":

    from utils.providers.fireworks import (
        generate,
        generate_structured,
    )

else:

    from utils.providers.gemini import (
        generate,
        generate_structured,
    )
