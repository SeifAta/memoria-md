import os

provider = os.getenv(
    "LLM_PROVIDER",
    "gemini",
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