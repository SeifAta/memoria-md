from pydantic import BaseModel
from typing import List


class TeachingBlueprint(BaseModel):
    topic: str

    learning_objectives: List[str]

    core_concepts: List[str]

    prerequisite_concepts: List[str]

    definitions: List[str]

    clinical_features: List[str]

    risk_factors: List[str]

    history_questions: List[str]

    physical_exam: List[str]

    investigations: List[str]

    diagnosis: List[str]

    management: List[str]

    complications: List[str]

    red_flags: List[str]

    must_not_miss_concepts: List[str]

    common_student_mistakes: List[str]

    clinical_reasoning_points: List[str]

    assessment_opportunities: List[str]

    high_yield_facts: List[str]

    medications: List[str]
    
    imaging: List[str]
    
    prognosis: List[str]
    
    prevention: List[str]
    
    lecture_emphasis: List[str]


class ExaminerRequest(BaseModel):
    session_id: str

class ReinforcementRequest(BaseModel):
    session_id: str