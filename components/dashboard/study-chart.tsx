"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type StudyData = {
  day: string
  minutes: number
}

export function StudyChart() {

  const [weeklyData, setWeeklyData] = useState<StudyData[]>([])

  useEffect(() => {
    fetch("/api/dashboard/study-chart")
      .then((res) => res.json())
      .then((data) => {

        const formatted = data.map((d: any) => ({
          day: d.date,                 // API already gives Mon, Tue etc
          minutes: Number(d.minutes)  // ensure number
        }))

        setWeeklyData(formatted)

      })
  }, [])

  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader>
        <CardTitle className="text-base">Weekly Study Activity</CardTitle>
        <CardDescription>
          Estimated minutes studied per day
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-64">

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} barSize={32}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(260 10% 80% / 0.2)"
              />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "hsl(260 10% 50%)" }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "hsl(260 10% 50%)" }}
                tickFormatter={(v) => `${v}m`}
              />

              <Tooltip
                cursor={{ fill: "hsl(260 10% 50% / 0.08)" }}
                contentStyle={{
                  backgroundColor: "hsl(260 20% 18%)",
                  border: "1px solid hsl(260 10% 28%)",
                  borderRadius: "8px",
                  color: "hsl(260 10% 93%)",
                  fontSize: 12,
                }}
                formatter={(value: number) => [`${value} min`, "Study Time"]}
              />

              <Bar
                dataKey="minutes"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>
      </CardContent>
    </Card>
  )
}