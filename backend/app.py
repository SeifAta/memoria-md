import json

from utils.flashcard_schema import FlashcardDeck

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from utils.review_schema import ReviewSession

from backend.models import (
    BlueprintRequest,
    CaseRequest,
    PatientChatRequest,
    ExaminerRequest,
)


from utils.schemas import (
    TeachingBlueprint,
    ReinforcementRequest
)
from utils.case_schema import PatientCase

from utils.examiner_schema import ExaminerReport

from backend.session_store import store

from utils.pdf import extract_pdf_text
from utils.prompt_loader import load_prompt

from utils.llm import (
    generate,
    generate_structured,
)

from utils.schemas import TeachingBlueprint
from utils.case_schema import PatientCase


app = FastAPI(
    title="MemoriaMD API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "MemoriaMD Backend Running"
    }


# -------------------------------
# Generate Teaching Blueprint
# -------------------------------

@app.post("/generate-blueprint")
def generate_blueprint(request: BlueprintRequest):

    lecture = extract_pdf_text(request.pdf_path)

    prompt = load_prompt(
        "teaching_blueprint.md",
        LECTURE=lecture,
    )

    blueprint = generate_structured(
        prompt,
        TeachingBlueprint,
    )

    session_id = store.create()

    store.save_blueprint(
        session_id,
        blueprint.model_dump(),
    )

    return {
        "session_id": session_id,
        "blueprint": blueprint.model_dump(),
    }


# -------------------------------
# Generate Patient Case
# -------------------------------

@app.post("/generate-case")
def generate_case(request: CaseRequest):

    prompt = load_prompt(
        "case_generator.md",
        BLUEPRINT=json.dumps(
            request.blueprint,
            indent=2,
        ),
    )

    patient_case = generate_structured(
        prompt,
        PatientCase,
    )

    store.save_case(
        request.session_id,
        patient_case.model_dump(),
    )

    return patient_case.model_dump()


# -------------------------------
# Chat with Patient
# -------------------------------

@app.post("/patient-chat")
def patient_chat(request: PatientChatRequest):

    session = store.get(request.session_id)

    patient_case = session["patient_case"]

    # Save the student's question first
    store.add_message(
        request.session_id,
        "student",
        request.question,
    )

    # Now retrieve the updated conversation
    conversation = list(session["conversation"])

    prompt = load_prompt(
        "patient_agent.md",

        PATIENT_CASE=json.dumps(
            patient_case,
            indent=2,
        ),

        CONVERSATION=json.dumps(
            conversation,
            indent=2,
        ),

        QUESTION=request.question,
    )

    response = generate(prompt)

    # Save patient's reply
    store.add_message(
        request.session_id,
        "patient",
        response,
    )

    return {
        "response": response
    }

@app.post("/end-encounter")
def end_encounter(request: ExaminerRequest):
    print("SESSION ID:", request.session_id)
    session = store.get(request.session_id)
    print("PATIENT CASE:")
    print(session["patient_case"])
    print("CONVERSATION:")
    print(session["conversation"])

    session = store.get(request.session_id)

    prompt = load_prompt(
        "examiner_agent.md",

        PATIENT_CASE=json.dumps(
            session["patient_case"],
            indent=2,
        ),

        BLUEPRINT=json.dumps(
            session["blueprint"],
            indent=2,
        ),

        CONVERSATION=json.dumps(
            session["conversation"],
            indent=2,
        ),
    )

    report = generate_structured(
        prompt,
        ExaminerReport,
    )

    store.save_examiner(
        request.session_id,
        report.model_dump(),
    )

    return report.model_dump()

# @app.post("/generate-reinforcement")
# def generate_reinforcement(request: ReinforcementRequest):

#     session = store.get(request.session_id)

#     examiner_report = session["examiner_report"]

#     blueprint = session["blueprint"]

#     prompt = load_prompt(
#         "reinforcement_agent.md",

#         REPORT=json.dumps(
#             examiner_report,
#             indent=2,
#         ),

#         BLUEPRINT=json.dumps(
#             blueprint,
#             indent=2,
#         ),
#     )


#     reinforcement = generate(prompt)


#     store.save_reinforcement(
#         request.session_id,
#         reinforcement,
#     )


#     return {
#         "reinforcement": reinforcement
#     }

@app.post("/generate-review")
def generate_review(request: ExaminerRequest):

    session = store.get(request.session_id)

    prompt = load_prompt(

        "reinforcement_mcq_generator.md",

        BLUEPRINT=json.dumps(
            session["blueprint"],
            indent=2,
        ),

        PATIENT_CASE=json.dumps(
            session["patient_case"],
            indent=2,
        ),

        EXAMINER_REPORT=json.dumps(
            session["examiner_report"],
            indent=2,
        ),
    )

    review = generate_structured(
        prompt,
        ReviewSession,
    )

    store.save_reinforcement(
        request.session_id,
        review.model_dump(),
    )

    return review.model_dump()

@app.post("/generate-custom-mcqs")
def generate_custom_mcqs(request: ExaminerRequest):

    session = store.get(request.session_id)

    prompt = load_prompt(

        "custom_mcq_generator.md",

        BLUEPRINT=json.dumps(
            session["blueprint"],
            indent=2,
        ),
    )

    review = generate_structured(

        prompt,

        ReviewSession,

    )

    return review.model_dump()

@app.post("/generate-custom-flashcards")
def generate_custom_flashcards(request: ExaminerRequest):

    session = store.get(request.session_id)

    prompt = load_prompt(

        "custom_flashcard_generator.md",

        BLUEPRINT=json.dumps(
            session["blueprint"],
            indent=2,
        ),
    )

    deck = generate_structured(
        prompt,
        FlashcardDeck,
    )

    return deck.model_dump()