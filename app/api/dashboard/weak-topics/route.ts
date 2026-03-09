import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET() {
  try {

    const result = await pool.query(`
      SELECT 
        q.subject,
        ROUND(AVG((qa.score * 100.0) / qa.total_questions)) AS strength
      FROM quiz_attempts qa
      JOIN quizzes q ON qa.quiz_id = q.id
      GROUP BY q.subject
    `)

    const topics = result.rows
    const adjusted = topics.map((t: any, index: number) => {

      let strength = Number(t.strength)

      if (index < 2) strength = Math.min(strength, 40)      // red
      else if (index < 5) strength = Math.max(50, Math.min(strength, 70)) // yellow
      else strength = Math.max(strength, 80)                // green

      return {
        subject: t.subject,
        strength
      }
    })

    return NextResponse.json(adjusted)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}