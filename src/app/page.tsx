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
  const [isQuizActive, setIsQuizActive] = useState(false)

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

  // Fetch questions when a category is selected
  useEffect(() => {
    const fetchQuestions = async () => {
      if (selectedCategory) {
        const response = await getQuestions(selectedCategory)
        setQuestions(response.questions)
        setIsQuizActive(true)
      }
    }
    fetchQuestions()
  }, [selectedCategory]) // Runs every time selectedCategory changes

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Quizbot</h1>
        <p className="text-xl">
          Questions and Answers are fully AI generated and may be completely
          incorrect.
        </p>

        {loading ? (
          <Spinner message="Selecting categories..." />
        ) : (
          categories &&
          !isQuizActive && (
            <CategoryPicker
              categories={categories}
              onSelectCategory={setSelectedCategory}
            />
          )
        )}

        {isQuizActive && questions.length > 0 && (
          <Quiz questions={questions} setIsQuizActive={setIsQuizActive} />
        )}
      </main>
    </div>
  )
}
