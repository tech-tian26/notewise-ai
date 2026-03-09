"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import type { Quiz, QuizAttempt } from "@/lib/types"

interface QuizPlayerProps {
  quiz: Quiz
  onComplete: (attempt: QuizAttempt) => void
  onBack: () => void
}

export function QuizPlayer({ quiz, onComplete, onBack }: QuizPlayerProps) {

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quiz.questions.length).fill(null)
  )

  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const question: any = quiz?.questions?.[currentQ]

  if (!question) {
    return <div className="p-8">Loading question...</div>
  }

  const isLast = currentQ === quiz.questions.length - 1

  const progress =
    ((currentQ + (showFeedback ? 1 : 0)) / quiz.questions.length) * 100

  function handleSelect(optionIndex: number) {
    if (showFeedback) return
    setSelectedOption(optionIndex)
  }

  async function handleConfirm() {
    if (selectedOption === null) return

    if (!showFeedback) {

      const newAnswers = [...answers]
      newAnswers[currentQ] = selectedOption
      setAnswers(newAnswers)
      setShowFeedback(true)

    } else {

      if (isLast) {

        const finalAnswers = [...answers]

        const score = finalAnswers.filter((answerIndex, i) => {

          const q = quiz.questions[i]

          const correctIndex =
            typeof q.correctAnswer === "number"
              ? q.correctAnswer
              : q.options.findIndex(
                  (opt: string) =>
                    opt.toLowerCase().trim() ===
                    String(q.correctAnswer).toLowerCase().trim()
                )

          return answerIndex === correctIndex

        }).length

        const attempt: QuizAttempt = {
          id: `attempt-${Date.now()}`,
          quizId: quiz.id,
          answers: finalAnswers as number[],
          score,
          totalQuestions: quiz.questions.length,
          completedAt: new Date().toISOString(),
        }

        try {

          // Save attempt to database
          await fetch("/api/quizzes/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quizId: quiz.id,
              score,
              totalQuestions: quiz.questions.length,
              answers: finalAnswers
            }),
          })

        } catch (error) {
          console.error("Failed to save attempt to DB:", error)
        }

        // Optional: keep localStorage backup
        const attempts = JSON.parse(
          localStorage.getItem("quiz_attempts") || "[]"
        )

        attempts.push(attempt)

        localStorage.setItem("quiz_attempts", JSON.stringify(attempts))

        onComplete(attempt)

      } else {

        setCurrentQ(currentQ + 1)
        setSelectedOption(null)
        setShowFeedback(false)

      }

    }
  }

  const selectedText =
    selectedOption !== null ? question.options[selectedOption] : null

  const isCorrect =
    selectedText?.toLowerCase().trim() ===
    question.correctAnswer?.toLowerCase().trim()

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            {quiz.title}
          </h3>

          <p className="text-xs text-muted-foreground">
            Question {currentQ + 1} of {quiz.questions.length}
          </p>
        </div>

        <Badge variant="outline">
          {quiz.difficulty}
        </Badge>

      </div>

      <Progress value={progress} className="h-2" />

      <Card>

        <CardHeader>

          <CardTitle className="text-base leading-relaxed">
            {question.question}
          </CardTitle>

          {question.type === "true-false" && (
            <Badge variant="secondary" className="w-fit">
              True / False
            </Badge>
          )}

        </CardHeader>

        <CardContent className="flex flex-col gap-3">

          {question.options.map((option: string, i: number) => {

            let optionClass =
              "border-border hover:border-primary/50 hover:bg-accent/50 cursor-pointer"

            if (showFeedback) {

              if (i === question.correctAnswer) {
                optionClass = "border-emerald-500 bg-emerald-500/10"
              } else if (i === selectedOption && !isCorrect) {
                optionClass = "border-red-500 bg-red-500/10"
              } else {
                optionClass = "border-border opacity-50"
              }

            } else if (selectedOption === i) {

              optionClass = "border-primary bg-primary/10"

            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showFeedback}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all",
                  optionClass
                )}
              >

                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                    selectedOption === i && !showFeedback
                      ? "border-primary bg-primary text-primary-foreground"
                      : showFeedback && i === question.correctAnswer
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : showFeedback && i === selectedOption && !isCorrect
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>

                <span className="text-foreground">
                  {option}
                </span>

                {showFeedback && i === question.correctAnswer && (
                  <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-500" />
                )}

                {showFeedback && i === selectedOption && !isCorrect && (
                  <XCircle className="ml-auto h-4 w-4 text-red-500" />
                )}

              </button>
            )
          })}

          {showFeedback && (

            <div
              className={cn(
                "mt-2 rounded-lg p-3 text-sm",
                isCorrect
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-700 dark:text-red-400"
              )}
            >

              <p className="font-medium">
                {isCorrect ? "Correct!" : "Incorrect"}
              </p>

              <p className="mt-1 opacity-90">
                {question.explanation}
              </p>

            </div>

          )}

        </CardContent>

      </Card>

      <div className="flex justify-between">

        <Button variant="outline" onClick={onBack}>
          Exit Quiz
        </Button>

        <Button onClick={handleConfirm} disabled={selectedOption === null}>

          {showFeedback ? (
            isLast ? (
              "See Results"
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )
          ) : (
            "Confirm Answer"
          )}

        </Button>

      </div>

    </div>
  )
}