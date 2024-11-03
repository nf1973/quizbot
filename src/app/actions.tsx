"use server"

//import { ChatOllama } from "@langchain/ollama"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

export const getQuizCategories = async () => {
  const AI_MODEL_NAME = process.env.AI_MODEL_NAME
  const AI_API_KEY = process.env.AI_API_KEY

  const systemPromptText = `
    You are a professional quizmaster. You decide on the categories for a quiz. Prepare a list of quiz categories. Be sure to include a sufficient variety of topics so that they are not too similar, and do not make them too general, but at the same time do not make them so specialized that the average adult would not have any idea about the answers to questions in this category.
    Respond with a JSON response using the following template. You must not deviate from this template. Your response must consist only of valid JSON with no additional comments. The examples given are just examples; you must change them! You must include exactly four categories.
    {"categories": ["Music of the 1990s", "Pixar Films", "Formula 1", "Rivers of Europe"]}
  `

  const llm = new ChatGoogleGenerativeAI({
    modelName: AI_MODEL_NAME,
    apiKey: AI_API_KEY,
    maxOutputTokens: 2048,
  })

  const response = await llm.invoke([
    ["system", systemPromptText],
    ["human", "Go! (it does not matter but the current time is ${Date.now()}"],
  ])
  let parsedResponse
  try {
    parsedResponse = JSON.parse(response.content.toString())
  } catch (error) {
    console.error("Failed to parse JSON response:", error)
    throw new Error("Invalid JSON response from the model.")
  }
  return parsedResponse
}
