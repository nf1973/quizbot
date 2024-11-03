import React from "react"

interface CategoryPickerProps {
  categories: string[]
  onSelectCategory: (category: string) => void
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onSelectCategory(category)}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:bg-fuchsia-100 transition-shadow duration-200"
        >
          <h2 className="text-xl text-fuchsia-800 text-center font-semibold">
            {category}
          </h2>
        </button>
      ))}
    </div>
  )
}

export default CategoryPicker
