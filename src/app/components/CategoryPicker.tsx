// CategoryPicker.tsx
import React from "react"

interface CategoryPickerProps {
  categories: string[]
  onSelectCategory: (category: string) => void
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  categories,
  onSelectCategory,
}) => {
  // Handler for custom category input
  const handleCustomCategory = () => {
    const customCategory = prompt(
      "Welcome to Neural Override Mode. Please enter a category name:"
    )
    if (customCategory) {
      onSelectCategory(customCategory)
    }
  }

  return (
    <>
      <p className="text-cyan-300 font-bold text-2xl mb-4 mt-0 md:mt-8 cursor-text">
        <span onClick={handleCustomCategory}>Pick</span> a category...
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onSelectCategory(category)}
            className="bg-cyan-500 shadow-md rounded-xl p-4 hover:shadow-lg text-white hover:text-white text-center text-lg font-bold hover:bg-orange-400 transition-shadow duration-200"
          >
            <p>{category}</p>
          </button>
        ))}
      </div>
    </>
  )
}

export default CategoryPicker
