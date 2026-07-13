# 🩺 MemoriaMD

**MemoriaMD** transforms static medical lecture notes into **interactive clinical training**.

Instead of passively reading PDFs or relying on generic AI chatbots, students practice with realistic AI-generated patients, receive structured examiner feedback, and reinforce weak concepts through personalized study material—all grounded in **their own lecture notes**.

Built for the **AMD Developer Challenge**, MemoriaMD combines a modular multi-agent architecture with **Gemma 3 27B Instruct** to bridge the gap between classroom learning and real clinical reasoning.

---

# 🎯 Why MemoriaMD?

Most AI study tools summarize content or answer questions.

MemoriaMD creates **clinical experiences**.

Students don't simply ask an AI about heart failure—they interview a virtual patient presenting with heart failure, perform history taking, receive examiner feedback, and immediately revise the concepts they struggled with using personalized MCQs and flashcards.

Every simulation is generated directly from the uploaded lecture, making practice focused, relevant, and personalized to the student's learning material.

---

# 🚀 Features

## 🏥 Interactive Clinical Simulation

Upload lecture notes and automatically generate:

- Teaching Blueprint
- Realistic patient case
- Interactive patient conversation
- AI examiner evaluation
- Personalized reinforcement review

Students practice clinical reasoning in an OSCE-style environment rather than memorizing facts.

---

## 📚 Custom Study Mode

Upload any lecture PDF and instantly generate:

- High-quality clinical MCQs
- Active recall flashcards

Everything is generated directly from the uploaded lecture.

---

## 📊 Personalized Feedback

After every simulated patient encounter, MemoriaMD provides:

- Clinical performance score
- Strengths
- Missed findings
- Areas for improvement
- Targeted reinforcement questions

---

# 🧠 AI Workflow

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
Review / Reinforcement Generator
         ├── Clinical MCQs
         └── Flashcards
```

---

# 🏗️ Project Structure

```text
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
├── sample_data/
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

# 🚀 Gemma & AMD Integration

MemoriaMD is powered by **Gemma 3 27B Instruct** through **Fireworks AI**, enabling high-quality reasoning across every stage of the learning pipeline.

Gemma powers:

- Teaching Blueprint generation
- Clinical case generation
- Interactive patient simulation
- Examiner evaluation
- Personalized review generation
- Clinical MCQ generation
- Flashcard generation

Structured outputs are enforced using **Instructor + Pydantic**, ensuring every AI component returns validated JSON objects for reliable downstream processing.

The project is designed for deployment on **AMD-powered AI infrastructure**, with future deployment planned on **AMD Developer Cloud**.

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

FIREWORKS_MODEL=accounts/fireworks/models/gemma-3-27b-it

FIREWORKS_BASE_URL=https://api.fireworks.ai/inference/v1
```

---

## 3. Run with Docker

```bash
docker compose up --build
```

The application will start at:

**Backend**

```
http://localhost:8000
```

**Frontend**

```
http://localhost:3000
```

Interactive FastAPI documentation is available at:

```
http://localhost:8000/docs
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

All study material is generated directly from the uploaded lecture.

A sample lecture is included in the **sample_data/** directory to quickly experience the complete workflow.

---

# ✅ MVP Features

- ✅ Lecture-aware Teaching Blueprint
- ✅ Interactive virtual patient
- ✅ AI examiner
- ✅ Personalized review session
- ✅ Lecture-specific MCQs
- ✅ Lecture-specific flashcards
- ✅ Dockerized deployment

---

# 🧩 Architecture

MemoriaMD follows a modular multi-agent architecture, where each AI component performs a dedicated task within the clinical learning workflow.

Agents include:

- Teaching Blueprint Agent
- Case Generator Agent
- Patient Agent
- Examiner Agent
- Review Generator
- Custom Study Generator

Each component communicates through structured **Pydantic schemas**, providing reliable, schema-validated outputs while keeping the pipeline modular and easily extensible.

---

# ⚠️ Educational Disclaimer

MemoriaMD is intended exclusively for **medical education and clinical skills training**.

It is **not** intended to provide medical advice, diagnose patients, or support real-world clinical decision-making.

---

# 🔮 Future Work

- Voice-based patient conversations
- AI Tutor grounded in uploaded lectures
- Progress analytics dashboard
- Long-term student learning memory
- Adaptive spaced repetition
- Multi-language support
- Native deployment on AMD Developer Cloud

---

# 👨‍💻 Author

**Seif Ata**

Built for the **AMD Developer Challenge** to reimagine medical education through interactive, AI-powered clinical learning.
