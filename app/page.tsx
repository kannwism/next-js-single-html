"use client"

import { useState } from "react"

export default function Home() {
  const [text, setText] = useState<string>("Sample Text")
  const [input, setInput] = useState<string>("")

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24 bg-gray-200">
        <h1 className="text-4xl">Basic NextJS Application</h1>
        <p>Enter text here:</p>
        <input type="text" value={input} onChange={(event) => {setInput(event.target.value)}}></input>
        <button className="bg-slate-500 hover:bg-slate-400 p-3 rounded-md text-white" onClick={() => {setText(input); setInput("")}}>Update Text</button>
        <h2>{text}</h2>
    </main>
  )
}
