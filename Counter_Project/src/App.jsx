import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let[counter, setCounter]=useState(15)
  

  // let counter = 5
  const addValue = () => {
    counter += 1;
    setCounter(counter)
    // console.log('clicked', Math.round(Math.random() * 10 + 1));
    console.log('clicked add button', counter);
  }
  const removeValue = () => {
    counter -= 1
    setCounter(counter)
    console.log('Clicked remove button',counter);
    
}

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter Value: {counter}</h2>
      <button onClick={addValue}>Add Value {counter}</button>
      <br/>
      <button onClick={removeValue}>Remove Value {counter}</button>
      <p>footer: {counter}</p>
    </>
  );
}

export default App
