import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await context.params

    const result = await pool.query(
      `SELECT * FROM notes WHERE id=$1`,
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      )
    }

    const n = result.rows[0]

    const note = {
      id: n.id,
      userId: n.user_id,
      title: n.title,
      subject: n.subject,
      content: n.content,
      summary: n.summary,
      keyConcepts: n.key_concepts || [],
      extractedText: n.extracted_text || "",
      fileName: n.file_name || "",
      createdAt: n.created_at
    }

    return NextResponse.json(note)

  } catch (error) {

    console.error("Fetch note error:", error)

    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    )
  }
}