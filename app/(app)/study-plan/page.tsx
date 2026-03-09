"use client"

import { useState, useEffect} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Brain,
  RefreshCw,
  Headphones,
  Clock,
  CheckCircle2,
  CalendarDays,
} from "lucide-react"
import type { StudyTask } from "@/lib/types"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const taskIcons: Record<StudyTask["type"], typeof BookOpen> = {
  review: BookOpen,
  quiz: Brain,
  revise: RefreshCw,
  listen: Headphones,
}

const priorityColors: Record<StudyTask["priority"], string> = {
  high: "bg-red-500/10 text-red-500",
  medium: "bg-amber-500/10 text-amber-500",
  low: "bg-emerald-500/10 text-emerald-500",
}

export default function StudyPlanPage() {
  const [tasks, setTasks] = useState<StudyTask[]>([])
  const [loading, setLoading] = useState(false)

  const today = new Date().toISOString().split("T")[0]
  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  const tomorrow = tomorrowDate.toISOString().split("T")[0]

  const todayTasks = tasks.filter(
    (t) => t.scheduledFor?.split("T")[0] === today
  )

  const tomorrowTasks = tasks.filter(
    (t) => t.scheduledFor?.split("T")[0] === tomorrow
  )
  const completedToday = todayTasks.filter((t) => t.completed).length
  const totalToday = todayTasks.length
  const todayProgress = totalToday > 0 ? (completedToday / totalToday) * 100 : 0

  async function loadTasks() {
    try {
      const res = await fetch("/api/get-study-tasks")

      const data = await res.json()

      if (data.tasks) {
        setTasks(data.tasks)
      }
    } catch (error) {
      console.error("Failed to load tasks")
    }
  }
  useEffect(() => {loadTasks()}, [])

  async function toggleTask(taskId: string) {
    const task = tasks.find((t) => t.id === taskId)

    if (!task) return

    const newCompleted = !task.completed

    try {
      await fetch("/api/update-task", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          completed: newCompleted,
        }),
      })

      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, completed: newCompleted } : t
        )
      )

      if (newCompleted) {
        toast.success("Task completed!", { description: task.title })
      }

    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  async function generateStudyPlan() {
    try {
      setLoading(true)

      const res = await fetch("/api/generate-study-plan", {
        method: "POST",
      })

      const data = await res.json()

      if (data.tasks) {
        setTasks(data.tasks)
        toast.success("Study plan generated!")
      }

    } catch (error) {
      toast.error("Failed to generate plan")
    } finally {
      setLoading(false)
    }
  }

  function renderTaskList(taskList: StudyTask[]) {
    if (taskList.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-12">
          <CalendarDays className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No tasks scheduled</p>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-3">
        {taskList.map((task) => {
          const Icon = taskIcons[task.type]
          return (
            <Card
              key={task.id ?? `${task.title}-${task.duration}`}
              className={cn(
                "transition-all",
                task.completed && "opacity-60"
              )}
            >
              <CardContent className="flex items-center gap-4 py-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="shrink-0"
                  aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
                />
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p
                    className={cn(
                      "text-sm font-medium text-foreground",
                      task.completed && "line-through"
                    )}
                  >
                    {task.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {task.description}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {task.duration}m
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn("text-[10px]", priorityColors[task.priority])}
                  >
                    {task.priority}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Study Plan
        </h2>
        <Button
          onClick={generateStudyPlan}
          disabled={loading}
          className="mt-3 w-fit"
        >
          {loading ? "Generating..." : "Generate AI Study Plan"}
        </Button>
        <p className="text-sm text-muted-foreground">
          Your personalized daily study schedule
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{"Today's Progress"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress value={todayProgress} className="flex-1 h-3" />
            <div className="flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">
                {completedToday}/{totalToday}
              </span>
              <span className="text-muted-foreground">tasks</span>
            </div>
          </div>
          <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
            <span>
              Est. time remaining:{" "}
              {todayTasks
                .filter((t) => !t.completed)
                .reduce((acc, t) => acc + t.duration, 0)}{" "}
              min
            </span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">
            Today
            {completedToday < totalToday && (
              <Badge variant="secondary" className="ml-1.5 h-5 min-w-5 text-[10px]">
                {totalToday - completedToday}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="tomorrow">
            Tomorrow
            <Badge variant="secondary" className="ml-1.5 h-5 min-w-5 text-[10px]">
              {tomorrowTasks.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-4">
          {renderTaskList(todayTasks)}
        </TabsContent>

        <TabsContent value="tomorrow" className="mt-4">
          {renderTaskList(tomorrowTasks)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
