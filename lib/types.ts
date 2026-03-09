export interface User {
  id: string
  name: string
  email: string
  avatar: string
  createdAt: string
}

export interface Note {
  id: string
  title: string
  subject: string
  content: string
  extractedText: string
  keyConcepts: string[]
  summary: string
  fileType: "pdf" | "image" | "docx" | "txt" | "pptx"
  fileName: string
  createdAt: string
  updatedAt: string
}

export interface Quiz {
  id: string
  noteId: string
  noteTitle: string
  subject: string
  title: string
  questions: QuizQuestion[]
  difficulty: "easy" | "medium" | "hard"
  createdAt: string
}

export interface QuizQuestion {
  id: string
  question: string
  type: "mcq" | "true-false"
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface QuizAttempt {
  id: string
  quizId: string
  answers: number[]
  score: number
  totalQuestions: number
  completedAt: string
}

export interface StudyTask {
  id: string
  title: string
  description: string
  type: "review" | "quiz" | "revise" | "listen"
  subject: string
  duration: number // in minutes
  priority: "high" | "medium" | "low"
  completed: boolean
  scheduledFor: string
}

export interface StudyProgress {
  date: string
  minutesStudied: number
  notesReviewed: number
  quizzesCompleted: number
}

export interface TopicStrength {
  topic: string
  strength: number // 0-100
  subject: string
}

export interface VoiceMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface ActivityItem {
  id: string
  type: "note_upload" | "quiz_complete" | "study_session" | "plan_complete"
  title: string
  description: string
  timestamp: string
}
