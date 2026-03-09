import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function POST(req: Request) {
  try {

    const { quizId, score, totalQuestions, answers } = await req.json()

    console.log("Saving attempt:", quizId, score, totalQuestions)

    await pool.query(
      `
      INSERT INTO quiz_attempts
      (quiz_id, score, total_questions, answers)
      VALUES ($1,$2,$3,$4)
      `,
      [
        quizId,
        score,
        totalQuestions,
        JSON.stringify(answers)
      ]
    )

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Submit quiz error:", error)
    return NextResponse.json(
      { error: "Failed to save attempt" },
      { status: 500 }
    )
  }
}