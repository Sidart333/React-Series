import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [counter, setCounter] = useState(5)

  // let counter = 5
  const addValue = () => {
    if (counter < 20) {
    
      counter += 1;
      setCounter(prevCounter => prevCounter + 1) // callback function
      setCounter(prevCounter => prevCounter + 1)
      setCounter(prevCounter => prevCounter + 1)
      setCounter(prevCounter => prevCounter + 1)
  }
    console.log('clicked add button', counter);
    // console.log('clicked', Math.round(Math.random() * 10 + 1));
  }

  const removeValue = () => {
    if (counter > 0) {
      counter -= 1
      setCounter(counter)
    }
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
