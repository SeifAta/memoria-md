# 🩺 MemoriaMD

**MemoriaMD** is an AI-powered adaptive clinical learning platform that transforms traditional lecture notes into personalized, interactive medical education experiences.

Instead of passively reading PDFs, students can practice with realistic clinical cases, receive examiner feedback, reinforce weak concepts, and generate personalized study material—all from their own lecture notes.

---

# 🚀 Features

### 🏥 Interactive Clinical Simulation

Upload lecture notes and automatically generate:

- Teaching Blueprint
- Realistic patient case
- Interactive patient conversation
- AI examiner evaluation
- Personalized reinforcement review

Students practice clinical reasoning in an OSCE-style environment rather than memorizing facts.

---

### 📚 Custom Study Mode

Upload any lecture PDF and instantly generate:

- High-quality clinical MCQs
- Active recall flashcards

Everything is generated directly from the uploaded lecture.

---

### 📊 Personalized Feedback

After every simulated patient encounter, MemoriaMD provides:

- Clinical performance score
- Strengths
- Missed findings
- Areas for improvement
- Targeted reinforcement questions

---

# 🧠 AI Workflow

```
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
Review / Reinforcement Generator
```

---

# 🏗 Project Structure

```
memoria-md/

├── backend/
│   ├── app.py
│   ├── models.py
│   ├── services.py
│   └── session_store.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── prompts/
│
├── utils/
│   ├── providers/
│   ├── llm.py
│   ├── pdf.py
│   ├── prompt_loader.py
│   └── schemas.py
│
├── notebooks/
│
├── sample_data/
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```

---

# ⚙️ Tech Stack

### AI

- Gemma 3 27B Instruct
- Fireworks AI
- Instructor
- Pydantic

### Backend

- FastAPI
- Python

### Frontend

- React
- TypeScript
- Vite

### Infrastructure

- Docker
- Docker Compose

---

# ▶️ Running the Project

## 1. Clone the repository

```bash
git clone https://github.com/SeifAta/memoria-md.git
cd memoria-md
```

---

## 2. Configure environment variables

Create a `.env` file in the project root.

Example:

```env
LLM_PROVIDER=fireworks

FIREWORKS_API_KEY=YOUR_FIREWORKS_API_KEY

FIREWORKS_MODEL=accounts/fireworks/models/gemma3-27b-it

FIREWORKS_BASE_URL=https://api.fireworks.ai/inference/v1
```

---

## 3. Run with Docker

```bash
docker compose up --build
```

The application will start:

Backend:

```
http://localhost:8000
```

Frontend:

```
http://localhost:3000
```

---

# 💡 Usage

## Clinical Simulation

1. Upload a lecture PDF.
2. Generate the Teaching Blueprint.
3. Start an AI-generated patient encounter.
4. Interview the virtual patient.
5. End the encounter.
6. Receive examiner feedback.
7. Review personalized reinforcement questions.

---

## Custom Study

1. Open **Custom Study**.
2. Upload any lecture PDF.
3. Wait for processing.
4. Generate:
   - Clinical MCQs
   - Flashcards

All study material is generated from the uploaded lecture.

---

# 📸 MVP Features

✅ Lecture-aware Teaching Blueprint

✅ Interactive virtual patient

✅ AI examiner

✅ Personalized review session

✅ Lecture-specific MCQs

✅ Lecture-specific flashcards

✅ Dockerized deployment

---

# 🧩 Architecture

The application follows a modular multi-agent design.

- Teaching Blueprint Agent
- Case Generator Agent
- Patient Agent
- Examiner Agent
- Review Generator
- Custom Study Generator

Each component communicates through structured Pydantic schemas, making the pipeline modular and easily extensible.

---

# 🔮 Future Work

- Voice-based patient conversations
- AI Tutor chat grounded in uploaded lectures
- Progress analytics dashboard
- Long-term student memory
- Adaptive spaced repetition
- Multi-language support

---

# 👨‍💻 Authors

**Seif Ata**

Built for the **AMD Developer Challenge**.
