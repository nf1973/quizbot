"use client"

import { useState } from "react"
import { Question } from "../types/types"
import QuestionDisplay from "./QuestionDisplay"
import QuizSummary from "./QuizSummary"

interface QuizProps {
  questions: Question[]
  setIsQuizActive: (isActive: boolean) => void
}

const Quiz: React.FC<QuizProps> = ({ questions, setIsQuizActive }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [showSummary, setShowSummary] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const answers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ]
  const shuffledAnswers = answers.sort(() => Math.random() - 0.5)

  const handleAnswer = (answer: string) => {
    setUserAnswers([...userAnswers, answer])
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1)
    }

    // Move to the next question or show summary
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowSummary(true)
    }
  }

  if (showSummary) {
    return (
      <QuizSummary
        questions={questions}
        userAnswers={userAnswers}
        score={score}
        setIsQuizActive={setIsQuizActive}
      />
    )
  }

  return (
    <QuestionDisplay
      question={currentQuestion}
      shuffledAnswers={shuffledAnswers}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={questions.length}
      onAnswer={handleAnswer}
    />
  )
}

export default Quiz
