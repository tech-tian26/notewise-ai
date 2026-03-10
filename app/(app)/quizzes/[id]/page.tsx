"use client"

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function QuizPage() {
  const params = useParams()
  const noteId = Array.isArray(params.id) ? params.id[0] : params.id

  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadQuiz() {
      try {
        
        const noteRes = await fetch(`/api/notes/${noteId}`)
        const note = await noteRes.json()

        
        const res = await fetch("/api/ai/generate-quiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: note.content,
          }),
        })

        const data = await res.json()

        setQuestions(Array.isArray(data.questions) ? data.questions : [])
      } catch (err) {
        console.error("Quiz generation failed:", err)
        setQuestions([])
      } finally {
        setLoading(false)
      }
    }

    if (noteId) {
      loadQuiz()
    }
  }, [noteId])

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Generating AI quiz...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="p-8">
        <p>No quiz questions generated.</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Quiz</h1>

      {questions.map((q, i) => (
        <div key={i} className="border p-4 rounded-lg">
          <p className="font-semibold mb-3">
            {i + 1}. {q.question}
          </p>

          <div className="space-y-2">
            {q.options?.map((opt: string, j: number) => (
              <div key={j} className="border rounded p-2 hover:bg-accent">
                {opt}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}