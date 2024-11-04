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
      <div className="flex flex-col items-left gap-8 min-w-full">
        {/* Score Summary */}
        <div className="mt-4 flex flex-col items-center rounded-lg shadow-md text-center">
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold text-white">
              You scored {score} out of {questions.length}
            </p>
            <p className="text-4xl">{getScoreEmoji(score, questions.length)}</p>
          </div>
        </div>

        {/* Questions Summary */}
        <ul className="flex flex-col gap-6">
          {questions.map((q, index) => (
            <li key={index} className="bg-gray-900 p-4 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                {/* Icon */}
                {userAnswers[index] === q.correct_answer ? (
                  <span className="text-green-500">✔</span>
                ) : (
                  <span className="text-red-500">❌</span>
                )}
                {/* Question and Answer Details */}
                <div>
                  <p className="font-semibold text-lg text-cyan-400">
                    Question {index + 1}: {q.question}
                  </p>
                  <p
                    className={`mt-2 ${
                      userAnswers[index] === q.correct_answer
                        ? "text-green-300"
                        : "text-red-400"
                    }`}
                  >
                    Your Answer: {userAnswers[index]}
                  </p>
                  {userAnswers[index] !== q.correct_answer && (
                    <p className="text-gray-300">
                      Correct Answer:{" "}
                      <span className="text-green-300">{q.correct_answer}</span>
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p>Refresh the page to play again</p>
      </div>
    )
  }

  return (
    <div className=" py-0 md:py-8 flex flex-col items-left min-w-full">
      <div>
        <p className="text-xl font-bold text-cyan-400">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <p className="text-xl md:text-xl my-4 md:my-8 font-normal text-white">
          {currentQuestion.question}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className="bg-cyan-500 shadow-md rounded-xl p-4 hover:shadow-lg text-white hover:text-white text-center text-lg  font-bold hover:bg-orange-400 transition-shadow duration-200"
          >
            <p>{answer}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Quiz
