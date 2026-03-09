import { InferenceClient } from "@huggingface/inference"

const hf = new InferenceClient(process.env.HUGGINGFACE_API_KEY)

export async function createEmbedding(text: string) {

  const embedding = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: text
  })

  return embedding as number[]
}