import { openai } from "../azure-openai"

export async function generateStructuredNotes(text: string) {

  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content:
          "You are an AI study assistant that converts raw notes into structured study material."
      },
      {
        role: "user",
        content: `
Convert the following notes into structured format.

Return JSON with:
title
summary
keyConcepts
content

Notes:
${text}
`
      }
    ],
    temperature: 0.3
  })

  const output = response.choices[0].message.content

  return JSON.parse(output!)
}