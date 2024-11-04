//Spinner.tsx

interface SpinnerProps {
  message: string
}

const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="ml-4 text-cyan-200 font-semibold">{message}</p>
    </div>
  )
}

export default Spinner
