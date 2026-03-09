"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, ArrowLeft } from "lucide-react"
import type { Quiz, QuizAttempt } from "@/lib/types"

interface QuizResultsProps {
  quiz: Quiz
  attempt: QuizAttempt
  onRetry: () => void
  onBack: () => void
}

export function QuizResults({
  quiz,
  attempt,
  onRetry,
  onBack,
}: QuizResultsProps) {

  const total =
    attempt.totalQuestions ??
    (attempt as any).total_questions ??
    0

  const score = attempt.score ?? 0

  const incorrect = total - score

  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">

      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {quiz.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">

          {/* Percentage */}
          <div className="text-4xl font-bold text-primary">
            {percentage}%
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 text-center">

            <div>
              <p className="text-2xl font-bold">
                {score}
              </p>
              <p className="text-xs text-muted-foreground">
                Correct
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold">
                {incorrect}
              </p>
              <p className="text-xs text-muted-foreground">
                Incorrect
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold">
                {total}
              </p>
              <p className="text-xs text-muted-foreground">
                Total
              </p>
            </div>

          </div>

        </CardContent>
      </Card>

      {/* Question Review */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Question Review
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">

          {quiz.questions.map((q: any, i: number) => {

            const selectedIndex = attempt.answers?.[i]

            const selectedText =
              selectedIndex !== null &&
              selectedIndex !== undefined
                ? q.options?.[selectedIndex]
                : null

            const correctIndex =
              typeof q.correctAnswer === "number"
                ? q.correctAnswer
                : q.options?.findIndex(
                    (opt: string) =>
                      opt.toLowerCase().trim() ===
                      String(q.correctAnswer).toLowerCase().trim()
                  )

            const correctText =
              correctIndex !== null &&
              correctIndex !== undefined
                ? q.options?.[correctIndex]
                : q.correctAnswer

            const isCorrect = selectedIndex === correctIndex

            return (
              <div
                key={i}
                className="flex flex-col gap-2 border-b pb-4"
              >

                <p className="font-medium">
                  {i + 1}. {q.question}
                </p>

                <p
                  className={`text-sm ${
                    isCorrect
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Your Answer:{" "}
                  {selectedText ?? "Not Answered"}
                </p>

                {!isCorrect && (
                  <p className="text-sm text-green-500">
                    Correct Answer: {correctText}
                  </p>
                )}

              </div>
            )

          })}

        </CardContent>
      </Card>

      {/* Buttons */}
      <div className="flex justify-between">

        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          All Quizzes
        </Button>

        <Button onClick={onRetry}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Retry Quiz
        </Button>

      </div>

    </div>
  )
}