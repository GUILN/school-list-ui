import './App.css'

function App() {

  return (
    <>
      <div className="w-full h-svh max-h-svh flex">
        <div className="h-full flex-[0.2] bg-blue-300">
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
