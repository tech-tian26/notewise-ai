import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET() {
  try {

    const result = await pool.query(`
      SELECT 
        TO_CHAR(created_at, 'Dy') AS date,
        SUM(duration) AS minutes
      FROM study_tasks
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY date
    `)

    return NextResponse.json(result.rows)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}