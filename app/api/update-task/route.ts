import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function PATCH(req: Request) {
  try {
    const { taskId, completed } = await req.json()

    await pool.query(
      `
      UPDATE study_tasks
      SET completed = $1
      WHERE id = $2
      `,
      [completed, taskId]
    )

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Error updating task:", error)

    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    )
  }
}