"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import type { Quiz, QuizAttempt } from "@/lib/types"


interface GenerateQuizDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onQuizCreated: (quiz: Quiz) => void
  preselectedNoteId?: string
}

export function GenerateQuizDialog({
  open,
  onOpenChange,
  onQuizCreated,
  preselectedNoteId,
}: GenerateQuizDialogProps) {
  const [notes, setNotes] = useState<any[]>([])
  const [noteId, setNoteId] = useState(preselectedNoteId || "")
  const [numQuestions, setNumQuestions] = useState("5")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  )
  const [generating, setGenerating] = useState(false)
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null)
  const [mode, setMode] = useState<"quiz" | "results">("quiz")
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)

  useEffect(() => {
    if (!selectedQuiz) return
    const quizId = selectedQuiz.id
    async function checkAttempt() {
      const res = await fetch(`/api/quizzes/${quizId}`)
      const data = await res.json()

      if (data) {
        setAttempt(data)
        setMode("results")
      }
    }

    checkAttempt()

  }, [selectedQuiz])

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch("/api/notes")
        const data = await res.json()

        setNotes(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Failed to fetch notes:", err)
        setNotes([])
      }
    }

    fetchNotes()
  }, [])

  async function handleGenerate() {
    if (!noteId) return

    const note = notes.find((n) => n.id === noteId)
    if (!note) return

    setGenerating(true)

    try {
      const res = await fetch("/api/ai/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: note.content || "",
          numQuestions: parseInt(numQuestions)||5,
          difficulty,
        }),
      })

      
      const data = await res.json()

      const formattedQuestions = (data.questions || []).map((q: any) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.answer
      }))

      const quiz: Quiz = {
        id: `quiz-${Date.now()}`,
        noteId: note.id,
        title: `Quiz on ${note.title}`,
        noteTitle: note.title,
        subject: note.title,
        difficulty,
        questions: formattedQuestions,
        createdAt: new Date().toISOString(),
      }

      await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      })

      onQuizCreated(quiz)
      onOpenChange(false)

          } catch (err) {
            console.error("Quiz generation failed:", err)
          } finally {
            setGenerating(false)
          }
        }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Quiz</DialogTitle>
          <DialogDescription>
            Create an AI-generated quiz from your notes
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">

          {/* NOTE SELECT */}
          <div className="flex flex-col gap-2">
            <Label>Source Note</Label>

            <Select value={noteId} onValueChange={setNoteId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a note" />
              </SelectTrigger>

              <SelectContent>
                {notes.map((note) => (
                  <SelectItem key={note.id} value={note.id}>
                    {note.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* NUMBER OF QUESTIONS */}
          <div className="flex flex-col gap-2">
            <Label>Number of Questions</Label>

            <Select value={numQuestions} onValueChange={setNumQuestions}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="3">3 questions</SelectItem>
                <SelectItem value="5">5 questions</SelectItem>
                <SelectItem value="10">10 questions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* DIFFICULTY */}
          <div className="flex flex-col gap-2">
            <Label>Difficulty</Label>

            <Select
              value={difficulty}
              onValueChange={(v) =>
                setDifficulty(v as "easy" | "medium" | "hard")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>

        <DialogFooter>
          <Button
            onClick={handleGenerate}
            disabled={!noteId || generating}
            className="w-full"
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Quiz"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}