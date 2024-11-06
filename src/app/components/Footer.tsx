import React from "react"

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-cyan-400 mt-8 md:mt-24 text-center text-sm">
        Created by Neil for a bit of fun.{" "}
      </p>
      <p className="text-xs text-white">
        Find the source code on{" "}
        <a
          href="https://github.com/nf1973/quizbot/tree/main/src/app"
          className=" text-cyan-300 hover:text-cyan-500 transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  )
}

export default Footer
