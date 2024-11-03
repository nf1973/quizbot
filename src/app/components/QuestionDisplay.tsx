import React from "react"
import { Question } from "../types/types"

interface QuestionDisplayProps {
  question: Question
  shuffledAnswers: string[]
  currentQuestionIndex: number
  totalQuestions: number
  onAnswer: (answer: string) => void
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  shuffledAnswers,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">
        Question {currentQuestionIndex + 1} of {totalQuestions}:{" "}
        {question.question}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer)}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg hover:bg-fuchsia-100 transition-shadow duration-200"
          >
            <p className="text-xl text-fuchsia-800 text-center font-normal">
              {answer}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuestionDisplay
