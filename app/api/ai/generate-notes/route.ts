import { NextResponse } from "next/server"
import OpenAI from "openai"
import { pool } from "@/lib/db"
import { chunkText } from "@/lib/chunk-text"
import { createEmbedding } from "@/lib/embeddings"

const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
  defaultQuery: {
    "api-version": process.env.AZURE_OPENAI_API_VERSION
  },
  defaultHeaders: {
    "api-key": process.env.AZURE_OPENAI_API_KEY
  }
})

export async function POST(req: Request) {
  try {

    const { text, fileName } = await req.json()

    if (!text) {
      return NextResponse.json(
        { error: "No text provided" },
        { status: 400 }
      )
    }

    const response = await openai.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT!,
      response_format: { type: "json_object" },
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You convert raw study notes into structured study material.

Return ONLY valid JSON in this format:

{
  "title": "string",
  "summary": "string",
  "keyConcepts": ["string","string"],
  "content": "markdown formatted study notes"
}
`
        },
        {
          role: "user",
          content: text
        }
      ]
    })

    const aiContent = response.choices[0].message.content

    if (!aiContent) {
      throw new Error("AI returned empty response")
    }

    const structured = JSON.parse(aiContent)

    const saved = await pool.query(
      `
      INSERT INTO notes 
      (user_id, title, subject, content, summary, key_concepts, extracted_text, file_name)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id
      `,
      [
        "00000000-0000-0000-0000-000000000000",
        structured.title,
        "General",
        structured.content,
        structured.summary,
        structured.keyConcepts,
        text,
        fileName || "uploaded-file"
      ]
    )

    const noteId = saved.rows[0].id

    const chunks = chunkText(structured.content)

    for (const chunk of chunks) {

      const embedding = await createEmbedding(chunk)

      await pool.query(
        `INSERT INTO note_chunks (note_id, content, embedding)
        VALUES ($1,$2,$3)`,
        [
          noteId,
          chunk,
          `[${embedding.join(",")}]`
        ]
      )
    }


    const note = {
      id: noteId,
      title: structured.title,
      subject: "General",
      content: structured.content,
      summary: structured.summary,
      keyConcepts: structured.keyConcepts,
      extractedText: text,
      fileName: fileName || "uploaded-file"
    }

    return NextResponse.json(note)

  } catch (error) {

    console.error("Generate notes error:", error)

    return NextResponse.json(
      { error: "Failed to generate notes" },
      { status: 500 }
    )
  }
}