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
      <div className="w-full h-svh max-h-svh flex">
        <div className="h-full flex-[0.3]">
          {/* left side menu */}
          Side menu
        </div>
        <div className="h-full flex-1">
          {/* main content area */}
          <div className="flex h-full flex-col justify-between overflow-y-scroll">
            <div className="sticky top-0 w-full">
              <div className="bg-orange-500 py-5">
                <h1 className="text-center text-xl">Header</h1>
              </div>
              {/* header */}
            </div>
            <div>
              {/* content */}
              <h1 className="text-center text-xl">Content</h1>
              <div className="flex justify-center my-4">
                <Input disabled={true} value={count} />
              </div>
              <div className="flex justify-center my-4">
                <Button onClick={() => setCount(count + 1)}>Click Me!</Button>
              </div>
            </div>
            <div className="w-full">
              <div className="bg-yellow-600 py-12">
                <h1 className="text-center text-xl">Footer</h1>
              </div>
              {/* footer */}
            </div>
          </div>
          
        </div> 
      </div>
    </>
  )
}

export default App
