import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-3xl font-bold underline my-4">
        Hello Tailwind!
      </div>
      <div className="flex justify-center my-4">
        <Input disabled={true} value={count} />
      </div>
      <div className="flex justify-center my-4">
        <Button onClick={() => setCount(count + 1)}>Click Me!</Button>
      </div>
    </>
  )
}

export default App
