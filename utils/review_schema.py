from pydantic import BaseModel
from typing import List


class ReviewMCQ(BaseModel):
    question: str

    options: List[str]

    correct_answer: str

    explanation: str

    weakness_targeted: str


class ReviewSession(BaseModel):

    session_title: str

    estimated_time_minutes: int

    why_this_session: str

    focus_topics: List[str]

    mcqs: List[ReviewMCQ]