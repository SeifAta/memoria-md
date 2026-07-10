MemoriaMD

**An AI-powered adaptive clinical tutor that transforms static lecture notes into personalized OSCE training.**


---

## The Problem

Medical students often study lecture notes passively and struggle to translate theoretical knowledge into clinical reasoning and patient encounters.

Traditional learning platforms provide static content rather than adaptive practice tailored to each student's weaknesses.

---

## Our Solution

MemoriaMD converts lecture PDFs into an interactive learning experience.

The system automatically:

- Generates a structured Teaching Blueprint
- Creates realistic OSCE patient cases
- Simulates an interactive patient
- Evaluates the student's clinical performance
- Generates personalized reinforcement sessions targeting weaknesses

Every practice session becomes adaptive.

---

## AI Pipeline

```text
Lecture PDF
      │
      ▼
Teaching Blueprint Agent
      │
      ▼
Case Generator Agent
      │
      ▼
Interactive Patient Agent
      │
      ▼
Examiner Agent
      │
      ▼
Reinforcement Agent
```

---

## Project Structure

```
notebooks/
├── 01_backend_foundation.ipynb
├── 02_teaching_blueprint.ipynb
├── 03_case_generator.ipynb
├── 04_patient_agent.ipynb
├── 05_examiner_agent.ipynb
├── 06_reinforcement_agent.ipynb
└── 07_full_pipeline_test.ipynb

prompts/
utils/
sample_data/
outputs/
```

---

## Features

- Lecture-aware learning
- Realistic OSCE simulations
- Adaptive reinforcement
- Structured JSON outputs
- Modular multi-agent architecture
- LLM-powered evaluation

---

## Technology

- Python
- Google Gemini API
- Pydantic
- Jupyter
- GitHub

Planned:

- FastAPI
- Native.Builder frontend
- AMD AI deployment

---

## Example Workflow

1. Upload lecture PDF
2. Generate Teaching Blueprint
3. Generate patient case
4. Interview virtual patient
5. Receive examiner feedback
6. Receive personalized reinforcement
7. Repeat with improved performance

---

## Repository

The project currently contains the complete AI backend prototype.

FastAPI integration and frontend deployment are the next development stage.

---

## Authors

Seif Ata
