import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET() {
  try {

    const notes = await pool.query(`
      SELECT id, title, created_at
      FROM notes
      ORDER BY created_at DESC
      LIMIT 3
    `)

    const quizzes = await pool.query(`
      SELECT id, title, subject, created_at
      FROM quizzes
      ORDER BY created_at DESC
      LIMIT 2
    `)

    const noteActivities = notes.rows.map((n) => ({
      id: n.id,
      type: "note_upload",
      title: "Uploaded new notes",
      description: n.title,
      timestamp: n.created_at
    }))

    const quizActivities = quizzes.rows.map((q) => ({
      id: q.id,
      type: "quiz_complete",
      title: "Generated quiz",
      description: q.subject || q.title,
      timestamp: q.created_at
    }))

    const combined = [...noteActivities, ...quizActivities]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return NextResponse.json(combined)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}