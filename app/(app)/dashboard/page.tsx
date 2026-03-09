"use client"

import { useAuth } from "@/lib/auth-context"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { StudyChart } from "@/components/dashboard/study-chart"
import { WeakTopics } from "@/components/dashboard/weak-topics"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Welcome back, <span className="text-primary">{user?.name || "Student"}</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          {"Here's an overview of your study progress"}
        </p>
      </div>

      <StatsCards />

      <div className="grid gap-6 xl:grid-cols-3">
        <StudyChart />
        <WeakTopics />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity />
      </div>
    </div>
  )
}
