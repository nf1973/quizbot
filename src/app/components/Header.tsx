import Image from "next/image"

const Header = () => {
  return (
    <div className="flex flex-col w-full items-center md:border-b-4 border-cyan-500 md:flex-row">
      <Image
        className="w-24 h-24 md:w-64 md:h-64 ml-0 md:ml-8"
        src="/quizbot1sm.png"
        alt="Quizbot"
        width={250}
        height={250}
      />
      <div className="ml-0 mt-4 md:ml-8 md:mt-20">
        <h1 className="hidden md:block text-left text-5xl font-semibold text-cyan-500 mb-8">
          Quizbot
        </h1>
        <p className="text-white text-center my-4 md:text-left md:my-0">
          Questions and Answers are AI generated and may be incorrect.
        </p>
      </div>
    </div>
  )
}

export default Header
