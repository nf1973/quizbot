"use server"

export const getQuizCategories = async () => {
  const response = {
    categories: [
      "The English Language",
      "Ancient Civilizations",
      "Famous Paintings",
      "Cycling Tours",
    ],
  }
  return response
}
