import json
import shutil
import tempfile

from fastapi import UploadFile

from utils.pdf import extract_pdf_text
from utils.prompt_loader import load_prompt
from utils.llm import generate_structured

from utils.schemas import TeachingBlueprint
from utils.review_schema import ReviewSession
from utils.flashcard_schema import FlashcardDeck


async def generate_blueprint_from_pdf(
    pdf: UploadFile,
) -> TeachingBlueprint:

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf",
    ) as temp_file:

        shutil.copyfileobj(
            pdf.file,
            temp_file,
        )

        temp_path = temp_file.name

    lecture = extract_pdf_text(temp_path)

    prompt = load_prompt(
        "teaching_blueprint.md",
        LECTURE=lecture,
    )

    blueprint = generate_structured(
        prompt,
        TeachingBlueprint,
    )

    return blueprint


def generate_mcqs_from_blueprint(
    blueprint: TeachingBlueprint,
) -> ReviewSession:

    prompt = load_prompt(
        "custom_mcq_generator.md",
        BLUEPRINT=json.dumps(
            blueprint.model_dump(),
            indent=2,
        ),
    )

    return generate_structured(
        prompt,
        ReviewSession,
    )


def generate_flashcards_from_blueprint(
    blueprint: TeachingBlueprint,
) -> FlashcardDeck:

    prompt = load_prompt(
        "custom_flashcard_generator.md",
        BLUEPRINT=json.dumps(
            blueprint.model_dump(),
            indent=2,
        ),
    )

    return generate_structured(
        prompt,
        FlashcardDeck,
    )