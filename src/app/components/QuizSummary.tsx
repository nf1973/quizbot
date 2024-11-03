import React from "react"
import { Question } from "../types/types"

interface QuizSummaryProps {
  questions: Question[]
  userAnswers: string[]
  score: number
  setIsQuizActive: (isActive: boolean) => void
}

const QuizSummary: React.FC<QuizSummaryProps> = ({
  questions,
  userAnswers,
  score,
  setIsQuizActive,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">Quiz Summary</h2>
      <p className="text-xl">
        Your Score: {score}/{questions.length}
      </p>
      <ul>
        {questions.map((q, index) => (
          <li key={index} className="mb-2">
            <strong>
              Question {index + 1}: {q.question}
            </strong>
            <br />
            Your Answer: {userAnswers[index]} <br />
            Correct Answer: {q.correct_answer} <br />
            {userAnswers[index] === q.correct_answer ? "Correct" : "Incorrect"}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsQuizActive(false)}
        className="mt-4 bg-fuchsia-600 text-white p-2 rounded"
      >
        Back to Categories
      </button>
    </div>
  )
}

export default QuizSummary
