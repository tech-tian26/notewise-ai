import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET() {
  try {

    const notes = await pool.query(`SELECT COUNT(*) FROM notes`)
    const quizzes = await pool.query(`SELECT COUNT(*) FROM quizzes`)

    return NextResponse.json({
      notes: parseInt(notes.rows[0].count),
      quizzes: parseInt(quizzes.rows[0].count)
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}