import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <h1 className="text-4xl font-extrabold text-white">
        Hello Tailwind + Vite!
      </h1>
    </div>
    </>
  )
}

export default App
