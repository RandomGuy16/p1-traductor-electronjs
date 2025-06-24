// src/App.tsx
import React, {useState} from 'react'
import Translator from "./Translator"
import './index.css'

function App() {
  const [targetLang, setTargetLang] = useState("en")
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")

  return (
    <>
      <header className="w-full flex items-center justify-center px-4 py-2 bg-red-500 dark:bg-red-600">
        <h1 className="text-2xl font-bold text-white">Traductor</h1>
      </header>
      <main className="w-full flex flex-col items-center justify-center px-4 py-16">
        <Translator
          targetLang={targetLang}
          setTargetLang={setTargetLang}
          inputText={inputText}
          setInputText={setInputText}
          outputText={outputText}
          setOutputText={setOutputText}
        ></Translator>
      </main>
    </>
  );
}

export default App;