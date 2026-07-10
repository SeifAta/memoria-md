from pydantic import BaseModel
from typing import List


class ReinforcementPlan(BaseModel):

    session_title: str

    estimated_time_minutes: int

    why_this_session: str

    focus_area: str

    review_points: List[str]

    rapid_fire_questions: List[str]

    mini_case_goal: str

    success_criteria: List[str]

    recommended_next_case: str