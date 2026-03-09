import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
  defaultQuery: {
    "api-version": process.env.AZURE_OPENAI_API_VERSION
  },
  defaultHeaders: {
    "api-key": process.env.AZURE_OPENAI_API_KEY
  }
})

export async function POST(req: Request) {
  try {
    const { text, numQuestions, difficulty } = await req.json()

    const response = await openai.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT!,
      messages: [
        {
          role: "system",
          content: `
You are a quiz generator.

Generate EXACTLY ${numQuestions} multiple choice questions.

Difficulty: ${difficulty}

Return ONLY JSON in this format:

{
 "questions":[
   {
     "question":"string",
     "options":["A","B","C","D"],
     "answer":"correct option text"
   }
 ]
}
`
        },
        {
          role: "user",
          content: text
        }
      ]
    })

    const raw = response.choices[0].message.content || "{}"
    const parsed = JSON.parse(raw)

    return NextResponse.json(parsed)

  } catch (error) {
    console.error("Generate quiz error:", error)
    return NextResponse.json({ error: "Quiz generation failed" }, { status: 500 })
  }
}