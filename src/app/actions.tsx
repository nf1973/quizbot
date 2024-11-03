"use server"

//import { ChatOllama } from "@langchain/ollama"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

const AI_MODEL_NAME = process.env.AI_MODEL_NAME
const AI_API_KEY = process.env.AI_API_KEY

function extractValidJSON(text: string) {
  // Check if the text starts with three backticks followed by "json"
  if (!text.trim().startsWith("```json")) {
    console.error("Text does not start with '```json'.")
    return text
  }

  // Use a regex to find the JSON part in the text
  const jsonRegex = /```json\s*([\s\S]*?)```/

  // Match the JSON content in the text
  const match = text.match(jsonRegex)
  if (match) {
    return match[1].trim() // Return the JSON string without backticks
  }

  console.error("No valid JSON found in the input text.")
  return text
}

export const getQuizCategories = async () => {
  const systemPromptText = `
    You are a professional quizmaster. You decide on the categories for a quiz. Prepare a list of quiz categories. Be sure to include a sufficient variety of topics so that they are not too similar, and do not make them too general, but at the same time do not make them so specialized that the average adult would not have any idea about the answers to questions in this category.
    Respond with a JSON response using the following template. You must not deviate from this template. Your response must consist only of valid JSON with no additional comments. The examples given are just examples; you must change them! You must include exactly four categories.
    Example output:
    {"categories": ["Music of the 1990s", "Pixar Films", "Formula 1", "Rivers of Europe"]}
  `

  const llm = new ChatGoogleGenerativeAI({
    modelName: AI_MODEL_NAME,
    apiKey: AI_API_KEY,
    maxOutputTokens: 2048,
  })

  const response = await llm.invoke([
    ["system", systemPromptText],
    ["human", `Go! (it does not matter but the current time is ${Date.now()})`],
  ])

  console.log("Response:", response.content)
  let parsedResponse
  try {
    parsedResponse = JSON.parse(extractValidJSON(response.content.toString()))
  } catch (error) {
    console.error("Failed to parse JSON response:", error)
    throw new Error("Invalid JSON response from the model.")
  }
  return parsedResponse
}

export const getQuestions = async (category: string) => {
  const systemPromptText = `
You are a professional quizmaster. You write questions and answers for a family entertainment quiz show. Each question has one correct and four incorrect answers.
Prepare 10 questions and answers and create a JSON response using the following template. Your response must consist only of perfectly valid JSON with no additional comments or notes.
Do not include formatting information. Be careful to make sure you don't forget to include any of the brackets.
Specifically check that the JSON is valid. Specifically check that the incorrect answers array has all its brackets.
The correct answers must be verifiably correct and the incorrect answers must be verifiably wrong.
Example output:
{
     "questions": [
          {
            "question": "What is the capital of France?",
            "correct_answer": "Paris",
            "incorrect_answers": ["London", "Berlin", "Rome"]
          },
          {
            "question": "Who wrote 'To Kill a Mockingbird'?",
            "correct_answer": "Harper Lee",
            "incorrect_answers": ["Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"]
          }]
}
`

  const llm = new ChatGoogleGenerativeAI({
    modelName: AI_MODEL_NAME,
    apiKey: AI_API_KEY,
    maxOutputTokens: 2048,
  })

  const response = await llm.invoke([
    ["system", systemPromptText],
    [
      "human",
      `Prepare questions about ${category} (it does not matter but the current time is ${Date.now()})`,
    ],
  ])

  console.log("Response:", response.content)
  let parsedResponse
  try {
    parsedResponse = JSON.parse(extractValidJSON(response.content.toString()))
  } catch (error) {
    console.error("Failed to parse JSON response:", error)
    throw new Error("Invalid JSON response from the model.")
  }
  return parsedResponse
}
