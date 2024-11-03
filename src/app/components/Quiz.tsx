// components/Quiz.tsx

"use client"

import { Question } from "../types/types"

interface QuizProps {
  questions: Question[]
  currentQuestionIndex: number
  userAnswers: string[]
  score: number
  showSummary: boolean
  setShowSummary: (show: boolean) => void
  handleAnswer: (answer: string) => void
  setIsQuizActive: (isActive: boolean) => void
}

const getScoreEmoji = (score: number, total: number) => {
  const percentage = (score / total) * 100
  if (percentage === 100) return "🌟" // Perfect score
  if (percentage >= 80) return "😃" // Excellent
  if (percentage >= 60) return "🙂" // Good
  if (percentage >= 40) return "😐" // Average
  if (percentage >= 20) return "😕" // Below average
  return "😞" // Poor
}

const Quiz: React.FC<QuizProps> = ({
  questions,
  currentQuestionIndex,
  userAnswers,
  score,
  showSummary,
  //setShowSummary,
  handleAnswer,
  //setIsQuizActive,
}) => {
  // Check if there are questions available
  if (questions.length === 0) {
    return // TODO: Check if this is the best way to handle this case
  }

  const currentQuestion = questions[currentQuestionIndex]

  // Ensure currentQuestion is defined
  if (!currentQuestion) {
    return <div>No questions available.</div> // Handle the case where currentQuestion is undefined
  }

  const answers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ]
  const shuffledAnswers = answers.sort(() => Math.random() - 0.5)

  if (showSummary) {
    return (
      <div className="flex flex-col items-left gap-6">
        <div>
          <p className="text-xl text-white">
            You scored {score} out of {questions.length}{" "}
            {getScoreEmoji(score, questions.length)}
          </p>
        </div>
        <ul>
          {questions.map((q, index) => (
            <li
              key={index}
              className={`mb-8 ${
                userAnswers[index] === q.correct_answer
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <strong>
                Question {index + 1}: {q.question}
              </strong>
              <br />
              Your Answer: {userAnswers[index]} <br />
              {userAnswers[index] !== q.correct_answer && (
                <>
                  Correct Answer: {q.correct_answer} <br />
                </>
              )}
            </li>
          ))}
        </ul>

        {/* <button
          onClick={() => {
            setIsQuizActive(false)
            setShowSummary(false) // Reset summary state when going back
          }}
          className="mt-4 bg-blue-600 text-white p-2 rounded"
        >
          Back to Categories
        </button> */}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-left min-w-full">
      <div>
        <p className="text-small font-bold text-fuchsia-600">
          Question {currentQuestionIndex + 1} of {questions.length}:{" "}
        </p>
        <p className="text-2xl font-normal text-white">
          {currentQuestion.question}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg hover:bg-fuchsia-100 transition-shadow duration-200"
          >
            <p className="text-xl text-fuchsia-600 text-center font-small">
              {answer}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Quiz
