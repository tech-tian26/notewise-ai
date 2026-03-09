"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { BookOpen, Brain, Clock, CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import type { ActivityItem } from "@/lib/types"

const iconMap: Record<ActivityItem["type"], typeof BookOpen> = {
  note_upload: BookOpen,
  quiz_complete: Brain,
  study_session: Clock,
  plan_complete: CheckCircle2,
}

function timeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (hours < 1) return "Just now"
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"

  return `${days}d ago`
}

export function RecentActivity() {

  const [activity, setActivity] = useState<ActivityItem[]>([])

  useEffect(() => {
    fetch("/api/dashboard/recent-activity")
      .then((res) => res.json())
      .then((data) => setActivity(data))
      .catch((err) => console.error("Failed to fetch activity:", err))
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Activity</CardTitle>
        <CardDescription>Your latest study actions</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">

        {activity.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No activity yet
          </p>
        )}

        {activity.slice(0, 5).map((item) => {

          const Icon = iconMap[item.type]

          return (
            <div key={item.id} className="flex items-start gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>

              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-foreground">
                  {item.title}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <span className="shrink-0 text-xs text-muted-foreground">
                {timeAgo(item.timestamp)}
              </span>

            </div>
          )
        })}

      </CardContent>
    </Card>
  )
}