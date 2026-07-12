from pydantic import BaseModel
from typing import Dict, Any


class BlueprintRequest(BaseModel):
    pdf_path: str


class CaseRequest(BaseModel):
    session_id: str
    blueprint: Dict[str, Any]


class PatientChatRequest(BaseModel):
    session_id: str
    question: str

class ExaminerRequest(BaseModel):
    session_id: str