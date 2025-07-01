import { useState } from "react"

export default function TaskForm({ tasks, setTasks }) {

  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return 

    const res = await fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({text})
    })

    const newTask = await res.json()
    setTasks([...tasks, newTask])
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        name="task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nueva tarea"
        className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out">
        Agregar
      </button>
    </form>
  );
}
