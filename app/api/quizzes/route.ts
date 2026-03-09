import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT * FROM quizzes ORDER BY created_at DESC`
    )

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch quizzes" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { noteId, title, subject, difficulty, questions } = await req.json()

    const result = await pool.query(
      `INSERT INTO quizzes (note_id,title,subject,difficulty,questions)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [noteId, title, subject, difficulty, JSON.stringify(questions)]
    )

    return NextResponse.json(result.rows[0])

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to save quiz" }, { status: 500 })
  }
}