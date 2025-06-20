// src/App.tsx
import React from 'react'
import Translator from "./Translator"
import './index.css'

function App() {
  return (
    <>
      <header className="w-full flex items-center justify-center px-4 py-2 bg-red-500 dark:bg-red-600">
        <h1 className="text-2xl font-bold text-white">Hello Electron + Tailwind!</h1>
      </header>
      <main className="w-full flex flex-col items-center justify-center px-4 py-16">
        <Translator></Translator>
      </main>


    </>
  );
}

export default App;