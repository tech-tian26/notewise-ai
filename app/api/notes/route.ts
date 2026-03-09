import { NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { createEmbedding } from "@/lib/embeddings"
import { chunkText } from "@/lib/chunk-text"

export async function GET() {
  try {

    const result = await pool.query(
      `SELECT * FROM notes ORDER BY created_at DESC`
    )

    const notes = result.rows.map((n) => ({
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
    }))

    return NextResponse.json(notes)

  } catch (error) {

    console.error("Fetch notes error:", error)

    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {

    const {
      userId,
      title,
      subject,
      content,
      summary,
      keyConcepts,
      extractedText,
      fileName,
    } = await req.json()

    console.log("Chunking note:", content)

    const result = await pool.query(
      `INSERT INTO notes
      (user_id, title, subject, content, summary, key_concepts, extracted_text, file_name)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        userId,
        title,
        subject,
        content,
        summary,
        keyConcepts,
        extractedText,
        fileName
      ]
    )

    const n = result.rows[0]
    const noteId = n.id

    const chunks = chunkText(content)

    console.log("Chunks created:", chunks.length)

    for (const chunk of chunks) {

      console.log("Saving chunk:", chunk.slice(0,50))

      const embedding = await createEmbedding(chunk)

      await pool.query(
        `INSERT INTO note_chunks
        (note_id, content, embedding)
        VALUES ($1,$2,$3)`,
        [
          noteId,
          chunk,
          embedding
        ]
      )
    }

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

    console.error("Save note error:", error)

    return NextResponse.json(
      { error: "Failed to save note" },
      { status: 500 }
    )
  }
}