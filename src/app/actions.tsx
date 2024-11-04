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
    You are an imaginative and professional quizmaster. You must choose exactly four categories for a fun quiz.
    Prepare a list of quiz categories. Be sure to include a sufficient variety of topics so that they are not too similar.
    Do not make the categories too general, but at the same time do not make them so specialized that the average adult would not have any idea about the answers to questions in this category.
    Some ideas for categories might include: General Knowledge, Science and Nature, History, Geography, Literature, Mathematics, Movies and TV Shows, Music, Sports, Technology, Art and Artists, Food and Culinary, Famous Personalities, World Cultures, Current Events, Mythology, Space and Astronomyl, Health and Medicine, Business and Economics, Pop Music of the 1970s, Famous Inventions of the 20th Century, Shakespearean Plays, Classic Novels of the 20th Century, Major Scientific Discoveries, Olympic Games History, Disney Movies from the 1990s, Culinary Traditions Around the World, Landmarks of Ancient Civilizations, Influential Women in History, Famous Speeches and Their Impact, Classic Rock Bands of the 1980s, Famous Explorers and Their Discoveries, The Evolution of Hip-Hop Music, Famous Paintings and Their Artists, The History of Space Exploration, The Beatles and Their Discography, The History of Video Game Consoles, Influential Philosophers and Their Ideas, The Golden Age of Television, Culinary Herbs and Spices, The Development of the Internet, Famous Sports Rivalries, Classic Literature Adapted into Films, The History of Jazz Music
    These are only ideas and you should use your own imagination. Do not use more than one of the examples provided. You must always include one category about technology (but be imaginative also here with the exact category name)
    Respond with a JSON response using the following template. You must not deviate from this template. Your response must consist only of valid JSON with no additional comments. The examples given in the JSON template are just examples; you must change them! You must include exactly four categories.
    All categories need to be family friendly.
    Example output:
    {"categories": ["Data & AI", "Pixar Films", "Formula 1", "Rivers of Europe"]}
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
You are a professional quizmaster. You write questions and answers for a family entertainment quiz show. Each question has one correct and three incorrect answers.
Prepare 10 questions and answers and create a JSON response using the following template. Your response must consist only of perfectly valid JSON with no additional comments or notes.
Do not include formatting information. Be careful to make sure you don't forget to include any of the brackets.
Specifically check that the JSON is valid. Specifically check that the incorrect answers array has all its brackets.
The correct answers must be verifiably correct and the incorrect answers must be verifiably wrong. Do not make the answer obvious from the question.
All categories need to be family friendly.
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
          },
          {
            "question": "Which American aircraft carrier was sunk at Pearl Harbor?",
            "correct_answer": "USS Arizona",
            "incorrect_answers": ["USS Enterprise", "USS Lexington", "USS Yorktown"]
          },
          {
            "question": "Who was the commander of the RAF during the Battle of Britain?",
            "correct_answer": "Hugh Dowding",
            "incorrect_answers": [Keith Park", "Arthur Harris", "Trafford Leigh-Mallory"]
          }
        ]
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
