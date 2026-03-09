"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { BookOpen, Brain, Target, Clock } from "lucide-react"

type StatsData = {
  notes: number
  quizzes: number
}

export function StatsCards() {

  const [statsData, setStatsData] = useState<StatsData>({
    notes: 0,
    quizzes: 0
  })

  const [avgScore, setAvgScore] = useState(0)

  useEffect(() => {

    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStatsData(data))
      .catch((err) => console.error("Failed to fetch stats:", err))

    fetch("/api/dashboard/avg-score")
      .then((res) => res.json())
      .then((data) => setAvgScore(data.avgScore || 0))
      .catch((err) => console.error("Failed to fetch avg score:", err))

  }, [])

  const stats = [
    {
      title: "Notes Uploaded",
      value: statsData.notes.toString(),
      icon: BookOpen,
      description: "Across all subjects",
    },
    {
      title: "Quizzes Completed",
      value: statsData.quizzes.toString(),
      icon: Brain,
      description: "Total generated quizzes",
    },
    {
      title: "Avg. Score",
      value: `${avgScore}%`,
      icon: Target,
      description: "Across all quizzes",
    },
    {
      title: "Study Hours",
      value: "—",
      icon: Clock,
      description: "Feature coming soon",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => (
        <Card key={stat.title}>

          <CardHeader className="flex flex-row items-center justify-between pb-2">

            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>

            <stat.icon className="h-4 w-4 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold text-foreground">
              {stat.value}
            </div>

            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>

          </CardContent>

        </Card>
      ))}

    </div>
  )
}