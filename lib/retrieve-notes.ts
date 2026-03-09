import { getAllNotes } from "./notes-db"

export async function retrieveRelevantNotes(query: string) {
  const notes = await getAllNotes()

  const matches = notes
    .map((n) => ({
      content: n.content,
      score: n.content.toLowerCase().includes(query.toLowerCase()) ? 1 : 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return matches.map((m) => m.content).join("\n")
}