import { createEmbedding } from "@/lib/embeddings"
import { pool } from "@/lib/db"

export async function saveNote(title: string, content: string) {
  const embedding = await createEmbedding(content)

  await pool.query(
    `INSERT INTO notes (title, content, embedding)
     VALUES ($1,$2,$3)`,
    [title, content, embedding]
  )
}