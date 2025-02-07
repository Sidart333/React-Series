import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const editToDo = () => {
    
  }
  const deleteToDo = () => {
    
  }
  const addToDo = () => {
    setTodos([...todos, { todo, isCompelted: false }])
    setTodo("")
  }

  return (
    <>  
      <Navbar />
      <div className="container mx-auto my-5 p-2 bg-indigo-400 rounded-xl">
        <div className="addToDo mx-5">
          <h1 className="text-lg font-bold">Add a To Do </h1>
          <input className="bg-slate-50 rounded-lg py-1 my-4 border max-w-80 w-full" type="text" />
          <button onClick={addToDo} className="bg-indigo-300 font-bold hover:bg-indigo-500 transition-all cursor-pointer text-white px-4 py-1 mx-5 rounded-lg ">
            Add 
          </button>
        </div>
        <h2 className="text-white font-bold text-xl mx-5">Your To Dos</h2>
        <div className="todos mx-5 my-5">
          <div className="todo flex">
            <div className="text" >{todo}</div>
            <div className="buttons">
              <button onClick={editToDo} className="bg-indigo-300 font-bold hover:bg-indigo-500 transition-all cursor-pointer text-white px-4 py-1 mx-2 rounded-lg ">Edit</button>
              <button onClick={deleteToDo} className="bg-indigo-300 font-bold hover:bg-indigo-500 transition-all cursor-pointer text-white px-4 py-1 mx-2 rounded-lg ">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
