import { useState } from 'react'
import './App.css'
import Todolist from './components/Todolist'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-800 '>
      <Todolist/>
    </div>
  )
}

export default App
