from pydantic import BaseModel
from typing import List


class HistoryAssessment(BaseModel):

    score: int

    asked_points: List[str]

    missed_points: List[str]


class ReasoningAssessment(BaseModel):

    score: int

    strengths: List[str]

    weaknesses: List[str]


class CommunicationAssessment(BaseModel):

    score: int

    comments: List[str]


class ExaminerReport(BaseModel):

    overall_score: int

    history_assessment: HistoryAssessment

    reasoning_assessment: ReasoningAssessment

    communication_assessment: CommunicationAssessment

    key_recommendations: List[str]