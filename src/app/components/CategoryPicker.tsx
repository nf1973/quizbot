import React from "react"

interface CategoryPickerProps {
  categories: string[]
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {categories.map((category, index: number) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <h2 className="text-xl text-fuchsia-800 text-center font-semibold">
            {category}
          </h2>
        </div>
      ))}
    </div>
  )
}

export default CategoryPicker
