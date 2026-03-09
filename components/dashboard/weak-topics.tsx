"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useEffect, useState } from "react"

type Topic = {
  topic: string
  subject: string
  strength: number
}

export function WeakTopics() {

  const [topics, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    fetch("/api/dashboard/weak-topics")
      .then((res) => res.json())
      .then((data) => {

        const formatted: Topic[] = data.map((d: any) => ({
          topic: d.subject,
          subject: "Quiz Performance",
          strength: Number(d.strength)
        }))

        setTopics(formatted)

      })
  }, [])

  const sorted = [...topics].sort((a, b) => a.strength - b.strength)
  const weakest = sorted[0]

  function getStrengthColor(strength: number) {
    if (strength >= 75) return "bg-emerald-500"
    if (strength >= 50) return "bg-amber-500"
    return "bg-red-500"
  }

  function getStrengthLabel(strength: number) {
    if (strength >= 75) return "Strong"
    if (strength >= 50) return "Moderate"
    return "Needs Work"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Topic Strengths</CardTitle>
        <CardDescription>
          Based on quiz activity across subjects
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">

        {sorted.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No quiz data yet
          </p>
        )}
        
        {weakest && (
          <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm">
            <span className="font-semibold text-red-400">
              AI Recommendation:
            </span>{" "}
            Focus on <b>{weakest.topic}</b> today to improve your performance.
          </div>
        )}
        {sorted.map((topic) => (
          <div key={topic.topic} className="flex flex-col gap-1.5">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {topic.topic}
                </span>

                <span className="text-xs text-muted-foreground">
                  {topic.subject}
                </span>
              </div>

              <span
                className={`text-xs font-medium ${
                  topic.strength >= 75
                    ? "text-emerald-500"
                    : topic.strength >= 50
                    ? "text-amber-500"
                    : "text-red-500"
                }`}
              >
                {getStrengthLabel(topic.strength)}
              </span>

            </div>

            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full transition-all ${getStrengthColor(topic.strength)}`}
                style={{ width: `${topic.strength}%` }}
              />
            </div>

          </div>
        ))}

      </CardContent>
    </Card>
  )
}