import React from 'react'
import Select from "react-select/base";
import SwapIcon from "./assets/swap-svgrepo-com.svg?react"


function changeInputLanguage(lang: string)   {
  console.log(lang)
  return
}

function changeOutputLanguage(lang: string)   {
  console.log(lang)
  return
}


interface selectOption {
  value: string;
  label: string;
}

function Translator() {
  return (
    <div className="w-2/3 h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/*language selector*/}
      <div className="w-full h-8 flex flex-row items-center justify-center">
        <Select
          id="input-language-selector"
          inputValue={""}
          onChange={(newValue) => changeInputLanguage((newValue as selectOption).value)}
          onInputChange={() => {
            return;
          }}
          value={{}}
          onMenuOpen={undefined}
          onMenuClose={undefined}></Select>
        <button className="w-5 h-5" id="swap-languages-btn" onClick={()=>{return}}>
          <SwapIcon className="w-5 h-5"/>
        </button>
        <Select
          className="w-full"
          id="output-language-selector"
          inputValue={""}
          onChange={(newValue) => changeOutputLanguage((newValue as selectOption).value)}
          onInputChange={() => {
            return;
          }}
          value={{}}
          onMenuOpen={undefined}
          onMenuClose={undefined}></Select>
      </div>
    </div>
  )
}

export default Translator
