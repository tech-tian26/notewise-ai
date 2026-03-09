import { pool } from "@/lib/db"
import { createEmbedding } from "@/lib/embeddings"

export async function searchNotes(query: string) {

  const embedding = await createEmbedding(query)

  const result = await pool.query(
    `
    SELECT content
    FROM note_chunks
    ORDER BY embedding <-> $1
    LIMIT 5
    `,
    [`[${embedding.join(",")}]`]
  )

  return result.rows.map(r => r.content).join("\n")
}