import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cards from './components/Cards'

function App() {
  const [count, setCount] = useState(0)
  let myObj = {
    username: "siddharth",
    age: 24
  }
  let arr = [1, 2, 3, 4]
  
  return (
    <>
      <h1 className="bg-green-400 text-black p-4 rounded-xl mb-4">
        Tailwind Test
      </h1>
      <Cards username="chai aur code" someArray={arr} someObject={myObj} />
      <Cards username="siddharth" heading="lazrus" />
      <Cards username="hitesh" heading="lucifer" />
      <Cards username="kuldeep" heading="QueasyChemical" />
      <Cards username="gaurav" heading="" />
    </>
  );
}

export default App
