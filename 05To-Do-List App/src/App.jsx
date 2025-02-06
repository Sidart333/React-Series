import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) {
      alert("Please enter a task");
      return;
    }
    if (tasks.some((t) => t.text.toLowerCase() === trimmedTask.toLowerCase())) {
      alert("Task already exists");
      return;
    }
    setTasks([...tasks, { text: trimmedTask, completed: false }]);
    setTask("");
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const newTask = prompt("Edit your task:", tasks[index].text);
    if (newTask) {
      const trimmedTask = newTask.trim();
      if (!trimmedTask) {
        alert("Task cannot be empty");
        return;
      }
      if (
        tasks.some(
          (t, i) =>
            i !== index && t.text.toLowerCase() === trimmedTask.toLowerCase()
        )
      ) {
        alert("Task already exists");
        return;
      }
      const updatedTasks = tasks.map((t, i) =>
        i === index ? { ...t, text: trimmedTask } : t
      );
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a task..."
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.map((t, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b hover:bg-gray-200 rounded-lg"
            >
              <span
                onClick={() => toggleComplete(index)}
                className={`flex-1 cursor-pointer ${
                  t.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {t.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => editTask(index)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
