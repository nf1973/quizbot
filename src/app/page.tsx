// Home.tsx

"use client"
import React, { useState, useEffect } from "react"
import Spinner from "./components/Spinner"
import { getQuizCategories, getQuestions } from "./actions"
import CategoryPicker from "./components/CategoryPicker"
import Quiz from "./components/Quiz"
import { Question } from "./types/types"

export default function Home() {
  const [categories, setCategories] = useState<string[] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [showSummary, setShowSummary] = useState(false)

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      const { categories } = await getQuizCategories()
      setCategories(categories)
      setLoading(false)
    }
    fetchCategories()
  }, [])

  // Handle category selection
  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category)
    setLoading(true)

    const { questions } = await getQuestions(category)
    setQuestions(questions) // Store the questions
    setLoading(false)
  }

  const handleAnswer = (answer: string) => {
    setUserAnswers((prev) => [...prev, answer])
    if (answer === questions[currentQuestionIndex]?.correct_answer) {
      setScore((prev) => prev + 1)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowSummary(true)
    }
  }

  return (
    <div className="bg-slate-800 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start max-w-full">
        <div>
          <h1 className="text-4xl font-bold">Quizbot</h1>
          <p className="text-small italic">
            Questions and Answers are AI generated and may be incorrect. The UI
            is a work in progress.
          </p>
        </div>

        {loading ? (
          <Spinner
            message={
              selectedCategory
                ? "Generating Questions..."
                : "Generating categories..."
            }
          />
        ) : (
          categories &&
          !selectedCategory && (
            <>
              <CategoryPicker
                categories={categories}
                onSelectCategory={handleCategorySelect}
              />
              {selectedCategory && (
                <p className="mt-4 text-lg font-semibold text-fuchsia-600">
                  Selected Category: {selectedCategory}
                </p>
              )}
            </>
          )
        )}

        {/* Include the Quiz component here */}
        {selectedCategory && (
          <Quiz
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            userAnswers={userAnswers}
            score={score}
            showSummary={showSummary}
            setShowSummary={setShowSummary}
            handleAnswer={handleAnswer}
            setIsQuizActive={() => setSelectedCategory(null)} // This resets the quiz state when going back
          />
        )}
        <p className="text-fuchsia-400 mt-24">
          Made by Neil just for fun. <br /> You can find the source code at
          <a href="https://github.com/nf1973/quizbot/tree/main/src/app">
            {" "}
            <span className="underline">Github</span>
          </a>
        </p>
      </main>
    </div>
  )
}
