import OpenAI from "openai"

console.log("ENV CHECK:", {
  key: process.env.AZURE_OPENAI_API_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
})
export function getAzureClient() {
  const apiKey = process.env.AZURE_OPENAI_API_KEY

  if (!apiKey) {
    throw new Error("Missing Azure OpenAI API key")
  }

  return new OpenAI({
    apiKey,
    baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
    defaultQuery: {
      "api-version": process.env.AZURE_OPENAI_API_VERSION || "2024-02-15-preview"
    },
    defaultHeaders: {
      "api-key": apiKey
    }
  })
}

export async function askAI(question: string, context: string) {

  const client = getAzureClient()

  const response = await client.chat.completions.create({
    model: process.env.AZURE_OPENAI_DEPLOYMENT!,
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: "You are a study assistant. Use the provided notes context to answer the question."
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion:\n${question}`
      }
    ]
  })

  return response.choices[0].message.content
}
