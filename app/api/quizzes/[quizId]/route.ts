import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET(
  req: Request,
  context: { params: Promise<{ quizId: string }> }
) {
  try {

    const { quizId } = await context.params

    const result = await pool.query(
      `
      SELECT *
      FROM quiz_attempts
      WHERE quiz_id = $1
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [quizId]
    )

    return NextResponse.json(result.rows[0] || null)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}