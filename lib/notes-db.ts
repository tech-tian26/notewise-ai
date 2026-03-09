import { pool } from "@/lib/db"

export async function getAllNotes() {
  const result = await pool.query(
    "SELECT id, title, content FROM notes ORDER BY created_at DESC"
  )

  return result.rows
}