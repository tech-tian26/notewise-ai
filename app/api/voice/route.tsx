import { NextResponse } from "next/server"
import { searchNotes } from "@/lib/vector-search"
import { askAI } from "@/lib/azure-openai"

export async function POST(req: Request) {
  try {

    const { question } = await req.json()

    const context = await searchNotes(question)

    const answer = await askAI(question, context)

    return NextResponse.json({
      answer
    })

  } catch (error) {

    console.error("Voice context error:", error)

    return NextResponse.json(
      { error: "Voice AI failed" },
      { status: 500 }
    )
  }
}