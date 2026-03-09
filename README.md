# NoteWise AI – Intelligent Study Assistant

NoteWise AI is an AI-powered study assistant designed to help students transform raw study materials into structured knowledge. The platform enables users to upload handwritten or digital notes, automatically convert them into structured content, generate quizzes, interact through voice-based Q&A, and receive personalized study insights.

The goal of this project is to build a smarter learning environment that reduces passive studying and encourages active learning using AI.

---

## Key Features

### Smart Note Processing
Users can upload handwritten or typed notes. The system extracts text and organizes it into structured study material for easier understanding and revision.

### AI-Powered Quiz Generation
The platform automatically generates quizzes based on uploaded notes. This allows students to test their understanding instantly without manually creating questions.

### Voice-Based Q&A
Users can interact with their notes through voice. Speech input is converted to text and processed by the AI to generate contextual answers from the uploaded notes.

### AI Study Assistant
Students can ask questions related to their notes and receive contextual explanations powered by AI.

### Performance Tracking Dashboard
The dashboard records quiz attempts and calculates performance metrics, allowing students to identify strong and weak topics.

### Personalized Learning Insights
The system analyzes quiz performance and helps identify areas where students need improvement.

---

## System Architecture

The system integrates several AI services to build an intelligent learning workflow:

- **OCR Processing** – Converts handwritten notes into digital text
- **AI Processing Engine** – Generates summaries, quizzes, and answers
- **Speech Processing** – Enables voice-based interaction
- **Database Layer** – Stores notes, quizzes, and performance metrics
- **Web Interface** – Provides an interactive user experience

---

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Next.js API Routes
- Node.js

### AI Services
- Azure OpenAI Service
- Azure AI Vision (OCR)
- Azure Speech Services

### Database
- PostgreSQL

### Deployment
- Vercel

---

## Project Workflow

1. User uploads handwritten or digital notes.
2. OCR extracts the text from the notes.
3. AI processes the extracted text to generate structured notes.
4. The system generates quizzes based on the content.
5. Users can ask questions through text or voice.
6. Quiz results are analyzed and displayed on the dashboard.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/tech-tian26/notewise-ai.git
