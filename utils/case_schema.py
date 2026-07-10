from pydantic import BaseModel
from typing import List, Dict


# -------------------------
# Metadata
# -------------------------

class CaseMetadata(BaseModel):
    case_id: str
    module: str
    title: str
    difficulty: str
    estimated_time_minutes: int


# -------------------------
# Ground Truth (Hidden)
# -------------------------

class GroundTruth(BaseModel):
    final_diagnosis: str
    diagnosis_explanation: str
    learning_objectives: List[str]


# -------------------------
# Patient Profile
# -------------------------

class PatientProfile(BaseModel):
    name: str
    age: int
    sex: str
    occupation: str


# -------------------------
# History
# -------------------------

class History(BaseModel):
    opening_statement: str

    history_presenting_illness: str

    associated_symptoms: List[str]

    negative_symptoms: List[str]

    past_medical_history: List[str]

    drug_history: List[str]

    allergy_history: List[str]

    family_history: List[str]

    social_history: List[str]


# -------------------------
# Examination
# -------------------------
class VitalSigns(BaseModel):

    temperature: str

    heart_rate: str

    blood_pressure: str

    respiratory_rate: str

    oxygen_saturation: str


class Examination(BaseModel):

    general: List[str]

    vital_signs: VitalSigns

    cardiovascular: List[str]

    respiratory: List[str]

    abdominal: List[str]

    peripheral: List[str]


# -------------------------
# Investigations
# -------------------------

class Investigation(BaseModel):

    name: str

    result: str

    interpretation: str


# -------------------------
# Expected Reasoning
# -------------------------

class ExpectedReasoning(BaseModel):

    key_history_questions: List[str]

    key_examination_points: List[str]

    essential_investigations: List[str]

    differential_diagnoses: List[str]

    expected_final_diagnosis: str

    management_plan: List[str]


# -------------------------
# Teaching
# -------------------------

class Teaching(BaseModel):

    common_mistakes: List[str]

    high_yield_points: List[str]

    lecture_references: List[str]

class PatientBehavior(BaseModel):
    communication_style: str
    emotional_state: str
    cooperativeness: str

class DisclosureRules(BaseModel):
    volunteer_information: List[str]
    requires_direct_question: List[str]
    never_disclose_unprompted: List[str]
# -------------------------
# Main Object
# -------------------------

class PatientCase(BaseModel):

    metadata: CaseMetadata

    ground_truth: GroundTruth

    patient: PatientProfile

    history: History

    examination: Examination

    investigations: List[Investigation]

    reasoning: ExpectedReasoning

    teaching: Teaching

    behavior: PatientBehavior

    disclosure_rules: DisclosureRules