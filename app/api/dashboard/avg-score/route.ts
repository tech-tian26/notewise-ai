import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET() {
  try {

    const result = await pool.query(`
      SELECT 
        AVG((score::float / total_questions) * 100) as avg_score
      FROM quiz_attempts
    `)

    return NextResponse.json({
      avgScore: Math.round(result.rows[0].avg_score || 0)
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}