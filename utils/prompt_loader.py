from pathlib import Path

# Get the project root (parent of utils/)
PROJECT_ROOT = Path(__file__).resolve().parent.parent
PROMPTS_DIR = PROJECT_ROOT / "prompts"


def load_prompt(name, **kwargs):
    text = (PROMPTS_DIR / name).read_text(encoding="utf-8")

    for key, value in kwargs.items():
        text = text.replace(f"{{{{{key}}}}}", value)

    return text