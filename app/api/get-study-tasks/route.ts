import { NextResponse } from "next/server"
import { Pool } from "pg"


export const pool = new Pool({
  host: "studybuddy-db-01.postgres.database.azure.com",
  port: 5432,
  database: "postgres",
  user: "studybuddyadmin",
  password: "abcdef#123",
  ssl: {
    rejectUnauthorized: false
  }
})

export async function GET() {
  try {

    const result = await pool.query(`
      SELECT *
      FROM study_tasks
      WHERE scheduled_for >= CURRENT_DATE
      ORDER BY scheduled_for ASC
    `)

    const tasks = result.rows.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      type: t.type,
      duration: t.duration,
      priority: t.priority,
      scheduledFor: t.scheduled_for,
      completed: t.completed,
    }))

    return NextResponse.json({
      tasks,
    })

  } catch (error) {
    console.error("Error fetching tasks:", error)

    return NextResponse.json(
      { error: "Failed to fetch study tasks" },
      { status: 500 }
    )
  }
}