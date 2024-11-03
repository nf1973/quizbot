import { getQuizCategories } from "./actions"
import CategoryPicker from "./components/CategoryPicker"

export default async function Home() {
  const { categories } = await getQuizCategories()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Quizbot</h1>
        <p className="text-xl">The quiz starts soon.</p>

        <CategoryPicker categories={categories} />
      </main>
    </div>
  )
}
