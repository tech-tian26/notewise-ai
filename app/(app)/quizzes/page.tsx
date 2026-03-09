"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { QuizPlayer } from "@/components/quizzes/quiz-player"
import { QuizResults } from "@/components/quizzes/quiz-results"
import { GenerateQuizDialog } from "@/components/quizzes/generate-quiz-dialog"
import type { Quiz, QuizAttempt } from "@/lib/types"
import { Brain, Plus, Play } from "lucide-react"
import { toast } from "sonner"

type ViewMode = "list" | "playing" | "results"

const difficultyColors: Record<string, string> = {
  easy: "bg-emerald-500/10 text-emerald-500",
  medium: "bg-amber-500/10 text-amber-500",
  hard: "bg-red-500/10 text-red-500",
}

export default function QuizzesPage() {
  const searchParams = useSearchParams()
  const preselectedNoteId = searchParams.get("noteId") || undefined

  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [generateOpen, setGenerateOpen] = useState(!!preselectedNoteId)
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  const [lastAttempt, setLastAttempt] = useState<QuizAttempt | null>(null)


  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await fetch("/api/quizzes")
        const data = await res.json()

        if (Array.isArray(data)) {
          setQuizzes(data)
        } else {
          setQuizzes([])
        }
      } catch (err) {
        console.error("Failed to load quizzes", err)
        setQuizzes([])
      }
    }

    fetchQuizzes()
  }, [])

  async function handleQuizCreated(quiz: Quiz) {
    const res = await fetch("/api/quizzes")
    const data = await res.json()

    setQuizzes(data)

    toast.success("Quiz generated!", {
      description: `${quiz.questions.length} questions from "${quiz.noteTitle}"`,
    })
  }

  async function startQuiz(quiz: Quiz) {

    setActiveQuiz(quiz)

    const res = await fetch(`/api/quizzes/${quiz.id}`)
    const attempt = await res.json()

    if (attempt) {
      setLastAttempt(attempt)
      setViewMode("results")
    } else {
      setViewMode("playing")
    }

  }
  function handleComplete(attempt: QuizAttempt) {
    setLastAttempt(attempt)
    setViewMode("results")

    toast.success(
      `Quiz completed! Score: ${attempt.score}/${attempt.totalQuestions}`
    )
  }

  function handleRetry() {
    if (activeQuiz) {
      setViewMode("playing")
      setLastAttempt(null)
    }
  }

  useEffect(() => {

  if (!activeQuiz) return
      async function checkAttempt() {

        const res = await fetch(`/api/quizzes/${activeQuiz?.id}`)
        const data = await res.json()

        if (data) {
          setLastAttempt(data)
          setViewMode("results")
        }

      }

      checkAttempt()

    }, [activeQuiz])

  if (viewMode === "playing" && activeQuiz) {
    return (
      <QuizPlayer
        quiz={activeQuiz}
        onComplete={handleComplete}
        onBack={() => setViewMode("list")}
      />
    )
  }

  if (viewMode === "results" && activeQuiz && lastAttempt) {
    return (
      <QuizResults
        quiz={activeQuiz}
        attempt={lastAttempt}
        onRetry={handleRetry}
        onBack={() => setViewMode("list")}
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Quizzes
          </h2>
          <p className="text-sm text-muted-foreground">
            Test your knowledge with AI-generated quizzes
          </p>
        </div>

        <Button onClick={() => setGenerateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Generate Quiz
        </Button>
      </div>

      {quizzes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="group cursor-pointer transition-colors hover:border-primary/30 hover:bg-accent/50"
              onClick={() => startQuiz(quiz)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>

                  <Badge
                    variant="secondary"
                    className={difficultyColors[quiz.difficulty]}
                  >
                    {quiz.difficulty}
                  </Badge>
                </div>

                <CardTitle className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {quiz.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {quiz.questions.length} questions
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {quiz.subject}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="h-3 w-3" />
                  Start Quiz
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-16">
          <p className="text-sm text-muted-foreground">No quizzes yet</p>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setGenerateOpen(true)}
          >
            Generate your first quiz
          </Button>
        </div>
      )}

      <GenerateQuizDialog
        open={generateOpen}
        onOpenChange={setGenerateOpen}
        onQuizCreated={handleQuizCreated}
        preselectedNoteId={preselectedNoteId}
      />
    </div>
  )
}